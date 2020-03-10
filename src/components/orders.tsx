import React, { useEffect, useReducer } from 'react';
import OrderDetails from './orders/details';
import OrderHeader from './orders/header';
import { orderAction, orderOrigin } from '../config';
import { getOrder } from '../http/orders';
import { getVouchers } from '../http/customers';
import { OrderPropsInterface } from '../interfaces/props';
import { OrderState } from '../interfaces/state';
import { OrderReducer } from '../interfaces/reducer';
import { ConfigContextProvider } from '../contexts/configContext';

const accountReducer = (state: OrderState, action: OrderReducer): OrderState => {
    switch (action.type) {
        case 'clearFilters': 
            return {
                ...state,
                action: 0,
                error: false,
                loading: false,
                numberAction: '',
                numberOrigin: '',
                origin: 0,
                updateUrl: false,
                vouchers: null
            }
        case 'error':
            return { ...state, error: true, loading: false }
        case 'loading':
            return { ...state, error: false, loading: true, updateUrl: false }
        case 'setAction':
            const actionPayload = action.selectPayload || 0;
            return { ...state, action: actionPayload, origin: 0 }
        case 'setDetails':
            const details = action.details || null;
            return { ...state, details, updateUrl: false, vouchers: null }
        case 'setNumberAction':
            const numberActionPayload = action.inputPayload || '';
            return { ...state, numberAction: numberActionPayload, numberOrigin: '' }
        case 'setNumberOrigin':
            const numberOriginPayload = action.inputPayload || '';
            return { ...state, numberAction: '', numberOrigin: numberOriginPayload }
        case 'setOrigin':
            const originPayload = action.selectPayload || 0;
            return { ...state, action: 0, origin: originPayload }
        case 'setUpdateUrl':
            return { ...state, updateUrl: true }
        case 'setVouchers':
            const vouchers = action.vouchers || null;
            return { ...state, details: null, vouchers, updateUrl: false }
        default:
            return state;
    }
};

const defaultReducerState: OrderState = {
    details: null,
    error: false,
    loading: false,
    action: 0,
    numberAction: '',
    numberOrigin: '',
    origin: 0,
    updateUrl: false,
    vouchers: null
};

const Orders: React.FC<OrderPropsInterface> = (props: OrderPropsInterface) => {
    const [ data, dispatch ] = useReducer(accountReducer, defaultReducerState);
    const { action, details, error, loading, numberAction, numberOrigin, origin, updateUrl } = data;
    const { match, token } = props;
    const { params } = match;

    const setUrl = () => {
        const actionValue = action ? action : origin;
        const optionObj = action ? orderAction : orderOrigin;
        const currentAction = optionObj.filter(el => el.id === actionValue)[0];
        const orderNumber = action ? numberAction : numberOrigin;
        let url = `#/orders/${currentAction.db}/${orderNumber}`;

        if (currentAction.additional) {
            url = `${url}/${currentAction.additional}`;
        }
        return url;
    };

    useEffect(() => {
        if (Object.entries(params).length > 0) {
            getOrder({ ...params, token })
            .then(res => {
                if (res.status === 200) {
                    if (params.additional && params.additional !== 'voucher') {
                        dispatch({ type: 'setDetails', details: res.data });
                    } else {
                        getVouchers({ ...params, token })
                        .then(res => {
                            if (res.status === 200) {
                                dispatch({ type: 'setVouchers', vouchers: res.data });
                            } else {
                                dispatch({ type: 'error' });
                            }
                        });    
                    }
                } else {
                    dispatch({ type: 'error' });
                }
            });
        }
    }, [match]);

    useEffect(() => {
        if (updateUrl) {
            window.location.href = setUrl();
        }
    }, [updateUrl]);

    const detailsProps = { details, dispatch, error, loading, params };
    const headerProps = { action, dispatch, loading, numberAction, numberOrigin, origin };
    return(
        <ConfigContextProvider>
            <OrderHeader {...headerProps} />
            <OrderDetails {...detailsProps} />
        </ConfigContextProvider>
    );
}

export default Orders;

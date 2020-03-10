import React, { useEffect, useReducer } from 'react';
import AccountDetails from './accounts/details';
import AccountHeader from './accounts/header';
import { AccountState } from '../interfaces/state';
import { AccountsReducer } from '../interfaces/reducer';
import { ConfigContextProvider } from '../contexts/configContext';
import { getAccounts } from '../http/accounts';
import { Token as TokenInterface } from '../interfaces/token';
import { convertDateToString } from '../functions/general';
import { setParams, setTypeName } from '../functions/accounts';

const accountReducer = (state: AccountState, action: AccountsReducer): AccountState => {
    switch (action.type) {
        case 'clearFilters': 
            return { ...state, accountState: -1, accountType: -1, dateEnd: null, dateStart: null }
        case 'error':
            return { ...state, error: true, list: [], loading: false }
        case 'loading':
            return {
                ...state,
                amount: 0,
                automatic: false,
                error: false,
                list: [],
                loading: true,
                maxAmount: 0
            }
        case 'setResult':
            return {
                ...state,
                amount: action.payload!.amount,
                automatic: action.payload!.automatic,
                error: false,
                list: action.payload!.list,
                loading: false,
                maxAmount: action.payload!.maxAmount
            }
        case 'setAccountState':
            const value = action.singleValue !== undefined ? action.singleValue : -1;
            return { ...state, accountState: value }
        case 'setAccountType':
            return { ...state, accountType: action.singleValue || -1 }
        case 'setDateEnd':
            return { ...state, dateEnd: action.date || null }
        case 'setDateStart':
            return { ...state, dateStart: action.date || null }
        case 'setSelectedRow':
            const selectedRow = action.selectedRow !== undefined ? action.selectedRow : null;
            return { ...state, selectedRow }
        default:
            return state;
    }
}

const defaultReducerState: AccountState = {
    accountState: -1,
    accountType: -1,
    amount: 0,
    automatic: false,
    dateEnd: null,
    dateStart: null,
    error: false,
    loading: false,
    list: [],
    maxAmount: 0,
    selectedRow: null
};

const Accounts: React.FC<TokenInterface> = (props: TokenInterface) => {
    const [ data, dispatch ] = useReducer(accountReducer, defaultReducerState);
    const { amount, automatic, accountState, accountType, dateEnd, dateStart, error, list, loading, maxAmount, selectedRow } = data;
    const { token } = props;

    const handleTableRowClicked = (id: number) => {
        const selectedIndex = list.findIndex(el => el.id === id);

        if (selectedIndex !== -1) {
            const value = selectedRow && selectedRow.id !== list[selectedIndex].id ? selectedRow : null;
            dispatch({ type: 'setSelectedRow', selectedRow: value });
        }
    }

    useEffect(() => {
        if (token !== '') {
            dispatch({ type: 'loading' });
            const dateFrom = dateStart ? convertDateToString(dateStart) : '';
            const dateTo = dateEnd ? convertDateToString(dateEnd) : '';
            const query = setParams({ dateFrom, dateTo, state: accountState, type: accountType });
            getAccounts({ query, token })
                .then(res => {
                    if (res.data.success) {
                        const payload = { ...res.data, list: setTypeName(res.data.list) }
                        dispatch({ type: 'setResult', payload });
                    } else {
                        dispatch({ type: 'error' });
                    }
                })
                .catch(() => {
                    dispatch({ type: 'error' });
                });
            }
    }, [accountState, accountType, dateEnd, dateStart, token]);

    const detailsProps = { amount, automatic, error, handleTableRowClicked, list, loading, maxAmount };
    const headerProps = { accountState, accountType, dateEnd, dateStart, dispatch, loading, selectedRow };
    return(
        <ConfigContextProvider>
            <AccountHeader {...headerProps} />
            <AccountDetails {...detailsProps} />
        </ConfigContextProvider>
    );
}

export default Accounts;

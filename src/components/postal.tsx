import React, { useEffect, useReducer } from 'react';
import PostalDetails from './postal/details';
import PostalHeader from './postal/header';
import { Token as TokenInterface } from '../interfaces/token';
import { PostalReducer } from '../interfaces/reducer';
import { PostalState } from '../interfaces/state';
import { getPostal } from '../http/postal';
import { ConfigContextProvider } from '../contexts/configContext';

const postalReducer = (state: PostalState, action: PostalReducer): PostalState => {
    switch (action.type) {
        case 'error':
            return { amount: '', error: true, list: [], loading: false }
        case 'loading':
            return { amount: '', error: false, list: [], loading: true }
        case 'setResult':
            return {
                amount: action.payload!.current,
                error: false,
                list: action.payload!.list,
                loading: false
            }
        default:
            return state;
    }
}

const defaultReducerState: PostalState = {
    amount: '',
    error: false,
    loading: true,
    list: []
};

const Postal: React.FC<TokenInterface> = (props: TokenInterface) => {
    const [ data, dispatch ] = useReducer(postalReducer, defaultReducerState);
    const { amount, error, list, loading } = data;
    const { token } = props;
    useEffect(() => {
        if (loading && token !== '') {
            dispatch({ type: 'loading' });
            getPostal(token)
            .then(res => {
                if (res.data.success) {
                    dispatch({ type: 'setResult', payload: res.data });
                } else {
                    dispatch({ type: 'error' });
                }
            });
        }
    }, [loading, token]);

    const detailsProps = { error, list, loading }
    const headerProps = { amount, loading }
    return(
        <ConfigContextProvider>
            <PostalHeader {...headerProps} />
            <PostalDetails {...detailsProps} />
        </ConfigContextProvider>
    );
}

export default Postal;

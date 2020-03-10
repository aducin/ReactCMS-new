import axios from 'axios';
import config from '../config';
import { GetAccounts as GetAccountsInterface } from '../interfaces/http';

export const getAccounts = (params: GetAccountsInterface) => {
    let url = `${config.url}accounts/${params.token}?${params.query}`;
    return axios.get(url);
};
import axios from 'axios';
import config from '../config';
import { GetOrders as GetOrdersInterface } from '../interfaces/http';

export const getVouchers = (params: GetOrdersInterface) => {
    const url = `${config.url}customer/${params.db}/${params.id}/vouchers/${params.token}`;
    return axios.get(url);
};

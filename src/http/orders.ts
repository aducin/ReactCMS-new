import axios from 'axios';
import config from '../config';
import { GetOrders as GetOrdersInterface } from '../interfaces/http';

export const getOrder = (params: GetOrdersInterface) => {
    let additional = '';

    if (params.additional === 'voucher') {
        additional = '?basic=true';
    } else {
        additional = `?action=${params.additional}`;
    }
    const url = `${config.url}orders/${params.db}/${params.id}/${params.token}${additional}`;
    return axios.get(url);
};

import axios from 'axios';
import config from '../config';

export const getPostal = (token: string) =>
    axios.get(`${config.url}postal/${token}`);

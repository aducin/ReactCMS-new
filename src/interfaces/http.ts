import { OrderParams } from './config';

interface Http {
    token: string;
}

export interface GetAccounts extends Http {
    query: string;
}

export interface GetOrders extends Http, OrderParams {}

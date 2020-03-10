import { AccountsReducer, OrderReducer } from './reducer';
import { AccountSingleItem } from '../interfaces/accounts';

export interface Header {
    title: string;
};

interface BaseHeader {
    loading: boolean;
}

export interface AccountHeader extends BaseHeader {
    accountState: number;
    accountType: number;
    dateEnd: Date | null,
    dateStart: Date | null,
    dispatch: React.Dispatch<AccountsReducer>;
    selectedRow: AccountSingleItem | null;
};

export interface OrderHeader extends BaseHeader {
    action: number;
    dispatch: React.Dispatch<OrderReducer>;
    numberAction: string;
    numberOrigin: string;
    origin: number;
}

export interface PostalHeader extends BaseHeader {
    amount: string;
};

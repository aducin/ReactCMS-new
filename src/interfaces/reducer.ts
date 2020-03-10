import { AccountsResponse } from './accounts';
import { AccountSingleItem } from './accounts';
import { CustomerVouchers } from './customers';
import { OrderDetails } from './orders';
import { PostalResponse } from './postal';

interface Reducer {
    type: string;
}

export interface AccountsReducer extends Reducer {
    date?: Date;
    payload?: AccountsResponse;
    selectedRow?: AccountSingleItem | null;
    singleValue?: number;
}

export interface OrderReducer extends Reducer {
    details?: OrderDetails;
    inputPayload?: string;
    selectPayload?: number;
    vouchers?: CustomerVouchers;
}

export interface PostalReducer extends Reducer {
    payload?: PostalResponse;
}

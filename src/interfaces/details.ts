import { AccountSingleItem } from './accounts';
import { OrderDetails as OrderDetaisInterface } from './orders';
import { OrderParams } from './config';
import { OrderReducer } from './reducer';
import { PostalListSingleItem } from './postal';

interface Details {
    error: boolean;
    loading: boolean;
}

export interface DetailsTableHeader {
    name: string;
    size?: string;
}

export interface AccountsDetails extends Details {
    amount: number;
    automatic: boolean;
    handleTableRowClicked: (id: number) => void;
    list: AccountSingleItem[];
    maxAmount: number;
}

export interface OrderDetails extends Details {
    details: OrderDetaisInterface | null;
    dispatch: React.Dispatch<OrderReducer>;
    params: OrderParams;
}

export interface PostalDetails extends Details {
    list: PostalListSingleItem[];
}

export interface TableDetails {
    label: string;
    value: string;
}

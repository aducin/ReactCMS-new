import { AccountSingleItem } from './accounts';
import { CustomerVouchers } from './customers';
import { OrderDetails } from './orders';
import { PostalListSingleItem } from './postal';

interface State {
    error: boolean;
    loading: boolean;
};

export interface AccountState extends State {
    accountState: number;
    accountType: number;
    amount: number;
    automatic: boolean;
    dateEnd: Date | null,
    dateStart: Date | null,
    list: AccountSingleItem[];
    maxAmount: number;
    selectedRow: AccountSingleItem | null
}

export interface OrderState extends State {
    action: number;
    details: OrderDetails | null;
    numberAction: string;
    numberOrigin: string;
    origin: number;
    updateUrl: boolean;
    vouchers: CustomerVouchers | null;
}

export interface PostalState extends State {
    amount: string;
    list: PostalListSingleItem[];
}

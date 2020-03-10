export interface AccountSingleItem {
    id: number,
    amount: string,
    closed: number
    type: number,
    typeName?: string,
    recipient: string,
    receipt: string,
    remarks?: string,
    accessories?: number,
    address?: string,
    book?: number,
    car?: number,
    coach?: number,
    element?: number,
    locs?: number,
    createTime: string,
    cashTime?: string,
    receiptTime?: string
}

export interface AccountsResponse {
    automatic: boolean;
    list: AccountSingleItem[];
    success: boolean;
    amount: number;
    maxAmount: number;
}

interface CustomerBasic {
    firstname: string;
    lastname: string;
    email: string;
    secondShopctivity: boolean;
}

interface Voucher {
    id: number;
    reference: string;
    totalProduct: string;
    totalShipping: string;
    dateAdd: string;
    voucherNumber: number;
}

export interface CustomerVouchers {
    customer: CustomerBasic;
    data: Voucher[];
    lastVoucher: number;
}

interface CardQuantity {
    current: number;
    toUpdate: 0;
}

export interface CardDetail {
    productId: number;
    attributeId: number;
    productName: string;
    productQuantity: number;
    reduction: string;
    totalPrice: string;
    unitPrice: string;
    totalPriceDiscount: string;
    unitPriceDiscount: string;
    linkRewrite: string;
    quantity: CardQuantity;
    cover: string;
}

interface Customer {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}

export interface OrderDetails {
    customer: Customer;
    reference: string;
    totalPaid: string;
    totalProduct: string;
    totalShipment: string;
    payment: string;
    cartDetails: CardDetail[];
}

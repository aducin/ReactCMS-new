interface Postal {
    current: string;
}

export interface PostalListSingleItem extends Postal {
    number: number;
    date: string;
}

export interface PostalResponse extends Postal {
    list: PostalListSingleItem[];
    success: boolean;
}

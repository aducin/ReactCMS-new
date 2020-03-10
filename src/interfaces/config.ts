export interface Option {
    id: number;
    name: string;
}

export interface OrderOption extends Option {
    additional?: string;
    db: string;
}

export interface OrderParams {
    additional?: string;
    db?: string;
    id?: string;
};

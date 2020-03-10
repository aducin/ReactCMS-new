import { AccountSingleItem } from '../interfaces/accounts';
import { accountType } from '../config';
import { Option as OptionInterface } from '../interfaces/config';

interface AccountParams {
    dateFrom: string;
    dateTo: string;
    state: number;
    type: number;
    [key: string]: string | number;
}

export const setParams = (params: AccountParams) => {
    let query = '';
    for (const el in params) {
        const value = params[el];
        if (typeof value === 'number' && value > -1) {
            query = `${query}&${el}=${value}`;
        } else if (typeof value === 'string' && value.length > 0) {
            query = `${query}&${el}=${value}`;
        }
    }
    return query;
};

export const setTypeName = (list: AccountSingleItem[]) => {
    return list.map((el: AccountSingleItem) => {
        const result = {...el};
        const typeIndex = accountType.findIndex((singleType: OptionInterface) => singleType.id === el.type);

        if (typeIndex !== -1) {
            result.typeName = accountType[typeIndex].name;
        }
        return result;
    });
}

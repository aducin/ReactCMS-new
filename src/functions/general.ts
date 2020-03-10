import moment from 'moment';
import { Option as OptionInterface } from '../interfaces/config';

export const convertDateToString = (date: Date) => moment(date).format('YYYY-MM-DD');

export const convertDateToTimestamp = (date: Date) => date.getTime();

export const setOptionValue = (list: OptionInterface[], state: number) => {
    const optionIndex = list.findIndex(el => el.id === state);
    return optionIndex !== -1 ? list[optionIndex].id : '';
};

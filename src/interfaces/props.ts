import { match } from "react-router-dom";
import { Token as TokenInterface } from './token';
import { OrderParams } from './config';

export interface OrderPropsInterface extends TokenInterface {
    history: {
        push(url: string): void;
    };
    match: match<OrderParams>;
};

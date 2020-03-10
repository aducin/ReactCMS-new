import React from 'react';
import { Header as HeaderInterface } from '../interfaces/header';

export default function Header(props: HeaderInterface) {
    return(
        <div className="container">
            <div className="col-xs-12">
                <h3>{props.title}</h3>
            </div>
        </div>
    );
};

import React from 'react';
import { DetailsTableHeader, TableDetails } from '../../interfaces/details';

export const setTableDetails = (list: TableDetails[]) => {
    const details = list.map(el => {
        return (
            <div className="row">
                <div className="col-xs-12 col-lg-6">
                    <label>{ el.label }</label>
                </div>
                <div className="col-xs-12 col-lg-6">
                    <p>{ el.value }</p>
                </div>
            </div>
        );
    });
    return (
        <div className="col-xs-12">
            {details}
        </div>
    );
}

export const setTableHeaders = (headers: DetailsTableHeader[]) => {
    const tableHeaders = headers.map((el, index) => {
        return <th key={index}>{el.name}</th>;
    });
    return (
        <tr>
            {tableHeaders}
        </tr>
    );
}

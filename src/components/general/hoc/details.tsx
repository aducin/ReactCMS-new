import React from 'react';

export const setDetailsTable = (tableHeaders: JSX.Element, tableRows: JSX.Element[]) => {
    return (
        <React.Fragment>
            <table className="table table-striped table-bordered">
                <thead>
                    {tableHeaders} 
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        </React.Fragment>
    );
}

export const setDetailsView = (label: JSX.Element, table: JSX.Element) => {
    return (
        <React.Fragment>
            {label}
            {table}
        </React.Fragment>
    );
}

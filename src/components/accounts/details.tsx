import React, { useContext } from 'react';
import Loading from '../loading';
import { setDetailsTable, setDetailsView } from '../general/hoc/details';
import { setTableHeaders } from '../general/table';
import { AccountsDetails as AccountsDetailsInterface } from '../../interfaces/details';
import { AccountSingleItem } from '../../interfaces/accounts';
import { ConfigContext } from '../../contexts/configContext';

const AccountDetails: React.FC<AccountsDetailsInterface> = (props: AccountsDetailsInterface) => {
    const { amount, automatic, error, list, loading, maxAmount } = props;

    let content;
    let loadingIndicator;
    const config = useContext(ConfigContext);
    const accountsTexts = config.accounts;

    if (list.length && !error) {
        const title = automatic ? accountsTexts.details.titleAuto(amount) : accountsTexts.details.titleCustom(amount);
        let overreached;

        if (maxAmount > amount) {
            overreached = <h3>{accountsTexts.details.titleOverreached}</h3>
        }
        const label = (
            <div className="col-xs-12 col-md-6 text-center">
                <h3>{title}</h3>
                {overreached}
            </div>
        );
        const tableHeaders = setTableHeaders(accountsTexts.details.headers);
        const tableRows = list.map((el: AccountSingleItem, index: number) => {
            const closedClass = el.closed ? '.text-danger' : 'text-success';
            const remarks = el.remarks ? el.remarks : '---';
            return (
                <tr key={index} className="clickable-row text-center" onClick={() => props.handleTableRowClicked(el.id)}>
                    <td className={closedClass}>{index + 1}.</td>
                    <td>{el.recipient}</td>
                    <td>{el.address}</td>
                    <td>{el.amount}{config.currency}</td>
                    <td>{el.typeName}</td>
                    <td>{el.receipt}</td>
                    <td>{el.receiptTime}</td>
                    <td>{el.cashTime}</td>
                    <td>{el.locs}</td>
                    <td>{el.coach}</td>
                    <td>{el.element}</td>
                    <td>{el.accessories}</td>
                    <td>{el.book}</td>
                    <td>{el.car}</td>
                    <td>{remarks}</td>
                </tr>
            );
        });
        const table = setDetailsTable(tableHeaders, tableRows);
        content = setDetailsView(label, table);
    } else {
        content = <p>{accountsTexts.details.empty}</p>
    }

    if (loading) {
        loadingIndicator = (<Loading />);
    }
    return(
        <React.Fragment>
            {content}
            {loadingIndicator}
        </React.Fragment>
    );
}

export default AccountDetails;

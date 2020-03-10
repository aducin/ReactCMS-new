import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../loading';
import { setDetailsTable } from '../general/hoc/details';
import { setTableDetails, setTableHeaders } from '../general/table';
import { OrderDetails as OrderDetailsInterface } from '../../interfaces/details';
import { CardDetail as CardDetailInterface } from '../../interfaces/orders';
import { ConfigContext } from '../../contexts/configContext';

const OrderDetails: React.FC<OrderDetailsInterface> = (props: OrderDetailsInterface) => {
    const [displayProduct, setDisplayProduct] = useState(false);
    const [displayShippingNumber, setDisplayShippingNumber] = useState(false);
    const [shippingNumber, setShippingNumber] = useState('');
    const { details, dispatch, loading, params } = props;
    let content;
    let loadingIndicator;
    const config = useContext(ConfigContext);
    const ordersTexts = config.orders;

    if (Object.keys(params).length === 0) {
        content = <h3>{ ordersTexts.details.noParams }</h3>
    } else {
        if (!params.additional && details) {
            const panel = params.db === 'new' ? ordersTexts.details.panels.new : ordersTexts.details.panels.old;
            const title = ordersTexts.details.headers.detail(panel, params.id || '', details.reference);
            const label = (
                <div className="col-xs-12 col-md-6 text-center">
                    <h3>{title}</h3>
                </div>
            );
            const amount = `${details.totalPaid} ${config.currency}`;
            const customerName = `${details.customer.firstname} ${details.customer.lastname}`;
            const tableDetailsValues = [
                { label: ordersTexts.details.labels.customer, value: customerName },
                { label: ordersTexts.details.labels.email, value: details.customer.email },
                { label: ordersTexts.details.labels.amount, value: amount }
            ];
            const tableDetails = setTableDetails(tableDetailsValues);
            const tableHeaders = setTableHeaders(ordersTexts.details.headers.tableHeaders);
            const tableRows = details.cartDetails.map((el: CardDetailInterface, index: number) => {
                const productUrl = config.productUrl + el.productId + '-' + el.linkRewrite + '.html';
                return(
                    <tr key={index} className="clickable-row text-center">
                        <td>
                            <img
                                onMouseOver={() => setDisplayProduct(true)}
                                onMouseOut={() => setDisplayProduct(false)}
                                src={el.cover}
                             />
                        </td>
                        <td>{el.productId}</td>
                        <td>
                            <a href={productUrl} target="blank">{el.productName}</a>
                        </td>
                        <td>{el.quantity.current}</td>
                        <td>{el.quantity.toUpdate}</td>
                        <td>{el.productQuantity}</td>
                        <td><button type="button">{ ordersTexts.buttons.details.fullEdition(el.productId)}</button></td>
                    </tr>
                );
            });
            const table = setDetailsTable(tableHeaders, tableRows);
            const evenLink = `${config.urlApp}orders/${params.db}/${params.id}`;
            let shippingNumberContainer;

            if (displayShippingNumber) {
                shippingNumberContainer = (
                    <div className="row">
                        <div className="col-xs-12 col-lg-6">
                            <label>{ ordersTexts.labels.shippingNumber }</label>
                        </div>
                        <div className="col-xs-12 col-lg-6">
                            <input
                                type="text"
                                className="form-control"
                                value={shippingNumber}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setShippingNumber(event.target.value)}
                            />
                        </div>
                    </div>
                );
            }
            const footer = (
                <div className="col-xs-12 col-md-6 text-center">
                    <div className="col-xs-12 col-md-6">
                        <Link to={evenLink} className="form-control">{ ordersTexts.buttons.details.even }</Link>
                        <button
                            className="form-control"
                            type="button"
                            onClick={ () => dispatch({ type: 'clearFilters' }) }
                        >{ ordersTexts.buttons.details.remove }</button>
                        <button
                            className="form-control"
                            type="button"
                            onClick={ () => setDisplayShippingNumber(true) }
                        >{ ordersTexts.buttons.details.shippingNumber }</button>
                    </div>
                    {shippingNumberContainer}
                </div>
            );
            content = (
                <React.Fragment>
                    {label}
                    {tableDetails}
                    {table}
                    {footer}
                </React.Fragment>
            );
        }
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

export default OrderDetails;

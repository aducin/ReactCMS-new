import React, { useContext } from 'react';
import Loading from '../loading';
import { setDetailsTable, setDetailsView } from '../general/hoc/details';
import { PostalDetails as PostalDetailsInterface } from '../../interfaces/details';
import { PostalListSingleItem } from '../../interfaces/postal';
import { ConfigContext } from '../../contexts/configContext';

const PostalDetails: React.FC<PostalDetailsInterface> = (props: PostalDetailsInterface) => {
    const { error, list, loading } = props;

    let detailsTable;
    let loadingIndicator;
    const config = useContext(ConfigContext);
    const postalTexts = config.postal;

    if (list.length && !error) {
        const label = (
            <div className="col-xs-12 col-md-6 text-center">
                <h3>{postalTexts.details.title(list.length)}</h3>
            </div>
        );
        const tableHeaders = (
            <tr>
                <th className="col-xs-1 text-center">{postalTexts.headers.position}</th>
                <th className="col-xs-4 text-center">{postalTexts.headers.amount}</th>
                <th className="col-xs-6 text-center">{postalTexts.headers.created}</th>
            </tr>
        );
        const tableRows = list.map((el: PostalListSingleItem, index: number) => {
            return (
                <tr key={index} className="text-center">
                    <td className="col-xs-1">{el.number}.</td>
                    <td className="col-xs-4">{el.current}{config.currency}</td>
                    <td className="col-xs-6">{el.date}</td>
                </tr>
            );
        });
        const table = setDetailsTable(tableHeaders, tableRows);
        detailsTable = setDetailsView(label, table);
    }

    if (loading) {
        loadingIndicator = (<Loading />);
    }
    return (
        <React.Fragment>
            {detailsTable}
            {loadingIndicator}
        </React.Fragment>
    );
}

export default PostalDetails;

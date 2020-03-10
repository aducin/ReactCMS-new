import React, { useContext, useState } from 'react';
import Header from '../header';
import Loading from '../loading';
import PostalModal from '../modals/postalModal';
import { PostalHeader as PostalHeaderInterface } from '../../interfaces/header';
import { ConfigContext } from '../../contexts/configContext';

const PostalHeader: React.FC<PostalHeaderInterface> = (props: PostalHeaderInterface) => {
    const [modalAction, setModalAction] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const { amount, loading } = props;

    const config = useContext(ConfigContext);
    const postalTexts = config.postal;

    const handleButtonClicked = (name: string) => {
        setModalAction(name);
        setModalOpen(true);
    }

    let modal;

    if (modalOpen) {
        const modalTitle = modalAction === 'add' ? postalTexts.modal.title.add : postalTexts.modal.title.subtract;
        const modalProps = {
            action: modalAction,
            close: () => setModalOpen(false),
            current: amount,
            open: modalOpen,
            title: modalTitle
        }
        modal = <PostalModal {...modalProps} />;
    }
    const amountContainer = loading ?
        <div className="col-xs-12 col-md-8 text-center">
            <Loading />
        </div> :
        <React.Fragment>
            <div className="col-xs-12 col-md-4 text-center">
                <h3>{postalTexts.labels.currentAmount}</h3>
            </div>
            <div className="col-xs-12 col-md-4 text-center">
                <h3>{amount}{config.currency}</h3>
            </div>
        </React.Fragment>;

    const content = (
        <div className="col-xs-12">
            <div className="row">
                { amountContainer }
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-4 pull-left">
                    <input
                        className="form-control btn btn-primary"
                        disabled={!loading}
                        type="button"
                        value={postalTexts.buttons.header.add}
                        onClick={ () => handleButtonClicked('add') }
                    />
                </div>
                <div className="col-xs-12 col-md-4 pull-left">
                    <input
                        className="form-control btn btn-primary"
                        disabled={loading}
                        type="button"
                        value={postalTexts.buttons.header.subtract}
                        onClick={ () => handleButtonClicked('subtract') }
                    />
                </div>
            </div>
        </div>
    );
    return(
        <div className="container">
            <div className="row mb-4">
                <Header title={postalTexts.title} />
            </div>
            {content}
            {modal}
        </div>
    );
}

export default PostalHeader;

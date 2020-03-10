import React, { useCallback, useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import Header from '../header';
import AccountsModal from '../modals/accountsModal';
import { AccountHeader as AccountHeaderInterface } from '../../interfaces/header';
import { Option as OptionInterface } from '../../interfaces/config';
import { ConfigContext } from '../../contexts/configContext';
import { setOptionValue } from '../../functions/general';

const AccountHeader: React.FC<AccountHeaderInterface> = (props: AccountHeaderInterface) => {
    const [modalAction, setModalAction] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const { accountState, accountType, dateEnd, dateStart, dispatch, loading, selectedRow } = props;
    const config = useContext(ConfigContext);
    const options = config.selects;
    const accountTexts = config.accounts;

    const handleButtonClicked = useCallback((type: string) => {
        setModalAction(type);
        setModalOpen(true);
    },[]);
    const handleDateChanged = useCallback((date: Date, action: string) => {
        dispatch({ type: action, date });
    },[dispatch]);
    const handleSelectChanged = useCallback((event: React.FormEvent<HTMLSelectElement>, action: string) => {
        event.preventDefault();
        const element = event.target as HTMLSelectElement;
        dispatch({ type: action, singleValue: parseInt(element.value) });
    }, [dispatch]);
    const setList = useCallback((list: OptionInterface[]) => {
        return list.map((el, index) => {
            return <option key={ index } value={ el.id }>{ el.name }</option>;
        });
    }, []);
    const defaultOption: OptionInterface = options.default;
    const stateList = accountState === -1 ?
        [...[defaultOption], ...options.accounts.state] :
        options.accounts.state;
    const typeList = accountType === -1 ?
        [...[defaultOption], ...options.accounts.type] :
        options.accounts.type;
    const stateOption = setOptionValue(stateList, accountState);
    const stateOptions = setList(stateList);
    const typeOption = setOptionValue(typeList, accountType);
    const typeOptions = setList(typeList);
    let modal;

    if (modalOpen) {
        const modalTitle = modalAction === 'add' ? accountTexts.modal.title.add : accountTexts.modal.title.modify;
        const modalProps = {
            action: modalAction,
            close: () => setModalOpen(false),
            open: modalOpen,
            selectedRow: selectedRow || null,
            title: modalTitle
        }
        modal = <AccountsModal {...modalProps} />;
    }

    return(
        <div className="container">
            <div className="row mb-4">
                <Header title={accountTexts.title} />
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-8 mb-4 pull-left">
                    <div className="col-xs-12">
                        <div className="col-xs-12 pull-left">
                            <h4>{ accountTexts.subtitles.filter }</h4>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-xs-12 col-sm-0 col-md-1 pull-left"></div>
                        <div className="col-xs-12 col-sm-6 col-md-4 pull-left">
                            <label>{ accountTexts.labels.type }</label>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-5 pull-right">
                            <select
                                className="form-control"
                                disabled={props.loading}
                                onChange={(event: React.FormEvent<HTMLSelectElement>) => handleSelectChanged(event, 'setAccountType')}
                                value={typeOption}
                            >{typeOptions}</select>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-xs-12 col-sm-0 col-md-1 pull-left"></div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <label>{ accountTexts.labels.state }</label>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-5 pull-right">
                            <select
                                className="form-control"
                                disabled={props.loading}
                                onChange={(event: React.FormEvent<HTMLSelectElement>) => handleSelectChanged(event, 'setAccountState')}
                                value={stateOption}
                            >{stateOptions}</select>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-xs-12 col-sm-0 col-md-1 pull-left"></div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <label>{ accountTexts.labels.dateStart }</label>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-5 pull-right">
                            <DatePicker
                                dateFormat="yyyy.MM.dd"
                                selected={dateStart}
                                onChange={(date: Date) => handleDateChanged(date, 'setDateStart')}
                                locale="pl-pl"
                                className="text-center form-control"
                                todayButton={ config.datePicker.today }
                            />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-xs-12 col-sm-0 col-md-1 pull-left"></div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <label>{ accountTexts.labels.dateEnd }</label>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-5 pull-right">
                            <DatePicker
                                dateFormat="yyyy.MM.dd"
                                selected={dateEnd}
                                onChange={(date: Date) => handleDateChanged(date, 'setDateEnd')}
                                locale="pl-pl"
                                className="text-center form-control"
                                todayButton={ config.datePicker.today }
                            />
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-md-4 pull-left">
                    <div className="col-xs-12">
                        <h4>{ accountTexts.subtitles.manage }</h4>
                    </div>
                    <input
                        className="form-control btn btn-primary mb-2"
                        disabled={loading}
                        onClick={() => handleButtonClicked('add')}
                        type="button"
                        value={accountTexts.buttons.add}
                    />
                    <input
                        className="form-control btn btn-primary"
                        disabled={loading || !selectedRow}
                        onClick={() => handleButtonClicked('edit')}
                        type="button"
                        value={accountTexts.buttons.edit}
                    />
                </div>
            </div>
            {modal}
		</div>
	);
}

export default AccountHeader;

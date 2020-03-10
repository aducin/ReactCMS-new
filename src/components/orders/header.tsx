import React, { useCallback, useContext, useState } from 'react';
import Header from '../header';
import { OrderHeader as OrderHeaderInterface } from '../../interfaces/header';
import { Option as OptionInterface } from '../../interfaces/config';
import { ConfigContext } from '../../contexts/configContext';
import { setOptionValue } from '../../functions/general';

const OrderHeader: React.FC<OrderHeaderInterface> = (props: OrderHeaderInterface) => {
    const [ numberActionError, setNumberActionError ] = useState(false);
    const [ numberOriginError, setNumberOriginError ] = useState(false);
    const { action, dispatch, numberAction, numberOrigin, loading, origin } = props;
    const config = useContext(ConfigContext);
    const options = config.selects;
    const ordersTexts = config.orders;

    const handleButtonClicked = useCallback((type: string) => {
        dispatch({ type: 'setUpdateUrl' });
    }, []);

    const handleKeyPressed = useCallback((value: string, action: string) => {
        const parsedValue = parseInt(value);
        setNumberActionError(false);
        setNumberOriginError(false);

        if (isNaN(parsedValue) || parsedValue.toString() !== value) {
            action === 'Action' ? setNumberActionError(true) : setNumberOriginError(true);
        }
        dispatch({ type: `setNumber${action}`, inputPayload: value });
    }, []);

    const handleSelectChanged = useCallback((event: React.FormEvent<HTMLSelectElement>, action: string) => {
        event.preventDefault();
        const element = event.target as HTMLSelectElement;
        dispatch({ type: action, selectPayload: parseInt(element.value) });
    }, [dispatch]);

    const setList = useCallback((list: OptionInterface[]) => {
        return list.map((el, index) => {
            return <option key={ index } value={ el.id }>{ el.name }</option>;
        });
    }, []);

    const defaultOption: OptionInterface = options.default;
    const actionList = action === 0 ?
        [...[defaultOption], ...options.orders.action] :
        options.orders.action;
    const actionOption = setOptionValue(actionList, action);
    const actionOptions = setList(actionList);
    const originList = origin === 0 ?
        [...[defaultOption], ...options.orders.origin] :
        options.orders.origin;
    const originOption = setOptionValue(originList, origin);
    const originOptions = setList(originList);
    const numberActionInputClassName = numberActionError ? 'form-control is-invalid' : 'form-control';
    const numberOriginInputClassName = numberOriginError ? 'form-control is-invalid' : 'form-control';
    const buttonActionDisabled = loading || numberActionError || action === 0 || numberAction.length === 0;
    const buttonOriginDisabled = loading || numberOriginError || origin === 0 || numberOrigin.length === 0;

    return(
        <div className="container">
            <div className="row mb-4">
                <Header title={ordersTexts.title} />
            </div>
            <div className="row mb-4">
                <div className="col-xs-12 col-md-3 pull-left">
                    <h4>{ ordersTexts.labels.order }</h4>
                </div>
                <div className="col-xs-12 col-md-3 pull-left">
                    <select
                        className="form-control"
                        disabled={props.loading}
                        onChange={(event: React.FormEvent<HTMLSelectElement>) => handleSelectChanged(event, 'setOrigin')}
                        value={originOption}
                    >{originOptions}</select>
                </div>
                <div className="col-xs-12 col-md-3 pull-left">
                    <input
                        type="text"
                        className={numberOriginInputClassName}
                        value={numberOrigin}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleKeyPressed(event.target.value, 'Origin')}
                    />
                </div>
                <div className="col-xs-12 col-md-3 pull-left">
                    <input
                        className="form-control btn btn-primary"
                        disabled={buttonOriginDisabled}
                        type="button"
                        value={ordersTexts.buttons.header.search}
                        onClick={ () => handleButtonClicked('origin') }
                    />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-xs-12 col-md-3 pull-left">
                    <h4>{ ordersTexts.labels.action }</h4>
                </div>
                <div className="col-xs-12 col-md-3 pull-left">
                    <select
                        className="form-control"
                        disabled={props.loading}
                        onChange={(event: React.FormEvent<HTMLSelectElement>) => handleSelectChanged(event, 'setAction')}
                        value={actionOption}
                    >{actionOptions}</select>
                </div>
                <div className="col-xs-12 col-md-3 pull-left">
                    <input
                        type="text"
                        className={numberActionInputClassName}
                        value={numberAction}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleKeyPressed(event.target.value, 'Action')}
                    />
                </div>
                <div className="col-xs-12 col-md-3 pull-left">
                    <input
                        className="form-control btn btn-primary"
                        disabled={buttonActionDisabled}
                        type="button"
                        value={ordersTexts.buttons.header.search}
                        onClick={ () => handleButtonClicked('action') }
                    />
                </div>
            </div>
        </div>
    );
}

export default OrderHeader;

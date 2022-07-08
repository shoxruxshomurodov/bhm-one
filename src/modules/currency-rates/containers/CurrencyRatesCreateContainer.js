import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import ApiActions from "../../../services/api/Actions";
import Currency from "../../../schema/Currency";
import {get, values} from "lodash";
import Normalizer from "../../../services/normalizr";
import PdfCreateForm from "../components/PdfCreateForm";
import ApiServices from "../services/ApiService";
import {toast, ToastContainer} from "react-toastify";


class CurrencyRatesCreateContainer extends Component {

    componentDidMount() {
        const {getExchangePoints,getOnlineConversion,getAtmRates} = this.props;
        getExchangePoints();
        getOnlineConversion();
        getAtmRates();
    }

    create = (params) => {
        const {history} = this.props;
        ApiServices.createCurrencyRate(params).then((res) => {
            if (res && res.data) {
                history.push(`/currency/view/${res.data.id}`);
            }
        }).catch((e) => {
                if (e && e.response) {
                    toast.error(`Error: ${e}`)
                }
            }
        );
    }


    render() {
        let {exchangePointsList,onlineConversionList,atmRatesList,entities} = this.props;
        exchangePointsList = values(Normalizer.Denormalize(exchangePointsList,[Currency],entities));
        onlineConversionList = values(Normalizer.Denormalize(onlineConversionList,[Currency],entities));
        atmRatesList = values(Normalizer.Denormalize(atmRatesList,[Currency],entities));
        return (
            <div className={"page-content padding"}>
                <div className="row">
                    <div className="col-md-12">
                        <ToastContainer/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <PdfCreateForm exchangePointsList={exchangePointsList} onlineConversionList={onlineConversionList} atmRatesList={atmRatesList} createPdf={this.create}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalize.entities', []),
        exchangePointsList:get(state,'normalize.data.exchange-point-list.result',[]),
        onlineConversionList:get(state,'normalize.data.online-conversion-list.result',[]),
        atmRatesList:get(state,'normalize.data.atm-rates-list.result',[]),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getExchangePoints: () => {
            const storeName = 'exchange-point-list';
            const entityName = 'currency';
            const scheme = {data: [Currency]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/currency/rates/exchange-point',
                    config: {
                        params: {
                            include:'option'
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getOnlineConversion: () => {
            const storeName = 'online-conversion-list';
            const entityName = 'currency';
            const scheme = {data: [Currency]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/currency/rates/online-conversion',
                    config: {
                        params: {
                            include:'option'
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getAtmRates: () => {
            const storeName = 'atm-rates-list';
            const entityName = 'currency';
            const scheme = {data: [Currency]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/currency/rates/atm-rates',
                    config: {
                        params: {
                            include:'option'
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CurrencyRatesCreateContainer));
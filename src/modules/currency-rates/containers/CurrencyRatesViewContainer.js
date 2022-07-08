import React, {Component} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {PDFDownloadLink,PDFViewer} from '@react-pdf/renderer';
import ApiActions from "../../../services/api/Actions";
import Currency from "../../../schema/Currency";
import {get, isEqual} from "lodash";
import PDF from "../components/PDF";
import Normalizer from "../../../services/normalizr";
import PdfViewForm from "../components/PdfViewForm";
import {info,sign} from "../services/Sign";
import ApiService from "../services/ApiService";
import {toast, ToastContainer} from "react-toastify";
import QRCode from "qrcode.react";


class CurrencyRatesViewContainer extends Component {
    state = {
        certinfo:{},
        hash:{},
        canvas:''
    }
    componentDidMount() {
        info(this.onSuccessInfo);
        this.getCurrency();
        this.getCanvas();
    }

    getCanvas(){
        const qrCodeCanvas = document.querySelector('canvas');
        const qrCodeDataUri = qrCodeCanvas.toDataURL('image/jpg', 0.3);
        this.setState({canvas:qrCodeDataUri});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {certinfo} = this.state;
        const {certinfo:prevCertInfo} = prevState;
        if(!isEqual(certinfo,prevCertInfo)){
            sign(sign('test',this.onSuccessHash));
        }
    }

    getCurrency = () => {
        const {getOneCurrency, currency_id} = this.props;
        getOneCurrency({id: currency_id, api_url: `/currency/passport/${currency_id}`});
    }
    signDoc = async () => {
        const {currency} = this.props;
        const {certinfo,hash} = this.state;
        const params = {certInfo:certinfo, id: get(currency, 'id', null), signedMsg: hash};
         ApiService.signPdf(params).then((res) => {
            if (res && res.data) {
                toast.success(`Документ успешно подписан`);
                this.getCurrency();
            }
        }).catch((e) => {
            if(e.response.data){
                e.response.data.forEach(({message})=>{
                    toast.error(`Error: ${message}`);
                })
            }
            console.log(e);
        })
    }
    onSuccessInfo = ({certinfo = {}}) => {
        this.setState({certinfo});
    }

    onSuccessHash = ({hash}) => {
        this.setState({hash});
    }
    render() {
        const {canvas} = this.state;
        let {currency, entities, history} = this.props;
        currency = Normalizer.Denormalize(currency, Currency, entities);
        const exchangePointsList = get(currency, 'exchangePoints', []);
        const onlineConversionList = get(currency, 'onlineConversions', []);
        const atmRatesList = get(currency, 'atmRates', []);
        const employee = get(currency, 'employee', {});
        console.log(currency,"currency")
        const {id, order_date, order_number, qrcode, status,created_at,current_date} = currency;
        return (
            <div className={"page-content padding"}>
                <div className="row">
                    <div className="col-md-12">
                        <ToastContainer/>
                        <QRCode style={{display:'none'}}  value={`http://new.xb.uz:8081/uz/currency-passport/${get(qrcode, 'url', '')}`} />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-12">
                                <PdfViewForm qrcode={qrcode} status={status} exchangePointsList={exchangePointsList}
                                             onlineConversionList={onlineConversionList} atmRatesList={atmRatesList} id={id} order_date={order_date}
                                             order_number={order_number} current_date={current_date} employee={employee} created_at={created_at} sign={this.signDoc}/>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-2 text-right">
                        {isEqual(status, 10) &&
                        <button
                            className="btn btn-lg btn-raised btn-wave btn-icon btn-rounded mt-2 teal text-white mr-2"
                            onClick={() => history.push(`/currency/update/${id}`)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                                 strokeLinejoin="round" className="feather feather-edit-3 mx-2">
                                <polygon points="14 2 18 6 7 17 3 17 3 13 14 2"/>
                                <line x1={3} y1={22} x2={21} y2={22}/>
                            </svg>
                        </button>
                        }
                        {isEqual(status,1) && <a
                            href={`${get(qrcode, 'file_url', '')}`}
                            target={'_blank'}
                            className="btn btn-lg btn-raised btn-wave btn-icon btn-rounded mt-2 teal text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"
                                 fill="none"
                                 stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                                 className="feather feather-download mx-2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1={12} y1={15} x2={12} y2={3}/>
                            </svg>
                        </a>
                        }
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalize.entities', []),
        currency: get(state, 'normalize.data.currency-one.result', {}),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getOneCurrency: ({id, api_url}) => {
            const storeName = 'currency-one';
            const entityName = 'currency';
            const scheme = {Currency};
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: api_url,
                    config: {
                        params: {
                            include: 'exchangePoints,onlineConversions,atmRates,employee'
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CurrencyRatesViewContainer));
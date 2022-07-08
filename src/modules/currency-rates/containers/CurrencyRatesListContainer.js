import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Title from "../../../components/Title/Title";
import ApiActions from "../../../services/api/Actions";
import {get, isEmpty,isEqual,isNil} from "lodash";
import Normalizer from "../../../services/normalizr";
import CurrencyListScheme from "../../../schema/CurrencyListScheme";
import BaseTable from "../../../components/BaseTable";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader";
import NumberFormat from "react-number-format";
import moment from "moment";

class CurrencyRatesListContainer extends Component {

    componentDidMount() {
        const {getAllCurrency} = this.props;
        getAllCurrency({});
    }

    pagination = (page = 1) => {
        const {getAllCurrency} = this.props;
        getAllCurrency({page});
    }


    render() {
        let {entities,isFetched,meta,currencyList,history} = this.props;
        currencyList = Normalizer.Denormalize(currencyList,[CurrencyListScheme],entities);
        console.log('currencyList',currencyList)
        return (
            <div className={"page-content padding"}>
                <div className="row">
                    <div className="col-md-12">
                        {
                            isFetched
                                ?
                                <>
                                    {
                                        !isEmpty(currencyList) ? <>
                                            <BaseTable head={['ID','БУЮРТМА САНАСИ','БУЮРТМА РАҚАМИ','ИМЗО','ХОДИМ','ЯРАТИЛГАН САНА']} className={"mt-3"}>
                                                {
                                                    currencyList && currencyList.map(({id,order_date,order_number,status,employee={},created_at}, index) => <tr
                                                        key={id}
                                                        style={{verticalAlign: 'middle'}} onDoubleClick={() => history.push(`/currency/view/${id}`)}>
                                                        <td>{id}</td>
                                                        <td>{order_date}</td>
                                                        <td><NumberFormat displayType={'text'} thousandSeparator={' '} value={order_number}/></td>
                                                        <td>{isEqual(status,1) ? <span className={'text-success'}>Подписано</span> : <span className={'text-danger'}>Без подписи</span>}</td>
                                                        <td>{!isNil(get(employee,'full_name')) && `${get(employee,'full_name')} (${get(employee,'post_name')})`}</td>
                                                        <td>{moment(created_at).format('DD/MM/YYYY HH:MM')}</td>
                                                    </tr>)
                                                }
                                            </BaseTable>
                                            <Pagination meta={meta} onChange={this.pagination}/>
                                        </> : <p className="search-data">Маълумот
                                            йўқ</p>
                                    }
                                </>
                                : <Loader/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        entities: get(state, 'normalize.entities', []),
        currencyList:get(state,'normalize.data.currency-list.result.data',[]),
        meta:get(state,'normalize.data.currency-list.result._meta',{}),
        isFetched:get(state,'normalize.data.currency-list.isFetched',false)
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getAllCurrency: ({page = 1}) => {
            const storeName = 'currency-list';
            const entityName = 'currency';
            const scheme = {data: [CurrencyListScheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/currency/passport/index',
                    config: {
                        params: {
                            include:'employee',
                            page
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

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CurrencyRatesListContainer));
import React, {Component} from 'react';
import actions from "../../katm/actions";
import {get, isEmpty} from "lodash";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Title from "../../../components/Title/Title";
import {Link} from "react-router-dom";
import BaseTable from "../../../components/BaseTable";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader";
import ApiService from "../../katm/services/ApiService";
import {toast} from "react-toastify";

class ActiveRequestsContainer extends Component {

    componentDidMount() {
        const {getActiveRequests} = this.props;
        getActiveRequests({});
    }

    pagination = (page = 1) => {
        const {getActiveRequests} = this.props;
        getActiveRequests({
            params: {
                page
            }
        });
    }

    deleteRequests = (requests) => {
        var requests_delete = window.confirm("Ўчирмоқчимисиз?");
        if (requests_delete) {
            ApiService.deleteRequests(requests).then((response) => {
                this.setState({loading: false});
                toast.success('Success delete Requests');
                this.props.history.push('/katm');
            }).catch((error) => {
                this.setState({loading: false});
                toast.error('Error:' + error?.response?.data);
            })
        }
        else {

        }
    }

    render() {
        const {active_requests, meta, history, isFetched,} = this.props
        const {t} = this.props
        return (
            <div className={"page-content padding"}>
                <div className="row">
                    <div className="col-md-12">
                        <Title>{t("Active requests")}</Title>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {
                            isFetched
                                ?
                                <>
                                    {
                                        !isEmpty(active_requests) ? <>
                                            <BaseTable head={['Филиал Cоде', 'ФИО', 'Сони', 'ИНПС', 'Документ Номер']}
                                                       className={"mt-3"}>
                                                {
                                                    active_requests && active_requests.map((requests, index) => <tr
                                                        onDoubleClick={() => this.deleteRequests(requests)}
                                                        key={index}
                                                        style={{verticalAlign: 'middle'}}>
                                                        <td>{requests.filial ? requests.filial.name : ''}</td>
                                                        <td>{requests.user ? requests.user.name : ''}</td>
                                                        <td>{requests.count}</td>
                                                        <td>{requests.inps}</td>
                                                        <td>{requests.doc_num}</td>
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

const mapDispatchToProps = (dispatch) => {
    return {
        getActiveRequests: (params) => {
            dispatch({type: actions.GET_ACTIVE_REQUESTS.REQUEST, payload: params});
        },

    };
};

const mapStateToProps = (state) => {
    return {
        active_requests: get(state, "katm.active_requests", []),
        entities: get(state, "normalize.entities", {}),
        isFetched: get(state, "katm.isFetched", false),
        meta: get(state, "katm._meta", {})
    };
};
export default withTranslation("bhm_one")(connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ActiveRequestsContainer)));

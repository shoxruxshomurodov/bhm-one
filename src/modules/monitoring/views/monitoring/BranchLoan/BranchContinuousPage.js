import React, {useEffect, useState} from 'react';
import {get, isEmpty, isEqual, isNil} from "lodash";
import ApiActions from "../../../../../services/api/Actions";
import Loan from "../../../../../schema/Loans";
import {connect} from "react-redux";
import {withRouter, useHistory} from "react-router";
import Pagination from "../../../../../components/Pagination/Pagination";
import Normalizer from "../../../../../services/normalizr";
import NumberFormat from "react-number-format";
import moment from "moment";
import Loader from "../../../../../components/Loader";
import TemplateTable from "../../../../../components/TemplateTable";
import Toolbar from "../../../../../components/Toolbar";
import Utils from "../../../../../services/helpers/Utils";
import classNames from "classnames";
import SelectAsyncPaginate from "../../../../../components/SelectAsyncPagination";
import {withTranslation} from "react-i18next";
import Aside from "../../../component/Aside";
function BranchContinuousPage(props) {
    const {t} = props;
    const {meta, isFetched, entities, drawToRender} = props;
    const [active, setActive] = useState("")
    const [status, setStatus] = useState("all");
    const history = useHistory();
    const CallRender = (params) => {
        const {callRender, callRenderTrigger} = props;
        callRenderTrigger();
        callRender(params);
    }
    const pagination = (page = 1) => {
        CallRender({page, status})
    };
    let body = get(
        Normalizer.Denormalize(drawToRender, {data: [Loan]}, entities),
        "data",
        []
    );
    console.log(meta,'meta')
    useEffect(() => {
        CallRender({page: 1, status})
    }, [])

    const onSearch = (search) => {
        CallRender({search,status})
    }
    return (
        <>
            <div className={"page-content mt-2"} id={"page-content"}>
                <div className={"d-flex flex fixed-content"}>
                    <Aside title={t("Branch Continuous")}>
                        <ul className="nav">
                            <li className={isEqual(status, "new") && "active"}
                                onClick={() => {
                                    setStatus("new");
                                    CallRender({page: 1,status: "new"})
                                }}
                            >
                                <a>
                                    <span className="nav-text">{t("New")}</span>
                                    <span className="nav-badge"><b className="badge badge-sm badge-pill gd-warning">{get(meta,"continuous.newCount")}</b></span>
                                </a>
                            </li>
                            <li className={isEqual(status, "completed") && "active"}
                                onClick={() => {
                                    setStatus("completed");
                                    CallRender({page: 1, status: "completed"})
                                }}
                            >
                                <a>
                                    <span className="nav-text">{t("Completed")}</span>
                                    <span className="nav-badge"><b className="badge badge-sm badge-pill gd-info">{get(meta,"continuous.completedCount")}</b></span>
                                </a>
                            </li>
                            <li className={isEqual(status, "refused") && "active"}
                                onClick={() => {
                                    setStatus("refused");
                                    CallRender({page: 1, status: "refused"})
                                }}
                            >
                                <a>
                                    <span className="nav-text">{t("Refused")}</span>
                                    <span className="nav-badge"><b className="badge badge-sm badge-pill gd-danger">{get(meta,"continuous.refusedCount")}</b></span>
                                </a>
                            </li>
                            <li className={isEqual(status, "confirmed") && "active"}
                                onClick={() => {
                                    setStatus("confirmed");
                                    CallRender({page: 1, status: "confirmed"})
                                }}
                            >
                                <a>
                                    <span className="nav-text">{t("Confirmed")}</span>
                                    <span className="nav-badge"><b className="badge badge-sm badge-pill gd-success">{get(meta,"continuous.confirmedCount")}</b></span>
                                </a>
                            </li>
                            <li className={isEqual(status, "expired") && "active"}
                                onClick={() => {
                                    setStatus("expired");
                                    CallRender({page: 1, status: "expired"})
                                }}
                            >
                                <a>
                                    <span className="nav-text">{t("Expired")}</span>
                                    <span className="nav-badge"><b className="badge badge-sm badge-pill gd-danger">{get(meta,"continuous.expiredCount")}</b></span>
                                </a>
                            </li>
                            <li className={isEqual(status, "all") && "active"}
                                onClick={() => {
                                    setStatus("all");
                                    CallRender({page: 1, status: "all"})
                                }}
                            >
                                <a>
                                    <span className="nav-text">{t("All")}</span>
                                    <span className="nav-badge"><b className="badge badge-sm badge-pill gd-primary">{get(meta,"continuous.allCount")}</b></span>
                                </a>
                            </li>
                        </ul>
                    </Aside>
                    <div className={"d-flex flex mt-3"} id={"content-body"}>
                        <div className={"d-flex flex-column flex"} id={"user-list"}>
                            <Toolbar classname={"mx-2"}>
                                <>
                                    <div className={"w-25"}>
                                        <SelectAsyncPaginate url="/monitoring/products"
                                                             attrSearch="search"
                                                             params={{
                                                                 "filter[condition]": "A"
                                                             }}
                                                             property={["id", "name", "id"]}
                                                             classnames={"form-control-sm"}
                                                             onChange={(name, value) => CallRender({product_id: value})}/>
                                    </div>
                                    <form className="flex">
                                        <div className="input-group"><input type="text"
                                                                            onChange={e => onSearch(get(e, "target.value"))}
                                                                            className="form-control form-control-theme form-control-sm search"
                                                                            placeholder={t("Search")} required/> <span
                                            className="input-group-append"><button
                                            className="btn btn-white no-border btn-sm" type="button"><span
                                            className="d-flex text-muted"><svg
                                            xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                            viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-search"><circle cx={11} cy={11} r={8}/><line
                                            x1={21} y1={21} x2="16.65"
                                            y2="16.65"/></svg></span></button></span>
                                        </div>
                                    </form>
                                </>
                            </Toolbar>
                            {isFetched ?
                                <>
                                    <TemplateTable
                                        head={['ID', t("Client type"), t('Client'), t("Employee"), t('Product name'), t('Sum'), t("Percentage"), t('Open date'), t("Closed date"), t("Location"), t("Status"),t("Due_at")]}>
                                        {
                                            body && body.map((result) => {
                                                return (
                                                    <tr
                                                        key={get(result, "id")}
                                                        className={classNames("v-middle cursor-pointer text-hover", {
                                                            active: isEqual(get(result, "id"), active)
                                                        })}
                                                        onClick={() => setActive(get(result, "id"))}
                                                        onDoubleClick={() => history.push(`/credit-monitoring/branch/continuous/view/${get(result, "loan.id")}`)}
                                                    >
                                                        <td className={"text-muted"}>{get(result, "id")}</td>
                                                        <td>
                          <span
                              className={`w-40 avatar ${Utils.identifyType(get(result, "loan.client.type"), get(result, "loan.client.typeof"))?.color}`}
                              data-toggle-class="loading">{Utils.identifyType(get(result, "loan.client.type"), get(result, "loan.client.typeof"))?.type}</span>
                                                        </td>
                                                        <td className={"text-hover"}>
                                                            <div className="flex"><a className="item-author text-color"
                                                                                     data-pjax-state="">{get(result, "loan.client.name")}</a>
                                                                <div
                                                                    className="item-mail text-muted h-1x d-none d-sm-block">{isEqual(get(result, "loan.client.type"), "P") || isEqual(get(result, "loan.client.typeof"), 11) ? `${get(result, "loan.client.inn")} ${isNil(get(result, "loan.client.pinfl")) ? "" : `/ ${get(result, "loan.client.pinfl")}`}` : get(result, "loan.client.inn")}</div>
                                                            </div>
                                                        </td>
                                                        <td className={"text-muted"}>{get(result, "condition.employee.NAME")}</td>
                                                        <td className={"text-muted"}>{get(result, "loan.product.name")}</td>
                                                        <td className={"text-muted"}><NumberFormat displayType={'text'}
                                                                                                   thousandSeparator={' '}
                                                                                                   value={get(result, "loan.sum")}/>
                                                        </td>
                                                        <td className={"text-muted"}>{get(result, "loan.osn_percent")}</td>
                                                        <td className={"text-muted"}>{moment(get(result, "loan.opened_at")).format('DD/MM/YYYY')}</td>
                                                        <td className={"text-muted"}>{moment(get(result, "loan.closed_at")).format('DD/MM/YYYY')}</td>
                                                        <td className={"text-muted"}>{get(result, "loan.location.code")}</td>
                                                        <td className={"text-muted"}>{Utils.identifyLoanStatus(get(result, "condition.status"), get(result, "condition.title"))}</td>
                                                        <td className={"text-muted"}>{moment.unix(get(result, "due_at")).format("DD-MM-YYYY")}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </TemplateTable>
                                    {!isEmpty(body) && <div className={"px-3 py-3 mt-auto"}>
                                        <Pagination meta={meta} onChange={pagination}/>
                                    </div>}
                                </>
                                : <Loader/>}
                            {isFetched && isEmpty(body) && <div className="no-result card mx-3 mt-5">
                                <div className="p-4 text-center">{t("No Results")}</div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        drawToRender: get(state, "normalize.data.branch-continuous-loans.result", []),
        isFetched: get(state, "normalize.data.branch-continuous-loans.isFetched", false),
        meta: get(state, "normalize.data.branch-continuous-loans.result._meta", []),
        entities: get(state, "normalize.entities", [])
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        callRenderTrigger: () => {
            const storeName = "branch-continuous-loans";
            dispatch({
                type: ApiActions.GET_ALL.TRIGGER,
                payload: {
                    storeName,
                },
            });
        },
        callRender: (params) => {
            const storeName = "branch-continuous-loans";
            const entityName = "loan";
            const scheme = {data: [Loan]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: "/monitoring/checkpoints",
                    config: {
                        params: {
                            include: "loan.client,loan.product,loan.location,branch,condition",
                            "filter[type]":1,
                            ...params
                        }
                    },
                    scheme,
                    storeName,
                    entityName
                }
            });
        },
    };
};
export default withTranslation("bhm_one")(connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(BranchContinuousPage)));


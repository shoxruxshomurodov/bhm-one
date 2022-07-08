import React, {useEffect, useState} from 'react';
import {get, isEmpty, isEqual, isNil, sortBy} from "lodash";
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
import Aside from "../../../component/Aside";
import BranchLoansDrawer from "../../../container/branchLoan/BranchLoansDrawer";
import actions from "../../../actions";
import {notification} from "antd";
import Utils from "../../../../../services/helpers/Utils";
import Alert from "../../../component/Alert";
import classNames from "classnames";
import SelectAsyncPaginate from "../../../../../components/SelectAsyncPagination";
import {withTranslation} from "react-i18next";

function BranchLoansPage(props) {
    const {meta, isFetched, entities, drawToRender, t} = props;
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState("")
    const [type, setType] = useState("all");
    const [id, setId] = useState(null);
    const history = useHistory();
    const CallRender = (params) => {
        const {callRender} = props;
        callRender(params);
    }
    const pagination = (page = 1) => {
        CallRender({page, type})
    };
    let body = get(
        Normalizer.Denormalize(drawToRender, {data: [Loan]}, entities),
        "data",
        []
    );
    useEffect(() => {
        CallRender({page: 1, type: "all",})
    }, [])
    const showDrawer = () => {
        setVisible(true)
    };
    const onSearch = (search) => {
        CallRender({search, type: "all"})
    }
    const SetLoan = () => {
        setLoading(true)
        const {setLoan, callRender} = props;
        setLoan(id, setLoading, callRender);
    }
    const onClose = () => {
        setVisible(false)
    };
    if (loading) {
        return <Loader/>
    }
    return (
        <>
            <div className={"page-content mt-2"} id={"page-content"}>
                <div className={"d-flex flex fixed-content"}>
                    <Aside title={t("Monitoring")}>
                        <ul className="nav">
                            <li className={isEqual(type, "all") && "active"}
                                onClick={() => {
                                    setType("all");
                                    CallRender({page: 1, type: "all"})
                                }}
                            >
                                <a>
                                    <span className="nav-text">{t("Not Received")}</span>
                                    <span className="nav-badge"><b
                                        className="badge badge-sm badge-pill gd-danger">{get(meta, "requiredCount")}</b></span>
                                </a>
                            </li>
                            <li className={isEqual(type, "my") && "active"}
                                onClick={() => {
                                    setType("my");
                                    CallRender({page: 1, type: "my"})
                                }}
                            >
                                <a>
                                    <span className="nav-text">{t("My Received")}</span>
                                    <span className="nav-badge"><b
                                        className="badge badge-sm badge-pill gd-info">{get(meta, "myCount")}</b></span>
                                </a>
                            </li>
                            <li className={isEqual(type, "accepted") && "active"}
                                onClick={() => {
                                    setType("accepted");
                                    CallRender({page: 1, type: "accepted"})
                                }}
                            >
                                <a>
                                    <span className="nav-text">{t("All Received")}</span>
                                    <span className="nav-badge"><b
                                        className="badge badge-sm badge-pill gd-primary">{get(meta, "acceptedCount")}</b></span>
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
                                                             onChange={(name, value) => CallRender({"filter[product_id]": value,type})}/>
                                    </div>
                                    <form className="flex">
                                        <div className="input-group"><input type="text"
                                                                            onChange={e => onSearch(get(e, "target.value"))}
                                                                            className="form-control form-control-theme search"
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
                                        head={!isEqual(type, "all") ? ['ID', t("Client type"), t('Client'), t('Product name'), t('Sum'), t("Percentage"), t('Open date'), t("Closed date"), t("Location"), t("Status")] : ['ID', t("Client type"), t('Client'), t('Product name'), t('Sum'), t("Percentage"), t('Open date'), t("Closed date"), t("Status"), t("Due_at")]}>
                                        {
                                            body && body.map(({
                                                                  id,
                                                                  sum,
                                                                  opened_at,
                                                                  closed_at,
                                                                  osn_percent,
                                                                  client,
                                                                  product,
                                                                  location,
                                                                  loanCondition
                                                              }) => {
                                                return (
                                                    <tr
                                                        key={id}
                                                        className={classNames("v-middle cursor-pointer text-hover", {
                                                            active: isEqual(id, active)
                                                        })}
                                                        onClick={() => {
                                                            if (isEqual(type, "all")) {
                                                                showDrawer()
                                                                setId(id);
                                                            } else {
                                                                setActive(id)
                                                            }
                                                        }}
                                                        onDoubleClick={() => {
                                                            if (!isEqual(type, "all")) {
                                                                history.push(`/credit-monitoring/my-loan/view/${id}`)
                                                            }
                                                        }}
                                                    >
                                                        <td className={"text-muted"}>{id}</td>
                                                        <td>
                          <span
                              className={`w-40 avatar ${Utils.identifyType(get(client, "type"), get(client, "typeof"))?.color}`}
                              data-toggle-class="loading">{Utils.identifyType(get(client, "type"), get(client, "typeof"))?.type}</span>
                                                        </td>
                                                        <td className={"text-hover"}>
                                                            <div className="flex"><a className="item-author text-color"
                                                                                     data-pjax-state="">{get(client, "name")}</a>
                                                                <div
                                                                    className="item-mail text-muted h-1x d-none d-sm-block">{isEqual(get(client, "type"), "P") || isEqual(get(client, "typeof"), 11) ? `${get(client, "inn")} ${isNil(get(client, "pinfl")) ? "" : `/ ${get(client, "pinfl")}`}` : get(client, "inn")}</div>
                                                            </div>
                                                        </td>
                                                        <td className={"text-muted"}>{get(product, "name")}</td>
                                                        <td className={"text-muted"}><NumberFormat displayType={'text'}
                                                                                                   thousandSeparator={' '}
                                                                                                   value={sum}/></td>
                                                        <td className={"text-muted"}>{osn_percent}</td>
                                                        <td className={"text-muted"}>{moment(opened_at).format('DD/MM/YYYY')}</td>
                                                        <td className={"text-muted"}>{moment(closed_at).format('DD/MM/YYYY')}</td>
                                                        {!isEqual(type, "all") &&
                                                        <td className={"text-muted"}>{get(location, "code")}</td>
                                                        }
                                                        <td className={"text-muted"}>{Utils.identifyLoanStatus(get(loanCondition, "status"), get(loanCondition, "title"))}</td>
                                                        {isEqual(type, "all") &&
                                                        <td className={"text-muted"}>{get(loanCondition, "due_at")}</td>
                                                        }
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
            <BranchLoansDrawer type={type} setLoan={SetLoan} visible={visible} id={id} onClose={onClose}/>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        drawToRender: get(state, "normalize.data.branch-loans.result", []),
        isFetched: get(state, "normalize.data.branch-loans.isFetched", false),
        meta: get(state, "normalize.data.branch-loans.result._meta", []),
        entities: get(state, "normalize.entities", [])
    };
};

const mapDispatchToProps = (dispatch, props) => {
    const {t} = props;
    return {
        callRender: (params) => {
            const storeName = "branch-loans";
            const entityName = "loan";
            const scheme = {data: [Loan]};
            dispatch({
                type: ApiActions.GET_ALL.TRIGGER,
                payload: {
                    storeName,
                },
            });
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: "/monitoring/loans",
                    config: {
                        params: {
                            include: "client,product,branch,requirements.document,requirements.children,location,loanCondition",
                            ...params
                        }
                    },
                    scheme,
                    storeName,
                    entityName
                }
            });
        },
        setLoan: (id, setLoading, callRender) => {
            dispatch({
                type: actions.SET_LOAN_BY_ID.REQUEST,
                payload: {
                    id,
                    cb: {
                        success: (nData, data) => {
                            notification["success"]({
                                message: t("Успешно"),
                                description: t("Создано"),
                                placement: "topLeft",
                                duration: 3
                            });
                            if (isNil(get(data, "location"))) {
                                Alert({
                                    code: 200,
                                    message: t("Hujjatni viloyat boshqarmasiga yetkazilishini ta'minlang")
                                });
                                setLoading(false);
                                callRender({page: 1, type: "all"});
                            } else {
                                Alert({code: 200, message: `${t("Hujjat manzili")}: ${get(data, "location.code")}`})
                                setLoading(false);
                                callRender({page: 1, type: "all"});
                            }
                            setLoading(false);
                            callRender({page: 1, type: "all"});
                        },
                        fail: (e) => {
                            setLoading(false)
                            const message = get(e, "response.data.message", []);
                            notification["error"]({
                                message: t(message),
                                description: "",
                                placement: "topLeft"
                            });
                        }
                    }
                }
            });
        }
    };
};
export default withTranslation("bhm_one")(connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(BranchLoansPage)));


import React, {useEffect} from 'react';
import {get, isEmpty, isEqual, isNil} from "lodash";
import ApiActions from "../../../services/api/Actions";
import Loan from "../../../schema/Loans";
import {connect} from "react-redux";
import {withRouter, useHistory} from "react-router";
import Pagination from "../../../components/Pagination/Pagination";
import Normalizer from "../../../services/normalizr";
import NumberFormat from "react-number-format";
import moment from "moment";
import Loader from "../../../components/Loader";
import TemplateTable from "../../../components/TemplateTable";
import Toolbar from "../../../components/Toolbar";
import Utils from "../../../services/helpers/Utils";
import classNames from "classnames";
import SelectAsyncPaginate from "../../../components/SelectAsyncPagination";
import {withTranslation} from "react-i18next";
import Hat from "../../../components/Hat/Hat";

function ListPage(props) {
    const {meta, isFetched, entities, drawToRender, t} = props;
    const history = useHistory();
    const CallRender = (params) => {
        const {callRender} = props;
        callRender(params);
    }
    const pagination = (page = 1) => {
        CallRender({page})
    };
    let body = get(
        Normalizer.Denormalize(drawToRender, {data: [Loan]}, entities),
        "data",
        []
    );
    useEffect(() => {
        CallRender({page: 1})
    }, [])

    const onSearch = (search) => {
        CallRender({search})
    }
    return (
        <>
            <Hat name={t("Все кредиты")} desc={t("Список всех кредитов")}/>
            <div className={"page-content mt-2"} id={"page-content"}>
                <div className={"padding"}>
                    <div className={"d-flex flex fixed-content"}>
                        <div className={"d-flex flex"} id={"content-body"}>
                            <div className={"d-flex flex-column flex"} id={"user-list"}>
                                <Toolbar>
                                    <>
                                        <div className={"w-25"}>
                                            <SelectAsyncPaginate url="/monitoring/products"
                                                                 attrSearch="search"
                                                                 params={{
                                                                     "filter[condition]": "A"
                                                                 }}
                                                                 property={["id", "name", "id"]}
                                                                 onChange={(name, value) => CallRender({"filter[product_id]": value})}/>
                                        </div>
                                        <form className="flex">
                                            <div className="input-group"><input type="text"
                                                                                onChange={e => onSearch(get(e, "target.value"))}
                                                                                className="form-control form-control-theme search"
                                                                                placeholder={t("Search")} required/>
                                                <span
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
                                            className="scroll-y mx-0 mb-0"
                                            head={['ID', t("Client type"), t("Branch"), t('Client'), t('Product name'), t('Sum'), t("Percentage"), t('Open date'), t("Closed date")]}>
                                            {
                                                body && body.map(({
                                                                      id,
                                                                      sum,
                                                                      opened_at,
                                                                      closed_at,
                                                                      osn_percent,
                                                                      client,
                                                                      product,
                                                                      branch
                                                                  }) => {
                                                    return (
                                                        <tr
                                                            key={id}
                                                            className={classNames("v-middle cursor-pointer text-hover")}
                                                            onDoubleClick={() => {
                                                                history.push(`/credit-monitoring/my-loan/view/${id}`)
                                                            }}
                                                        >
                                                            <td className={"text-muted"}>{id}</td>
                                                            <td>
                          <span
                              className={`w-40 avatar ${Utils.identifyType(get(client, "type"), get(client, "typeof"))?.color}`}
                              data-toggle-class="loading">{Utils.identifyType(get(client, "type"), get(client, "typeof"))?.type}</span>
                                                            </td>
                                                            <td className={"text-muted"}>{`${get(branch, "code")} - ${get(branch, "name")}`}</td>
                                                            <td className={"text-hover"}>
                                                                <div className="flex"><a
                                                                    className="item-author text-color"
                                                                    data-pjax-state="">{get(client, "name")}</a>
                                                                    <div
                                                                        className="item-mail text-muted h-1x d-none d-sm-block">{isEqual(get(client, "type"), "P") || isEqual(get(client, "typeof"), 11) ? `${get(client, "inn")} ${isNil(get(client, "pinfl")) ? "" : `/ ${get(client, "pinfl")}`}` : get(client, "inn")}</div>
                                                                </div>
                                                            </td>
                                                            <td className={"text-muted"}>{get(product, "name")}</td>
                                                            <td className={"text-muted"}><NumberFormat
                                                                displayType={'text'}
                                                                thousandSeparator={' '}
                                                                value={sum}/></td>
                                                            <td className={"text-muted"}>{osn_percent}</td>
                                                            <td className={"text-muted"}>{moment(opened_at).format('DD/MM/YYYY')}</td>
                                                            <td className={"text-muted"}>{moment(closed_at).format('DD/MM/YYYY')}</td>
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
                                {isFetched && isEmpty(body) && <div className="no-result card">
                                    <div className="p-4 text-center">{t("No Results")}</div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        drawToRender: get(state, "normalize.data.monitoring-loans.result", []),
        isFetched: get(state, "normalize.data.monitoring-loans.isFetched", false),
        meta: get(state, "normalize.data.monitoring-loans.result._meta", []),
        entities: get(state, "normalize.entities", [])
    };
};

const mapDispatchToProps = (dispatch, props) => {
    const {t} = props;
    return {
        callRender: (params) => {
            const storeName = "monitoring-loans";
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
                            include: "client,product,branch",

                            status: "all",
                            type: "monitoring",  
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
)(withRouter(ListPage)));


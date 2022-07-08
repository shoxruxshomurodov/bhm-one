import React, {useEffect, useState} from 'react';
import FilterAside from "../../../../components/FilterAside";
import TemplateTable from "../../../../components/TemplateTable";
import Toolbar from "../../../../components/Toolbar";
import Pagination from "../../../../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import ApiActions from "../../../../services/api/Actions";
import RepublicScheme from "../../../../schema/Loans";
import {get, isEmpty, isEqual} from "lodash";
import Normalizer from "../../../../services/normalizr";
import Loader from "../../../../components/Loader";
import {useHistory, useParams} from "react-router-dom";
import classNames from "classnames"
import moment from "moment"
import Utils from "../../../../services/helpers/Utils";
import { withTranslation } from "react-i18next";
import DatePicker from "./component/datepicker";
import SelectAsyncPaginate from "../../../../components/SelectAsyncPagination";

function RepublicViewPage(props) {
    const {t} = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const {code} = useParams()
    const [active, setActive] = useState("")
    const [status, setStatus] = useState("all")
    const data = useSelector(state => get(state, "normalize.data.credit-monitoring-republic-branch-loans.result", []));
    const isFetchedData = useSelector(state => get(state, "normalize.data.credit-monitoring-republic-branch-loans.isFetched", true));
    const meta = useSelector(state => get(state, "normalize.data.credit-monitoring-republic-branch-loans.result._meta", []));
    const entities = useSelector(state => get(state, "normalize.entities", []));
    const republicLoans = get(Normalizer.Denormalize(data, {data: [RepublicScheme]}, entities), "data", [])
    const getAllRepublicBranches = (params = {}) => {
        const storeName = "credit-monitoring-republic-branch-loans";
        const entityName = "loan";
        const scheme = {data: [RepublicScheme]}
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
                        type: "monitoring",
                        branch_id: code,
                        include: "client,branch,receiver,branchReceiver,product,loanCondition",
                        ...params
                    }
                },
                scheme,
                storeName,
                entityName
            }
        });
    }
    const pagination = (page = 1) => {
        getAllRepublicBranches({page})
    };
    const onSearch = (search) => {
        getAllRepublicBranches({search,status})
    }
    const filterBy = (name, date) => {
        getAllRepublicBranches({[name]:date,status})
    }
    useEffect(() => {
        getAllRepublicBranches({status})
    }, []);
    return (
        <div className={"d-flex flex fixed-content mt-2"}>
            <FilterAside classname={"text-xs"} title={`${get(republicLoans,"[0].branch.code")} - ${get(republicLoans,"[0].branch.name")}`}>
                <div className="scrollable hover">
                    <div className="sidenav p-2">
                        <nav className="nav-active-text-primary" data-nav>
                            <ul className="nav">
                                <li><a href="app.user.html#all" data-pjax-state><span className="nav-text">All</span>
                                    <span
                                        className="nav-badge"><b className="badge badge-sm badge-pill gd-danger">15</b></span></a>
                                </li>
                                <li><a href="app.user.html#company" data-pjax-state><span
                                    className="nav-text">Company</span> <span
                                    className="nav-badge"><b className="badge badge-sm badge-pill gd-info">3</b></span></a>
                                </li>
                                <li><a href="app.user.html#personal" data-pjax-state><span
                                    className="nav-text">Personal</span></a></li>
                                <li><a href="app.user.html#team" data-pjax-state><span className="nav-text">Team</span></a>
                                </li>
                                <li className="nav-header hidden-folded mt-2"><span
                                    className="d-block pt-1 text-sm text-muted">Tags</span></li>
                                <li><a href="app.user.html#client" data-pjax-state><span className="mx-2"><b
                                    className="badge badge-circle sm text-primary"/> </span><span
                                    className="nav-text">Clients</span></a>
                                </li>
                                <li><a href="app.user.html#supplier" data-pjax-state><span className="mx-2"><b
                                    className="badge badge-circle sm text-info"/> </span><span
                                    className="nav-text">Suppliers</span></a>
                                </li>
                                <li><a href="app.user.html#competitor" data-pjax-state><span className="mx-2"><b
                                    className="badge badge-circle sm text-success"/> </span><span
                                    className="nav-text">Competitors</span></a>
                                </li>
                                <li><a href="app.user.html#corp" data-pjax-state><span className="mx-2"><b
                                    className="badge badge-circle sm text-warning"/> </span><span
                                    className="nav-text">Corps</span></a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </FilterAside>
            <div className={"d-flex flex"} id={"content-body"}>
                <div className={"d-flex flex-column flex"} id={"user-list"}>
                    <Toolbar classname={"mx-2"}>
                        <>
                            <div className="input-group input-daterange" style={{width:"400px"}}>
                                <div className="input-group-prepend"><span className="input-group-text">{t("From")}</span></div>
                                <DatePicker filterBy={filterBy} type="text" className="form-control" name="from_date"/>
                                <div className="input-group-prepend"><span className="input-group-text ">{t("To")}</span></div>
                                <DatePicker filterBy={filterBy} type="text" className="form-control " name="to_date" />
                            </div>
                            <select style={{width:"150px"}} onChange={e => {
                                setStatus(get(e,"target.value"))
                                getAllRepublicBranches({status:get(e,"target.value")})
                            }}
                                    className="form-control">
                                <option value={"all"}>Все</option>
                                <option value={"accepted"}>{t("Qabul qilingan")}</option>
                                <option value={"required"}>{t("Qabul qilinmagan")}</option>
                            </select>
                            <div className={"w-25"}>
                                <SelectAsyncPaginate url="/monitoring/products"
                                                     attrSearch="search"
                                                     params={{
                                                         "filter[condition]": "A"
                                                     }}
                                                     property={["id", "name", "id"]}
                                                     onChange={(name, value) => {
                                                         getAllRepublicBranches({"filter[product_id]": value,status})
                                                     }}/>
                            </div>
                            <form className="flex">
                                <div className="input-group"><input type="text"
                                                                    onChange={e => onSearch(get(e, "target.value"))}
                                                                    className="form-control form-control-theme form-control-sm search"
                                                                    placeholder={t("Search")} required/> <span
                                    className="input-group-append"><button
                                    className="btn btn-white no-border btn-sm" type="button"><span
                                    className="d-flex text-muted"><svg
                                    xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                                    className="feather feather-search"><circle cx={11} cy={11} r={8}/><line x1={21}
                                                                                                            y1={21}
                                                                                                            x2="16.65"
                                                                                                            y2="16.65"/></svg></span></button></span>
                                </div>
                            </form>
                        </>
                    </Toolbar>
                    {isFetchedData ?
                        <TemplateTable
                            head={[t("ID"), t("Full name"),t("Credit type"), t("Client type"), t("PNFL"), t("TIN"), t("Open date"), t("Received date"),t("Status")]}>
                            {republicLoans && republicLoans.map(loan => {
                                return (
                                    <tr
                                        key={get(loan, "id")}
                                        className={classNames("v-middle cursor-pointer text-hover", {
                                            active: isEqual(get(loan, "id"), active)
                                        })}
                                        onClick={() => setActive(get(loan, "id"))}
                                        onDoubleClick={() => history.push(`/credit-monitoring/my-loan/view/${get(loan, "id")}`)}
                                    >
                                        <td className={"text-muted"}>{get(loan, "id")}</td>
                                        <td className={"text-muted "}>{get(loan, "branchReceiver.NAME") ? get(loan, "branchReceiver.NAME") : t("Qabul qilinmagan")}</td>
                                        <td className={"text-muted"}>{get(loan, "product.name")}</td>
                                        <td className={"text-muted"}><span
                                            className={`w-40 avatar ${Utils.identifyType(get(loan, "client.type"), get(loan, "client.typeof")).color}`}
                                            data-toggle-class="loading">{Utils.identifyType(get(loan, "client.type"), get(loan, "client.typeof")).type}</span></td>
                                        <td className={"text-muted"}>{get(loan, "client.pinfl")}</td>
                                        <td className={"text-muted"}>{get(loan, "client.inn")}</td>
                                        <td className={"text-muted"}>{moment(get(loan, "created_at")).format("DD-MM-YYYY")}</td>
                                        <td className={"text-muted"}>{moment(get(loan, "received_at")).format("DD-MM-YYYY")}</td>
                                        <td className={"text-muted"}>{Utils.identifyLoanStatus(get(loan, "loanCondition.status"),get(loan, "loanCondition.title"))}</td>
                                    </tr>
                                )
                            })}
                        </TemplateTable>
                        :
                        <Loader/>
                    }
                    {!isEmpty(republicLoans) && isFetchedData && <div className={"px-3 py-3 mt-auto"}>
                        <Pagination meta={meta} onChange={pagination}/>
                    </div>}
                    {isEmpty(republicLoans) && isFetchedData && <div className="no-result card mx-3 mt-5">
                        <div className="p-4 text-center">{t("No Results")}</div>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default withTranslation("bhm_one")(RepublicViewPage);

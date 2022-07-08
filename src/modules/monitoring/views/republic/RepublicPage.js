import React, {useEffect, useState} from 'react';
import FilterAside from "../../../../components/FilterAside";
import TemplateTable from "../../../../components/TemplateTable";
import Toolbar from "../../../../components/Toolbar";
import Pagination from "../../../../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import ApiActions from "../../../../services/api/Actions";
import RepublicScheme from "../../../../schema/Loans";
import {get, isEmpty, isEqual, isNil} from "lodash";
import Normalizer from "../../../../services/normalizr";
import Loader from "../../../../components/Loader";
import {useHistory} from "react-router-dom";
import classNames from "classnames";
import moment from "moment";
import {withTranslation} from "react-i18next";
import DatePicker from "./component/datepicker";
import RegionScheme from "../../../../schema/Regions";

function RepublicPage(props) {
    const {t} = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const [active, setActive] = useState("");
    const [fromTo,setFromTo] = useState("")
    const data = useSelector(state => get(state, "normalize.data.credit-monitoring-republic-loans.result", []));
    let regions = useSelector(state => get(state, "normalize.data.regions.result", []));
    const isFetchedData = useSelector(state => get(state, "normalize.data.credit-monitoring-republic-loans.isFetched", true));
    const meta = useSelector(state => get(state, "normalize.data.credit-monitoring-republic-loans.result._meta", []));
    const entities = useSelector(state => get(state, "normalize.entities", []));
    const republicLoans = get(Normalizer.Denormalize(data, {data: [RepublicScheme]}, entities), "data", [])
    regions = get(Normalizer.Denormalize(regions, {data: [RegionScheme]}, entities), "data", [])
    const getAllRepublicBranches = (params = {}) => {
        const storeName = "credit-monitoring-republic-loans";
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
                url: "/monitoring/branches",
                config: {
                    params: {
                        include: "region,totalLoansCount,acceptedLoansCount,requiredLoansCount,requestSearchBranch",
                        "filter[region_id]": 3,
                        ...params
                    }
                },
                scheme,
                storeName,
                entityName
            }
        });
    }
    const getAllRegions = () => {
        const storeName = "regions";
        const entityName = "region";
        const scheme = {data:[RegionScheme]}
        dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                storeName,
            },
        });
        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: "/monitoring/regions",
                config: {
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
        getAllRepublicBranches({search})
    }
    const filterBy = (name, date) => {
         setFromTo((state)=> ({...state,[name]: date}));
         getAllRepublicBranches({...fromTo,[name]: date})
    }
    useEffect(() => {
        getAllRepublicBranches({});
        getAllRegions();
    }, [])
    return (
        <div className={"d-flex flex fixed-content mt-2"}>
            <FilterAside title={t("Review")}>
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
            <div className={"d-flex flex mt-3"} id={"content-body"}>
                <div className={"d-flex flex-column flex"} id={"user-list"}>
                    <Toolbar classname={"mx-2"}>
                        <>
                            <div className="input-group input-daterange" style={{width: "400px"}}>
                                <div className="input-group-prepend"><span
                                    className="input-group-text">{t("From")}</span></div>
                                <DatePicker type="text" filterBy={filterBy} className="form-control " name="from_date"/>
                                <div className="input-group-prepend"><span
                                    className="input-group-text ">{t("To")}</span></div>
                                <DatePicker type="text" filterBy={filterBy} className="form-control " name="to_date" />
                            </div>
                            <select style={{width: "200px"}}
                                    onChange={e => getAllRepublicBranches({"filter[region_id]": get(e, "target.value")})}
                                    className="form-control">
                                {regions && regions.map(region => {
                                   return <option value={get(region,"code")}>{get(region,"name")}</option>
                                })}
                            </select>
                            <form className="flex">
                                <div className="input-group"><input type="text"
                                                                    onChange={e => onSearch(get(e, "target.value"))}
                                                                    className="form-control form-control-theme form-control-sm search"
                                                                    placeholder="Search" required/> <span
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
                            head={["ID", t("Region"), t("Branch code"), t("Branch name"), t("Received"), t("Not Received"), t("Total"), t("From"),t("To")]}>
                            {republicLoans && republicLoans.map(loan => {
                                return (
                                    <tr
                                        key={get(loan, "id")}
                                        className={classNames("v-middle cursor-pointer text-hover", {
                                            active: isEqual(get(loan, "id"), active)
                                        })}
                                        onClick={() => setActive(get(loan, "id"))}
                                        onDoubleClick={() => history.push(`/credit-monitoring/branches/republic/view/${get(loan, "id")}`)}
                                    >
                                        <td className={"text-muted"}>{get(loan, "id")}</td>
                                        <td className={"text-muted "}>{get(loan, "region.name")}</td>
                                        <td className={"text-muted "}>{get(loan, "code")}</td>
                                        <td className={"text-muted"}>{get(loan, "name")}</td>
                                        <td className={"text-muted"}>{get(loan, "acceptedLoansCount")}</td>
                                        <td className={"text-muted"}>{get(loan, "requiredLoansCount")}</td>
                                        <td className={"text-muted"}>{get(loan, "totalLoansCount")}</td>
                                        <td className={"text-muted"}>{moment(get(loan, "requestSearchBranch.from_date")).format("DD-MM-YYYY")}</td>
                                        <td className={"text-muted"}>{moment(get(loan, "requestSearchBranch.to_date")).format("DD-MM-YYYY")}</td>
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

export default withTranslation("bhm_one")(RepublicPage);

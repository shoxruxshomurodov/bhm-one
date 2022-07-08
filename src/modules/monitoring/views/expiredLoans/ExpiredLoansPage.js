import React, {useEffect, useState} from "react";
import FilterAside from "../../../../components/FilterAside";
import Toolbar from "../../../../components/Toolbar";
import Pagination from "../../../../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import ApiActions from "../../../../services/api/Actions";
import {get, isEmpty, isEqual} from "lodash";
import Normalizer from "../../../../services/normalizr";
import Loader from "../../../../components/Loader";
import {useHistory} from "react-router-dom";
import {withTranslation} from "react-i18next";
import LoanScheme from "../../../../schema/Loans";
import SelectAsyncPaginate from "../../../../components/SelectAsyncPagination";
import DatePicker from "../republic/component/datepicker";
import RegionScheme from "../../../../schema/Regions";
import {RiFileExcel2Line} from "react-icons/ri";
import ApiService from "../../services/ApiService";
import {notification} from "antd";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

// Import React Table HOC Fixed columns
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

function ExpiredLoansPage(props) {
    const {t} = props;
    const dispatch = useDispatch();
    const [type, setType] = useState("all");
    const [region, setRegion] = useState("");
    const [product, setProduct] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const [active, setActive] = useState("");
    const [fromTo, setFromTo] = useState("");
    const user = useSelector((state) => get(state, "auth.user", {}));
    let regions = useSelector((state) =>
        get(state, "normalize.data.regions.result", [])
    );
    let data = useSelector((state) =>
        get(state, "normalize.data.expired-loans-list.result", [])
    );
    const isFetchedData = useSelector((state) =>
        get(state, "normalize.data.expired-loans-list.isFetched", true)
    );
    const meta = useSelector((state) =>
        get(state, "normalize.data.expired-loans-list.result._meta", [])
    );
    const entities = useSelector((state) => get(state, "normalize.entities", []));
    data = get(
        Normalizer.Denormalize(data, {data: [LoanScheme]}, entities),
        "data",
        []
    );
    regions = get(
        Normalizer.Denormalize(regions, {data: [RegionScheme]}, entities),
        "data",
        []
    );
    console.log(regions, "regions");
    const getAllData = (params = {}) => {
        const storeName = "expired-loans-list";
        const entityName = "loan";
        const scheme = {data: [LoanScheme]};
        dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                storeName,
            },
        });
        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: "/monitoring/expires",
                config: {
                    params: {
                        include: "region",
                        ...params,
                    },
                },
                scheme,
                storeName,
                entityName,
            },
        });
    };
    const pagination = (page = 1) => {
        getAllData({page, type});
    };
    const onSearch = (event) => {
        if (
            isEqual(get(event, "key"), "Enter") ||
            isEqual(get(event, "keyCode"), 13)
        ) {
            getAllData({search: get(event, "target.value"), type});
        }
    };
    const getAllRegions = () => {
        const storeName = "regions";
        const entityName = "region";
        const scheme = {data: [RegionScheme]};
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
                config: {},
                scheme,
                storeName,
                entityName,
            },
        });
    };
    useEffect(() => {
        getAllData({type});
        if (isEqual(get(user, "employee.FILIAL"), "09006")) {
            getAllRegions();
        }
    }, []);

    const exportExcel = () => {
        setIsLoading(true);
        ApiService.excelExport({
            type,
            region_id: region,
            "filter[product_id]": product,
            only_problem: true,
            ...fromTo,
        })
            .then((res) => {
                setIsLoading(false);
                notification["success"]({
                    message: t("Успешно"),
                    description: t("Загружено"),
                    placement: "topRight",
                });
                window.location.assign(get(res, "data.src"));
            })
            .catch((e) => {
                setIsLoading(false);
                const message = get(e, "response.data.message", []);
                notification["error"]({
                    message: t(message),
                    description: "",
                    placement: "topLeft",
                });
            });
    };
    const filterBy = (name, date) => {
        setFromTo((state) => ({[name]: date, ...state}));
        getAllData({...fromTo, [name]: date, type});
    };
    return (
        <div className={"d-flex flex fixed-content mt-2 problem-filter-aside"}>
            <FilterAside title={t("Expired Loans")} classname="header">
                <div className="hover">
                    <div className="sidenav p-2">
                        <nav className="nav-active-text-primary">
                            <ul className="nav">
                                <li
                                    className={isEqual(type, "day_91_180") && "active"}
                                    onClick={() => {
                                        setType("day_91_180");
                                        getAllData({page: 1, type: "day_91_180"});
                                    }}
                                >
                                    <a>
                                        <span className="nav-text">91-180 кунгача</span>{" "}
                                        <span className="nav-badge">
                      <b className="badge badge-sm badge-pill bg-red-light">
                        {get(meta, "counts.day_91_180")}
                      </b>
                    </span>
                                    </a>
                                </li>
                                <li
                                    className={isEqual(type, "day_181_360") && "active"}
                                    onClick={() => {
                                        setType("day_181_360");
                                        getAllData({page: 1, type: "day_181_360"});
                                    }}
                                >
                                    <a>
                                        <span className="nav-text">181-360 кунгача</span>{" "}
                                        <span className="nav-badge">
                      <b className="badge badge-sm badge-pill bg-red">
                        {get(meta, "counts.day_181_360")}
                      </b>
                    </span>
                                    </a>
                                </li>
                                <li
                                    className={isEqual(type, "day_361_more") && "active"}
                                    onClick={() => {
                                        setType("day_361_more");
                                        getAllData({page: 1, type: "day_361_more"});
                                    }}
                                >
                                    <a>
                                        <span className="nav-text">360 кундан ортик</span>{" "}
                                        <span className="nav-badge">
                      <b className="badge badge-sm badge-pill bg-red-dark">
                        {get(meta, "counts.day_361_more")}
                      </b>
                    </span>
                                    </a>
                                </li>

                                <li className="nav-header hidden-folded mt-2">
                  <span className="d-block pt-1 text-sm text-muted">
                    {t("Filter")}
                  </span>
                                </li>
                                {isEqual(get(user, "employee.FILIAL"), "09006") && (
                                    <li className={"mt-2"}>
                                        <a>
                                            <select
                                                onChange={(e) => {
                                                    setRegion(get(e, "target.value"));
                                                    getAllData({
                                                        region_id: get(e, "target.value"),
                                                        type,
                                                    });
                                                }}
                                                className="form-control mr-0"
                                            >
                                                <option value={"all"}>{t("Все регионы")}</option>
                                                {regions &&
                                                regions.map((region) => {
                                                    return (
                                                        <option value={get(region, "code")}>
                                                            {get(region, "name")}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </a>
                                    </li>
                                )}
                                <li className={"mt-2 w-100"}>
                                    <a>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">{t("Open")}</span>
                                        </div>
                                        <DatePicker
                                            filterBy={filterBy}
                                            type="text"
                                            name="from_date"
                                        />
                                    </a>
                                </li>
                                <li className={"mt-2"}>
                                    <a>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text ">{t("Close")}</span>
                                        </div>
                                        <DatePicker
                                            filterBy={filterBy}
                                            type="text"
                                            name="to_date"
                                        />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </FilterAside>
            <div
                className={"d-flex flex"}
                style={{width: "calc(100% - 240px)"}}
                id={"content-body"}
            >
                <div className={"d-flex flex-column flex w-100"} id={"user-list"}>
                    <Toolbar classname={"mx-2 mb-2"}>
                        <>
                            <div className="flex">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        onKeyPress={(e) => onSearch(e)}
                                        className="form-control form-control-theme form-control-sm search"
                                        placeholder="Search"
                                        required
                                    />{" "}
                                    <span className="input-group-append">
                    <button
                        className="btn btn-white no-border btn-sm"
                        type="button"
                    >
                      <span className="d-flex text-muted">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-search"
                        >
                          <circle cx={11} cy={11} r={8}/>
                          <line x1={21} y1={21} x2="16.65" y2="16.65"/>
                        </svg>
                      </span>
                    </button>
                    <button
                        className="btn btn-white no-border btn-sm ml-2"
                        type="button"
                        disabled={isLoading}
                        onClick={exportExcel}
                    >
                      <span className="d-flex text-muted">
                        <RiFileExcel2Line/>
                      </span>
                    </button>
                  </span>
                                </div>
                            </div>
                        </>
                    </Toolbar>
                    {isFetchedData && !isLoading ? (
                        <div className={"scroll-y mx-3 problem-table"}>
                            {!isEmpty(data) && (
                                <ReactTableFixedColumns
                                    data={data}
                                    getTrProps={(state, rowInfo, column, instance) => {
                                        return {
                                            onClick: () => {
                                                setActive(get(rowInfo, "original.id"));
                                            },
                                            onDoubleClick: (e, t) => {
                                                history.push(
                                                    `/credit-monitoring/expired-loan/view/${get(
                                                        rowInfo,
                                                        "original.id"
                                                    )}`
                                                );
                                            },
                                            style: {
                                                cursor: "pointer",
                                            },
                                            className: isEqual(
                                                get(rowInfo, "original.id"),
                                                active
                                            )
                                                ? "active text-hover"
                                                : "text-hover",
                                        };
                                    }}
                                    showPagination={false}
                                    minRows={0}
                                    columns={[
                                        {
                                            fixed: "left",
                                            columns: [
                                                {
                                                    Header: t("LOAN_ID"),
                                                    accessor: "id",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("MAX_DAYS"),
                                                    accessor: "max_days",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("PROS_DAYS_COUNT"),
                                                    accessor: "pros_days_count",
                                                    width: 130,
                                                },
                                                {
                                                    Header: t("DEBIT_DAYS_COUNT"),
                                                    accessor: "debit_days_count",
                                                    width: 130,
                                                },
                                            ],
                                        },
                                        {
                                            columns: [
                                                {
                                                    Header: t("REGION"),
                                                    accessor: "region.name",
                                                    width: 300,
                                                },
                                                {
                                                    Header: t("FILIAL_CODE"),
                                                    accessor: "filial_code",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("CLIENT_CODE"),
                                                    accessor: "client_code",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("CLIENT_NAME"),
                                                    accessor: "client_name",
                                                    width: 300,
                                                },
                                                {
                                                    Header: t("INN"),
                                                    accessor: "inn",
                                                    width: 200,
                                                },
                                                {
                                                    Header: t("LOAN_DEBIT_DAY"),
                                                    accessor: "debit_days_count",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("OVERALL_DEPT_AMOUNT"),
                                                    accessor: "overall_dept_amount",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("CLASS_QUALITY"),
                                                    accessor: "class_quality",
                                                    width: 200,
                                                },
                                                {
                                                    Header: t("OPEN_DATE"),
                                                    accessor: "open_date",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("CLOSE_DATE"),
                                                    accessor: "close_date",
                                                    width: 100,
                                                },
                                            ],
                                        },
                                    ]}
                                />
                            )}
                        </div>
                    ) : (
                        <Loader/>
                    )}
                    {!isEmpty(data) && isFetchedData && (
                        <div className={"px-3 py-3 mt-auto"}>
                            <Pagination meta={meta} onChange={pagination}/>
                        </div>
                    )}
                    {isEmpty(data) && isFetchedData && (
                        <div className="no-result card mx-3 mt-5">
                            <div className="p-4 text-center">{t("No Results")}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default withTranslation("bhm_one")(ExpiredLoansPage);

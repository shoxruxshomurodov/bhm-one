import React, {useEffect, useState} from "react";
import FilterAside from "../../../../components/FilterAside";
import Toolbar from "../../../../components/Toolbar";
import Pagination from "../../../../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import ApiActions from "../../../../services/api/Actions";
import {get, isEmpty, isEqual, isNil} from "lodash";
import Normalizer from "../../../../services/normalizr";
import Loader from "../../../../components/Loader";
import LoaderMessage from "../../../../components/Loader/LoaderMessage";
import {useHistory} from "react-router-dom";
import {withTranslation} from "react-i18next";
import LoanScheme from "../../../../schema/Loans";
import RegionScheme from "../../../../schema/Regions";
import StagesScheme from "../../../../schema/Stages";
import {RiFileExcel2Line} from "react-icons/ri";
import ApiService from "../../services/ApiService";
import {notification} from "antd";
import Utils from "../../../../services/helpers/Utils";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

// Import React Table HOC Fixed columns
import withFixedColumns from "react-table-hoc-fixed-columns";
import "react-table-hoc-fixed-columns/lib/styles.css";

const ReactTableFixedColumns = withFixedColumns(ReactTable);

function CreditMonitoringControlsLoansPage(props) {
    const {t} = props;
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("new");
    const [region, setRegion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const [active, setActive] = useState("");
    const user = useSelector((state) => get(state, "auth.user", {}));
    let regions = useSelector((state) =>
        get(state, "normalize.data.regions.result", [])
    );
    let stages = useSelector((state) =>
        get(state, "normalize.data.stages-list.result", [])
    );
    const isFetchedStages = useSelector((state) =>
        get(state, "normalize.data.stages-list.isFetched", true)
    );
    let data = useSelector((state) =>
        get(state, "normalize.data.control-loans-list.result", [])
    );
    const isFetchedData = useSelector((state) =>
        get(state, "normalize.data.control-loans-list.isFetched", true)
    );
    const meta = useSelector((state) =>
        get(state, "normalize.data.control-loans-list.result._meta", [])
    );
    const entities = useSelector((state) => get(state, "normalize.entities", []));
    stages = get(
        Normalizer.Denormalize(stages, {data: [StagesScheme]}, entities),
        "data",
        []
    );
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
    const [stage, setStage] = useState('');
    const getAllStages = (params = {}) => {
        const storeName = "stages-list";
        const entityName = "stage";
        const scheme = {data: [StagesScheme]};
        dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                storeName,
            },
        });
        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: "/monitoring/stages",
                config: {
                    params: {
                        include: "counts,checkpointsCount",
                        "filter[type]": 1,
                        ...params,
                    },
                },
                scheme,
                storeName,
                entityName,
            },
        });
    };
    const getAllData = (params = {}) => {
        const storeName = "control-loans-list";
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
                url: "/monitoring/checkpoint",
                config: {
                    params: {
                        include:
                            "loan.client,loan.product,loan.location,branch,condition,loanDetail.importData,loanDetail.region,stage",
                        "filter[type]": 2,
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
        getAllData({page, "filter[stage_id]": get(stage, "id"), status});
    };
    const onSearch = (event) => {
        if (
            isEqual(get(event, "key"), "Enter") ||
            isEqual(get(event, "keyCode"), 13)
        ) {
            getAllData({
                search: get(event, "target.value"),
                "filter[stage_id]": get(stage, "id"),
                status,
            });
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
        getAllStages();
        getAllData({status});
        if (isEqual(get(user, "employee.FILIAL"), "09006")) {
            getAllRegions();
        }
    }, []);
    // const exportExcel = () => {
    //     setIsLoading(true);
    //     ApiService.excelExport({
    //         'filter[stage_id]': stage,
    //         status,
    //         region_id: region,
    //     })
    //         .then(res => {
    //             setIsLoading(false);
    //             notification["success"]({
    //                 message: t("Успешно"),
    //                 description: t("Загружено"),
    //                 placement: "topRight",
    //             });
    //             window.location.assign(get(res, "data.src"));
    //         })
    //         .catch(e => {
    //             setIsLoading(false);
    //             const message = get(e, "response.data.message", []);
    //             notification["error"]({
    //                 message: t(message),
    //                 description: "",
    //                 placement: "topLeft"
    //             });
    //         })
    // }
    const exportExcel = () => {
        setIsLoading(true);
        ApiService.excelExportControlLoans({
            region_id: region,
            stage_id: get(stage, 'id'),
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
    return (
        <div className={"d-flex flex fixed-content mt-2 problem-filter-aside"}>
            <FilterAside title={t("Controls Loans")} classname="header">
                <div className="hover">
                    <div className="sidenav p-2">
                        <nav className="nav-active-text-primary">
                            {isFetchedStages && isFetchedData ? (
                                <ul className="nav">
                                    {!isEmpty(stages) && (
                                        <li className="nav-header hidden-folded mt-2">
                      <span className="d-block pt-1 text-sm text-muted">
                        {t("Stages")}
                      </span>
                                        </li>
                                    )}
                                    {stages &&
                                        stages.map((staged) => {
                                            return (
                                                <li
                                                    className={
                                                        isEqual(get(stage, "id"), get(staged, "id")) &&
                                                        "active"
                                                    }
                                                    onClick={() => {
                                                        setStage(staged);
                                                        getAllData({
                                                            page: 1,
                                                            "filter[stage_id]": get(staged, "id"),
                                                            status,
                                                        });
                                                    }}
                                                >
                                                    <a>
                            <span className="nav-text">
                              {get(staged, "title")}
                            </span>
                                                        <span className="nav-badge">
                              <b
                                  className={`badge badge-sm badge-pill ${Utils.findStatus(
                                      status
                                  )}`}
                              >
                                {get(staged, "checkpointsCount")}
                              </b>
                            </span>
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    {isEqual(get(user, "employee.FILIAL"), "09006") && (
                                        <li className={"mt-2"}>
                                            <a>
                                                {" "}
                                                <select
                                                    onChange={(e) => {
                                                        setRegion(get(e, "target.value"));
                                                        getAllData({
                                                            region_id: get(e, "target.value"),
                                                            "filter[stage_id]": get(stage, "id"),
                                                            status,
                                                        });
                                                    }}
                                                    className="form-control mr-0 "
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
                                </ul>
                            ) : (
                                <LoaderMessage/>
                            )}
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
                            <nav className="nav-active-text-primary">
                                <ul className="nav">
                                    <li
                                        className={isEqual(status, "new") && "active"}
                                        onClick={() => {
                                            setStatus("new");
                                            if (isNil(stage)) {
                                                getAllData({page: 1, status: "new"});
                                                getAllStages({status: "new"});
                                            } else {
                                                getAllData({
                                                    page: 1,
                                                    status: "new",
                                                    "filter[stage_id]": get(stage, "id"),
                                                });
                                                getAllStages({status: "new"});
                                            }
                                        }}
                                    >
                                        <a>
                                            <span className="nav-text">{t("New")}</span>
                                            <span className="nav-badge">
                        <b className="badge badge-sm badge-pill gd-warning">
                          {get(stage, "counts.new")}
                        </b>
                      </span>
                                        </a>
                                    </li>
                                    <li
                                        className={isEqual(status, "completed") && "active"}
                                        onClick={() => {
                                            setStatus("completed");
                                            if (isNil(stage)) {
                                                getAllData({page: 1, status: "completed"});
                                                getAllStages({status: "completed"});
                                            } else {
                                                getAllStages({status: "completed"});
                                                getAllData({
                                                    page: 1,
                                                    status: "completed",
                                                    "filter[stage_id]": get(stage, "id"),
                                                });
                                            }
                                        }}
                                    >
                                        <a>
                                            <span className="nav-text">{t("Completed")}</span>
                                            <span className="nav-badge">
                        <b className="badge badge-sm badge-pill gd-info">
                          {get(stage, "counts.completed")}
                        </b>
                      </span>
                                        </a>
                                    </li>
                                    <li
                                        className={isEqual(status, "refused") && "active"}
                                        onClick={() => {
                                            setStatus("refused");
                                            if (isNil(stage)) {
                                                getAllStages({status: "refused"});
                                                getAllData({page: 1, status: "refused"});
                                            } else {
                                                getAllStages({status: "refused"});
                                                getAllData({
                                                    page: 1,
                                                    status: "refused",
                                                    "filter[stage_id]": get(stage, "id"),
                                                });
                                            }
                                        }}
                                    >
                                        <a>
                                            <span className="nav-text">{t("Refused")}</span>
                                            <span className="nav-badge">
                        <b className="badge badge-sm badge-pill gd-danger">
                          {get(stage, "counts.refused")}
                        </b>
                      </span>
                                        </a>
                                    </li>
                                    <li
                                        className={isEqual(status, "confirmed") && "active"}
                                        onClick={() => {
                                            setStatus("confirmed");
                                            if (isNil(stage)) {
                                                getAllStages({status: "confirmed"});
                                                getAllData({page: 1, status: "confirmed"});
                                            } else {
                                                getAllStages({status: "confirmed"});
                                                getAllData({
                                                    page: 1,
                                                    status: "confirmed",
                                                    "filter[stage_id]": get(stage, "id"),
                                                });
                                            }
                                        }}
                                    >
                                        <a>
                                            <span className="nav-text">{t("Confirmed")}</span>
                                            <span className="nav-badge">
                        <b className="badge badge-sm badge-pill gd-success">
                          {get(stage, "counts.confirmed")}
                        </b>
                      </span>
                                        </a>
                                    </li>
                                    <li
                                        className={isEqual(status, "expired") && "active"}
                                        onClick={() => {
                                            setStatus("expired");
                                            if (isNil(stage)) {
                                                getAllStages({status: "expired"});
                                                getAllData({page: 1, status: "expired"});
                                            } else {
                                                getAllStages({status: "expired"});
                                                getAllData({
                                                    page: 1,
                                                    status: "expired",
                                                    "filter[stage_id]": get(stage, "id"),
                                                });
                                            }
                                        }}
                                    >
                                        <a>
                                            <span className="nav-text">{t("Expired")}</span>
                                            <span className="nav-badge">
                        <b className="badge badge-sm badge-pill gd-danger">
                          {get(stage, "counts.expired")}
                        </b>
                      </span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                            <div className="flex">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        onKeyPress={(e) => onSearch(e)}
                                        onChange={(e) => setSearch(get(e, "target.value"))}
                                        className="form-control form-control-theme form-control-sm search"
                                        placeholder="Search"
                                        required
                                    />{" "}
                                    <span className="input-group-append">
                    <button
                        onClick={() =>
                            getAllData({
                                search,
                                status,
                                "filter[stage_id]": get(stage, "id"),
                            })
                        }
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
                  </span>
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
                                                setActive(
                                                    get(rowInfo, "original.loanDetail.importData.LOAN_ID")
                                                );
                                            },
                                            onDoubleClick: (e, t) => {
                                                history.push(
                                                    `/credit-monitoring/expired-loan/view/${get(
                                                        rowInfo,
                                                        "original.loanDetail.importData.LOAN_ID"
                                                    )}`
                                                );
                                            },
                                            style: {
                                                cursor: "pointer",
                                            },
                                            className: isEqual(
                                                get(rowInfo, "original.loanDetail.importData.LOAN_ID"),
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
                                                    accessor: "loanDetail.importData.LOAN_ID",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("MAX_DAYS"),
                                                    accessor: "loanDetail.max_days",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("STATUS"),
                                                    accessor: "condition.title",
                                                    Cell: (cell) => {
                                                        return (
                                                            <>
                                                                {Utils.identifyLoanStatus(
                                                                    get(cell, "original.condition.status"),
                                                                    get(cell, "original.condition.title")
                                                                )}
                                                            </>
                                                        );
                                                    },
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("STAGE"),
                                                    accessor: "stage.title",
                                                    width: 200,
                                                },
                                            ],
                                        },
                                        {
                                            columns: [
                                                {
                                                    Header: t("REGION"),
                                                    accessor: "loanDetail.region.name",
                                                    width: 300,
                                                },
                                                {
                                                    Header: t("FILIAL_CODE"),
                                                    accessor: "loanDetail.importData.FILIAL_CODE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("CLIENT_CODE"),
                                                    accessor: "loanDetail.importData.CLIENT_CODE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("CLIENT_NAME"),
                                                    accessor: "loanDetail.importData.CLIENT_NAME",
                                                    width: 300,
                                                },
                                                {
                                                    Header: t("INN"),
                                                    accessor: "loanDetail.importData.INN",
                                                    width: 200,
                                                },
                                                {
                                                    Header: t("TYPE_1_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_1_ACC_CODE",
                                                    width: 200,
                                                },
                                                {
                                                    Header: t("CURRENCY"),
                                                    accessor: "loanDetail.importData.CURRENCY",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("OPEN_DATE"),
                                                    accessor: "loanDetail.importData.OPEN_DATE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("CLOSE_DATE"),
                                                    accessor: "loanDetail.importData.CLOSE_DATE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("OSN_PERCENT"),
                                                    accessor: "loanDetail.importData.OSN_PERCENT",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("DLO_PERCENT"),
                                                    accessor: "loanDetail.importData.DLO_PERCENT",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("LAW_PERCENT"),
                                                    accessor: "loanDetail.importData.LAW_PERCENT",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("LNG_PERCENT"),
                                                    accessor: "loanDetail.importData.LNG_PERCENT",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("CMP_PERCENT"),
                                                    accessor: "loanDetail.importData.CMP_PERCENT",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("SPS_PERCENT"),
                                                    accessor: "loanDetail.importData.SPS_PERCENT",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_1_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_1_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_4_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_4_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_5_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_5_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_8_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_8_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("LOAN_DEBIT_DAY"),
                                                    accessor: "loanDetail.importData.LOAN_DEBIT_DAY",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("OVERALL_DEPT_AMOUNT"),
                                                    accessor: "loanDetail.importData.OVERALL_DEPT_AMOUNT",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("CLASS_QUALITY"),
                                                    accessor: "loanDetail.importData.CLASS_QUALITY",
                                                    width: 200,
                                                },
                                                {
                                                    Header: t("TYPE_6_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_6_ACC_CODE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_6_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_6_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_3_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_3_ACC_CODE",
                                                    width: 200,
                                                },
                                                {
                                                    Header: t("TYPE_3_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_3_BALANCE",
                                                    width: 200,
                                                },
                                                {
                                                    Header: t("TYPE_6_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_6_ACC_CODE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_7_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_7_ACC_CODE",
                                                    width: 200,
                                                },
                                                {
                                                    Header: t("TYPE_7_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_7_BALANCE",
                                                    width: 200,
                                                },
                                                {
                                                    Header: t("TYPE_82_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_82_ACC_CODE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_82_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_82_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_46_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_46_ACC_CODE",
                                                    width: 200,
                                                },
                                                {
                                                    Header: t("TYPE_46_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_46_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_118_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_118_ACC_CODE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_118_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_118_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_22_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_22_ACC_CODE",
                                                    width: 200,
                                                },
                                                {
                                                    Header: t("TYPE_22_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_22_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_79_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_79_ACC_CODE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_79_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_79_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_11_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_11_ACC_CODE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_11_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_11_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_13_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_13_ACC_CODE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_13_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_13_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_55_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_55_ACC_CODE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_55_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_55_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_57_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_57_ACC_CODE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_57_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_57_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_6_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_6_ACC_CODE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_62_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_62_ACC_CODE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_62_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_62_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_67_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_67_ACC_CODE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_67_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_67_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_74_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_74_ACC_CODE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_74_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_74_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_34_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_34_ACC_CODE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_34_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_34_BALANCE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_69_ACC_CODE"),
                                                    accessor: "loanDetail.importData.TYPE_69_ACC_CODE",
                                                    width: 100,
                                                },
                                                {
                                                    Header: t("TYPE_69_BALANCE"),
                                                    accessor: "loanDetail.importData.TYPE_69_BALANCE",
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

export default withTranslation("bhm_one")(CreditMonitoringControlsLoansPage);

import React, {useEffect, useState} from "react";
import LoansScheme from "../../../../schema/Loans";
import ApiActions from "../../../../services/api/Actions";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {get, isEmpty, isNil} from "lodash";
import Normalizer from "../../../../services/normalizr";
import Loader from "../../../../components/Loader";
import {Button, Drawer} from "antd";
import NumberFormat from "react-number-format";
import {LinkOutlined} from "@ant-design/icons";
import FlipClock from "x-react-flipclock";
import moment from "moment";
import StartCheckpoint from "./StartCheckpoint";
import RefuseCheckpoint from "./RefuseCheckpoint";
import {notification, Alert, Row, Col} from "antd";
import Utils from "../../../../services/helpers/Utils";
import {withTranslation} from "react-i18next";
import {PDFViewer} from "react-view-pdf";
import classnames from "classnames";
import MonitoringProcessContainer from "./MonitoringProcessContainer";
import {useHistory} from "react-router-dom";
import WithUser from "../../../../services/auth/rbac/WithUser";
import config from "../../../../config";
function LoanView(props) {
    const {t} = props;
    const {id} = useParams();
    const history = useHistory();
    const [startCheckpoint, setStartCheckpoint] = useState(false);
    const [refuseCheckpoint, setRefuseCheckpoint] = useState(false);
    const [isCreditTypesOpen, setCreditTypesOpen] = useState(false);
    const [checkpoint, setCheckpoint] = useState(null);
    const [isFetched, setIsFetched] = useState(false);
    const [showFile, setShowFile] = useState();
    const [file, setFile] = useState(null);
    const entities = useSelector((state) => get(state, "normalize.entities", {}));
    const user = useSelector(state => get(state, "auth.user", {}));
    let data = useSelector((state) =>
        get(state, "normalize.data.monitoring-loan.result", {})
    );
    let isFetchedData = useSelector((state) =>
        get(state, "normalize.data.monitoring-loan.isFetched", false)
    );
    data = Normalizer.Denormalize(data, LoansScheme, entities);
    const dispatch = useDispatch();
    const getOneLoan = () => {
        const storeName = "monitoring-loan";
        const entityName = "loan";
        const scheme = {LoansScheme};
        dispatch({
            type: ApiActions.GET_ONE.TRIGGER,
            payload: {
                storeName,
            },
        });
        dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `monitoring/loans/${id}`,
                config: {
                    params: {
                        include:
                            "client,branch,product,product.initialRequirements.document,product.secondaryRequirements.document,product.secondaryRequirements.children.document,location,continuousCheckpoint.condition,purposiveCheckpoint.condition,continuousCheckpoint.canComplete,purposiveCheckpoint.canComplete,purposiveCheckpoint.canConfirm,continuousCheckpoint.canConfirm,purposiveCheckpoint.logs.logBy,purposiveCheckpoint.file.src,continuousCheckpoint.file.src,branchReceiver,purposiveCheckpoint.isFinished,continuousCheckpoint.isFinished,activeRequest",
                    },
                },
                scheme,
                storeName,
                entityName,
            },
        });
    };
    const start = (file, comment) => {
        const formData = new FormData();
        if (file) {
            formData.append(`files`, file);
            formData.append(`comment`, comment);
        }
        setIsFetched(true);
        const url = `/monitoring/checkpoints/${get(checkpoint, "id")}/complete`;
        const storeName = "checkpoint-start";
        const entityName = "loan";
        const scheme = LoansScheme;
        dispatch({
            type: ApiActions.OPERATION_ADD.REQUEST,
            payload: {
                attributes: formData,
                url,
                formMethods: () => {
                },
                scheme,
                storeName,
                entityName,
                cb: {
                    success: (nData, data) => {
                        notification["success"]({
                            message: t("Успешно"),
                            description: t("Создано"),
                            placement: "topRight",
                        });
                        setIsFetched(false);
                        setStartCheckpoint(false);
                        getOneLoan();
                    },
                    fail: (e) => {
                        notification["error"]({
                            message: t(get(e, "response.data[0].message")),
                            description: t("Ошибка"),
                            placement: "topRight",
                        });
                        setIsFetched(false);
                    },
                },
            },
        });
    };
    const confirm = (checkpoint_id) => {
        setIsFetched(true);
        const url = `/monitoring/checkpoints/${checkpoint_id}/confirm`;
        const storeName = "checkpoint-confirm";
        const entityName = "loan";
        const scheme = LoansScheme;
        dispatch({
            type: ApiActions.OPERATION_UPDATE.REQUEST,
            payload: {
                url,
                formMethods: {setIsFetched},
                scheme,
                storeName,
                entityName,
                cb: {
                    success: () => {
                        notification["success"]({
                            message: t("Успешно"),
                            description: t("Одобрено"),
                            placement: "topRight",
                        });
                        setIsFetched(false);
                        getOneLoan();
                    },
                    fail: (e) => {
                        notification["error"]({
                            message: t(get(e, "response.data[0].message")),
                            description: t("Ошибка"),
                            placement: "topRight",
                        });
                        setIsFetched(false);
                    },
                },
            },
        });
    };
    const refuse = (comment) => {
        setIsFetched(true);
        const url = `/monitoring/checkpoints/${get(checkpoint, "id")}/refuse`;
        const storeName = "checkpoint-refuse";
        const entityName = "loan";
        const scheme = LoansScheme;
        dispatch({
            type: ApiActions.OPERATION_UPDATE.REQUEST,
            payload: {
                attributes: {reason: comment},
                url,
                formMethods: {setIsFetched},
                scheme,
                storeName,
                entityName,
                cb: {
                    success: () => {
                        notification["success"]({
                            message: t("Успешно"),
                            description: t("Отклонено"),
                            placement: "topRight",
                        });
                        setIsFetched(false);
                        setRefuseCheckpoint(false);
                        getOneLoan();
                    },
                    fail: (e) => {
                        notification["error"]({
                            message: t(get(e, "response.data[0].message")),
                            description: t("Ошибка"),
                            placement: "topRight",
                        });
                        setIsFetched(false);
                    },
                },
            },
        });
    };
    useEffect(() => {
        getOneLoan();
    }, []);
    if (!isFetchedData) {
        return <Loader/>;
    }
    if (isFetched) {
        return <Loader/>;
    }
    return (
        <>
            <div className="d-flex flex" id="content-body">
                <div className="d-flex flex-column flex">
                    <div className="p-3">
                        <div className="toolbar">
                            <button
                                onClick={() => window.history.back()}
                                className="btn btn-sm btn-white"
                            >
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
                                    className="feather feather-arrow-left"
                                >
                                    <line x1={19} y1={12} x2={5} y2={12}/>
                                    <polyline points="12 19 5 12 12 5"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="scroll-y mx-3 card">
                        <Row className="p-4 d-sm-flex no-shrink b-b">
                            <Col span={16} className={"d-flex"}>
                                <div
                                    className={"avatar w-96 gd-success"}
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        fontSize: "30px",
                                    }}
                                >
                                    {get(data, "client.type")}
                                </div>
                                <div className="px-sm-4 my-3 my-sm-0 flex">
                                    <h2 className="text-md">
                                        {get(data, "id")} - {get(data, "client.name")}
                                    </h2>
                                    <b className="d-block">{get(data, "product.name")}</b>
                                    <div className="my-3">
                                        <a data-pjax-state>
                                            <strong>{t("Сумма")}</strong>{" "}
                                            <span className="text-muted">
                      <NumberFormat
                          displayType={"text"}
                          thousandSeparator={" "}
                          value={get(data, "sum")}
                      />{" "}
                                                {t("сўм")}
                    </span>
                                        </a>
                                        <a className="mx-2" data-pjax-state>
                                            <strong>{t("Фоиз")}</strong>{" "}
                                            <span className="text-muted">
                      {get(data, "osn_percent")} %
                    </span>{" "}
                                        </a>
                                        <a data-pjax-state>
                                            <strong>{t("Даври")}</strong>
                                            <span className="text-muted">
                      {" "}
                                                {get(data, "opened_at")} / {get(data, "closed_at")}
                    </span>
                                        </a>
                                    </div>
                                    <div>
                                        <strong>{t("Filial")}</strong> :{" "}
                                        <span className={"text-muted"}>
                    {get(data, "branch.code")} - {get(data, "branch.name")}
                  </span>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className={"text-right"}>
                                    <div className="d-block text-md">
                                        <strong>{t("Hujjat manzili")}</strong> :{" "}
                                        <span className={"text-muted"}>
                    {get(data, "location.code")
                        ? get(data, "location.code")
                        : t("Не принял")}
                  </span>
                                    </div>
                                    <div className="d-block">
                                        <strong>{t("Hujjat qabul qilgan hodim")}</strong> :{" "}
                                        <span className={"text-muted"}>
                    {get(data, "branchReceiver.fullName")
                        ? get(data, "branchReceiver.fullName")
                        : t("Не принял")}
                  </span>
                                    </div>
                                    <div className="d-block">
                                        <strong>{t("Hujjat qabul qilingan sana")}</strong> :{" "}
                                        <span className={"text-muted"}>
                    {get(data, "branch_received_at")
                        ? moment
                            .unix(get(data, "branch_received_at"))
                            .format("DD-MM-YYYY")
                        : t("Не принял")}
                  </span>
                                    </div>
                                </div>
                                <WithUser>
                                    {({userCan}) => {
                                        if (userCan(config.ROLES.MONITORING_FILIAL) && isNil(get(data, "activeRequest"))) {
                                        return (
                                            <>
                                                <br/>
                                                <Alert
                                                    message={t("Success Tips")}
                                                    description={
                                                        <div className={"d-flex justify-content-between"}>
                                                            <span>{t("Shartnoma shartlarini o'zgartirish processlari")}</span>
                                                            <Button
                                                                size="default"
                                                                type="info"
                                                                onClick={() => {
                                                                    setCreditTypesOpen(true);
                                                                }}
                                                            >
                                                                {t("Taklif")}
                                                            </Button>
                                                        </div>
                                                    }
                                                    type={"info"}
                                                    showIcon
                                                />
                                            </>
                                        )
                                        }
                                    }
                                    }
                                </WithUser>
                            </Col>
                        </Row>
                        {!isNil(get(data, "activeRequest")) &&
                        <Alert
                            message={t("У вас есть активный запрос")}
                            description={
                                <>
                                    {`Состояние : ${get(data, "activeRequest.state.title")}`}
                                    {
                                        <Button
                                            size="default"
                                            icon={<LinkOutlined/>}
                                            onClick={() => {
                                                history.push(`/monitoring/my-task/view/${get(data, "activeRequest.last_task_id")}`)
                                            }}
                                            type="info"
                                            style={{
                                                height: "40px",
                                                right: "15px",
                                                position: "absolute",
                                                top: "20px"
                                            }}
                                            className={"text-right"}
                                        >
                                            {t("Смотреть активный запрос")}
                                        </Button>
                                    }
                                </>
                            }
                            showIcon
                        />
                        }
                        <div className="row no-gutters">
                            <div
                                className={`col-md-${
                                    !(
                                        get(data, "continuousCheckpoint.isFinished") &&
                                        get(data, "purposiveCheckpoint.isFinished")
                                    )
                                        ? "8"
                                        : "12"
                                } b-r`}
                            >
                                <div className="p-4">
                                    <div className="b-b">
                                        <div className="nav-active-border b-primary bottom">
                                            <ul className="nav" id="myTab" role="tablist">
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link active"
                                                        id="home-tab"
                                                        data-toggle="tab"
                                                        href="#home3"
                                                        role="tab"
                                                        aria-controls="home"
                                                        aria-selected="true"
                                                    >
                                                        {t("Hujjatlar")}
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link"
                                                        id="profile-tab"
                                                        data-toggle="tab"
                                                        href="#profile3"
                                                        role="tab"
                                                        aria-controls="profile"
                                                        aria-selected="false"
                                                    >
                                                        {t("Maqsadli")}
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a
                                                        className="nav-link"
                                                        id="contact-tab"
                                                        data-toggle="tab"
                                                        href="#contact3"
                                                        role="tab"
                                                        aria-controls="contact"
                                                        aria-selected="false"
                                                    >
                                                        {t("Davomiy")}
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="tab-content p-3">
                                        <div
                                            className="tab-pane fade active show"
                                            id="home3"
                                            role="tabpanel"
                                            aria-labelledby="home-tab"
                                        >
                                            <div className="row">
                                                <div className={"col-md-6"}>
                                                    <div
                                                        className={
                                                            "d-flex justify-content-between align-items-center"
                                                        }
                                                    >
                                                        <h6>
                                                            {t("Дастлабки талаб қилинадиган хужжатлар")}
                                                        </h6>
                                                    </div>
                                                    <div
                                                        className={classnames(
                                                            "list list-row my-2 scroll-y r",
                                                            {
                                                                "bg-dark": !isEmpty(
                                                                    get(data, "product.initialRequirements")
                                                                ),
                                                            }
                                                        )}
                                                    >
                                                        {!isEmpty(
                                                            get(data, "product.initialRequirements")
                                                        ) ? (
                                                            get(data, "product.initialRequirements")?.map(
                                                                (initialReq) => {
                                                                    return (
                                                                        <div className="list-item" data-id={16}>
                                                                            <div>
                                                                                <label
                                                                                    className="ui-check m-0 ui-check-rounded ui-check-md">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        checked={true}
                                                                                        name="id"
                                                                                        defaultValue={16}
                                                                                    />{" "}
                                                                                    <i/>
                                                                                </label>
                                                                            </div>
                                                                            <div className="flex">
                                                                                <a
                                                                                    className="item-title text-color h-1x"
                                                                                    data-pjax-state
                                                                                >
                                                                                    {get(initialReq, "document.title")}
                                                                                </a>{" "}
                                                                                {get(initialReq, "children") &&
                                                                                get(initialReq, "children")?.map(
                                                                                    (child) => {
                                                                                        return (
                                                                                            <div
                                                                                                className="item-except text-muted text-sm h-1x">
                                                                                                {get(child, "document.title")}
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                )}{" "}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            )
                                                        ) : (
                                                            <div className="alert alert-info" role="alert">
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
                                                                    className="feather feather-info"
                                                                >
                                                                    <circle cx={12} cy={12} r={10}/>
                                                                    <line x1={12} y1={16} x2={12} y2={12}/>
                                                                    <line x1={12} y1={8} x2={12} y2={8}/>
                                                                </svg>
                                                                <span className="mx-2">
                                  {t("Ma'lumot mavjud emas")}
                                </span>
                                                            </div>
                                                        )}{" "}
                                                    </div>
                                                </div>
                                                <div className={"col-md-6"}>
                                                    <div
                                                        className={
                                                            "d-flex justify-content-between align-items-center"
                                                        }
                                                    >
                                                        <h6>{t("Кредит чиқариш учун зарур хужжатлар")}</h6>
                                                    </div>
                                                    <div
                                                        className={classnames(
                                                            "list list-row my-2 scroll-y r",
                                                            {
                                                                "bg-dark": !isEmpty(
                                                                    get(data, "product.secondaryRequirements")
                                                                ),
                                                            }
                                                        )}
                                                    >
                                                        {" "}
                                                        {!isEmpty(
                                                            get(data, "product.secondaryRequirements")
                                                        ) ? (
                                                            get(data, "product.secondaryRequirements")?.map(
                                                                (secondaryReq) => {
                                                                    return (
                                                                        <div className="list-item" data-id={16}>
                                                                            <div>
                                                                                <label
                                                                                    className="ui-check m-0 ui-check-rounded ui-check-md">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        checked={true}
                                                                                        name="id"
                                                                                        defaultValue={16}
                                                                                    />{" "}
                                                                                    <i/>
                                                                                </label>
                                                                            </div>
                                                                            <div className="flex">
                                                                                <a
                                                                                    className="item-title text-color h-1x"
                                                                                    data-pjax-state
                                                                                >
                                                                                    {get(secondaryReq, "document.title")}
                                                                                </a>{" "}
                                                                                {get(secondaryReq, "children") &&
                                                                                get(secondaryReq, "children")?.map(
                                                                                    (child) => {
                                                                                        return (
                                                                                            <div
                                                                                                className="item-except text-muted text-sm h-1x">
                                                                                                {get(child, "document.title")}
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                )}{" "}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            )
                                                        ) : (
                                                            <div className="alert alert-info" role="alert">
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
                                                                    className="feather feather-info"
                                                                >
                                                                    <circle cx={12} cy={12} r={10}/>
                                                                    <line x1={12} y1={16} x2={12} y2={12}/>
                                                                    <line x1={12} y1={8} x2={12} y2={8}/>
                                                                </svg>
                                                                <span className="mx-2">
                                  {t("Ma'lumot mavjud emas")}
                                </span>
                                                            </div>
                                                        )}{" "}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="profile3"
                                            role="tabpanel"
                                            aria-labelledby="profile-tab"
                                        >
                                            <div className="timeline">
                                                {!isEmpty(get(data, "purposiveCheckpoint.logs")) ? (
                                                    get(data, "purposiveCheckpoint.logs")?.map(
                                                        (checkpoint) => {
                                                            return (
                                                                <div
                                                                    onClick={() => {
                                                                        if (!isNil(get(checkpoint, "file"))) {
                                                                            setShowFile(true);
                                                                            setFile(checkpoint);
                                                                        }
                                                                    }}
                                                                    className="tl-item cursor-pointer text-hover"
                                                                >
                                                                    <div className="tl-dot">
                                                                        <a
                                                                            style={{fontSize: "8px"}}
                                                                            className="tl-author"
                                                                        >
                                                                            {Utils.findLoanStatus(
                                                                                get(checkpoint, "new_status")
                                                                            )}
                                                                        </a>
                                                                    </div>
                                                                    <div className="tl-content">
                                                                        <div
                                                                            className={"d-flex align-items-center"}
                                                                        >
                                                                            {get(checkpoint, "logBy.NAME")}{" "}
                                                                            {!isNil(get(checkpoint, "file")) && (
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
                                                                                    className="feather feather-file-plus mx-2"
                                                                                >
                                                                                    <path
                                                                                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                                                                    <polyline points="14 2 14 8 20 8"/>
                                                                                    <line
                                                                                        x1={12}
                                                                                        y1={18}
                                                                                        x2={12}
                                                                                        y2={12}
                                                                                    />
                                                                                    <line
                                                                                        x1={9}
                                                                                        y1={15}
                                                                                        x2={15}
                                                                                        y2={15}
                                                                                    />
                                                                                </svg>
                                                                            )}
                                                                        </div>
                                                                        <div className="text-muted ">
                                                                            {get(checkpoint, "comment")}
                                                                        </div>
                                                                        <div className="text-muted">
                                                                            {moment
                                                                                .unix(get(checkpoint, "log_at"))
                                                                                .format("DD-MM-YYYY HH:mm:ss")}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <div className="alert alert-info" role="alert">
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
                                                            className="feather feather-info"
                                                        >
                                                            <circle cx={12} cy={12} r={10}/>
                                                            <line x1={12} y1={16} x2={12} y2={12}/>
                                                            <line x1={12} y1={8} x2={12} y2={8}/>
                                                        </svg>
                                                        <span className="mx-2">
                              {t("Ma'lumot mavjud emas")}
                            </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className="tab-pane fade"
                                            id="contact3"
                                            role="tabpanel"
                                            aria-labelledby="contact-tab"
                                        >
                                            <div
                                                className="timeline"
                                                style={{maxHeight: "1000px", overflowY: "auto"}}
                                            >
                                                {!isEmpty(
                                                    get(data, "allContinuousCheckpoints.logs")
                                                ) ? (
                                                    get(data, "allContinuousCheckpoints")?.map(
                                                        (checkpoint) => {
                                                            return (
                                                                <>
                                                                    {get(checkpoint, "logs") &&
                                                                    get(checkpoint, "logs")?.map((log) => {
                                                                        return (
                                                                            <div
                                                                                onClick={() => {
                                                                                    if (!isNil(get(log, "file"))) {
                                                                                        setShowFile(true);
                                                                                        setFile(log);
                                                                                    }
                                                                                }}
                                                                                className="tl-item cursor-pointer text-hover"
                                                                            >
                                                                                <div className="tl-dot">
                                                                                    <a
                                                                                        style={{fontSize: "8px"}}
                                                                                        className="tl-author"
                                                                                    >
                                                                                        {Utils.findLoanStatus(
                                                                                            t(get(log, "new_status"))
                                                                                        )}
                                                                                    </a>
                                                                                </div>
                                                                                <div className="tl-content">
                                                                                    <div
                                                                                        className={
                                                                                            "d-flex align-items-center"
                                                                                        }
                                                                                    >
                                                                                        {get(log, "logBy.NAME")}{" "}
                                                                                        {!isNil(get(log, "file")) && (
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
                                                                                                className="feather feather-file-plus mx-2"
                                                                                            >
                                                                                                <path
                                                                                                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                                                                                <polyline
                                                                                                    points="14 2 14 8 20 8"/>
                                                                                                <line
                                                                                                    x1={12}
                                                                                                    y1={18}
                                                                                                    x2={12}
                                                                                                    y2={12}
                                                                                                />
                                                                                                <line
                                                                                                    x1={9}
                                                                                                    y1={15}
                                                                                                    x2={15}
                                                                                                    y2={15}
                                                                                                />
                                                                                            </svg>
                                                                                        )}
                                                                                    </div>
                                                                                    <div className="text-muted ">
                                                                                        {get(log, "comment")}
                                                                                    </div>
                                                                                    <div className="text-muted">
                                                                                        {moment
                                                                                            .unix(get(log, "log_at"))
                                                                                            .format("DD-MM-YYYY HH:mm:ss")}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                    <hr/>
                                                                </>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <div className="alert alert-info" role="alert">
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
                                                            className="feather feather-info"
                                                        >
                                                            <circle cx={12} cy={12} r={10}/>
                                                            <line x1={12} y1={16} x2={12} y2={12}/>
                                                            <line x1={12} y1={8} x2={12} y2={8}/>
                                                        </svg>
                                                        <span className="mx-2">
                              {t("Ma'lumot mavjud emas")}
                            </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {!(
                                get(data, "continuousCheckpoint.isFinished") &&
                                get(data, "purposiveCheckpoint.isFinished")
                            ) && (
                                <div className={"col-md-4"}>
                                    <div className={"p-4"}>
                                        <div className="list list-row">
                                            {!isNil(get(data, "purposiveCheckpoint")) &&
                                            !get(data, "purposiveCheckpoint.isFinished") && (
                                                <div className={"card p-2"}>
                                                    <div className="list-item no-border mb-4 p-0">
                                                        <div>
                                                            <a style={{fontSize: "8px"}}>
                                                                {Utils.findLoanStatus(
                                                                    get(
                                                                        data,
                                                                        "purposiveCheckpoint.condition.title"
                                                                    )
                                                                )}
                                                            </a>
                                                        </div>
                                                        <div className="flex">
                                                            <a
                                                                className="item-author text-color"
                                                                data-pjax-state
                                                            >
                                                                {t("Maqsadli nazorat punkti")}
                                                            </a>
                                                            <a
                                                                className="item-company text-muted h-1x"
                                                                data-pjax-state
                                                            >
                                                                {moment
                                                                    .unix(
                                                                        get(data, "purposiveCheckpoint.due_at")
                                                                    )
                                                                    .format("DD-MM-YYYY")}
                                                            </a>
                                                        </div>
                                                        <FlipClock
                                                            type="countdown"
                                                            units={[
                                                                {
                                                                    sep: "",
                                                                    type: "days",
                                                                    title: t("Кун"),
                                                                },
                                                                {
                                                                    sep: " ",
                                                                    type: "hours",
                                                                    title: t("Соат"),
                                                                },
                                                                {
                                                                    sep: ":",
                                                                    type: "minutes",
                                                                    title: t("Дақиқа"),
                                                                },
                                                                {
                                                                    sep: ":",
                                                                    type: "seconds",
                                                                    title: t("Сония"),
                                                                },
                                                            ]}
                                                            count_to={moment
                                                                .unix(get(data, "purposiveCheckpoint.due_at"))
                                                                .format("YYYY-MM-DD HH:mm:ss")}
                                                        />
                                                    </div>
                                                    {get(
                                                        data,
                                                        "purposiveCheckpoint.condition.comment"
                                                    ) && (
                                                        <div className={"p-4"}>
                                <span
                                    className={
                                        "d-flex align-items-center text-hover cursor-pointer"
                                    }
                                >
                                  {t("Employee")} :{" "}
                                    {get(
                                        data,
                                        "purposiveCheckpoint.condition.employee.NAME"
                                    )}
                                    {!isNil(
                                        get(data, "purposiveCheckpoint.file.src")
                                    ) && (
                                        <svg
                                            onClick={() =>
                                                window.open(
                                                    get(
                                                        data,
                                                        "purposiveCheckpoint.file.src"
                                                    ),
                                                    "_blank"
                                                )
                                            }
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={16}
                                            height={16}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-file-plus mx-2"
                                        >
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                            <polyline points="14 2 14 8 20 8"/>
                                            <line x1={12} y1={18} x2={12} y2={12}/>
                                            <line x1={9} y1={15} x2={15} y2={15}/>
                                        </svg>
                                    )}
                                </span>
                                                            <span className={"d-block"}>
                                  {t("Comment")} :{" "}
                                                                {get(
                                                                    data,
                                                                    "purposiveCheckpoint.condition.comment"
                                                                )}
                                </span>
                                                            <span>
                                  {t("Comment time")} :{" "}
                                                                {moment
                                                                    .unix(
                                                                        get(
                                                                            data,
                                                                            "purposiveCheckpoint.condition.created_at"
                                                                        )
                                                                    )
                                                                    .format("DD-MM-YYYY HH:mm:ss")}
                                </span>
                                                        </div>
                                                    )}
                                                    {get(data, "purposiveCheckpoint.canConfirm") && (
                                                        <div
                                                            className={
                                                                "d-flex justify-content-end align-items-center"
                                                            }
                                                        >
                                                            <button
                                                                onClick={() =>
                                                                    confirm(get(data, "purposiveCheckpoint.id"))
                                                                }
                                                                className={"btn btn-sm btn-primary"}
                                                            >
                                                                {t("Qabul qilish")}
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setRefuseCheckpoint(true);
                                                                    setCheckpoint(
                                                                        get(data, "purposiveCheckpoint")
                                                                    );
                                                                }}
                                                                className={"btn btn-sm btn-danger ml-2"}
                                                            >
                                                                {t("Rad qilish")}
                                                            </button>
                                                        </div>
                                                    )}
                                                    {get(data, "purposiveCheckpoint.canComplete") && (
                                                        <button
                                                            onClick={() => {
                                                                setCheckpoint(
                                                                    get(data, "purposiveCheckpoint")
                                                                );
                                                                setStartCheckpoint(true);
                                                            }}
                                                            className={
                                                                "btn w-xs ml-auto btn-sm btn-primary"
                                                            }
                                                        >
                                                            {t("Tasdiqlash")}
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                            {!isNil(get(data, "continuousCheckpoint")) &&
                                            !get(data, "continuousCheckpoint.isFinished") && (
                                                <div className={"card p-2"}>
                                                    <div className={"list-item no-border mb-4 p-0"}>
                                                        <div>
                                                            <a style={{fontSize: "8px"}}>
                                                                {Utils.findLoanStatus(
                                                                    get(
                                                                        data,
                                                                        "continuousCheckpoint.condition.title"
                                                                    )
                                                                )}
                                                            </a>
                                                        </div>
                                                        <div className="flex">
                                                            <a
                                                                className="item-author text-color"
                                                                data-pjax-state
                                                            >
                                                                {t("Davomiy nazorat punkti")}
                                                            </a>
                                                            <a
                                                                className="item-company text-muted h-1x"
                                                                data-pjax-state
                                                            >
                                                                {moment
                                                                    .unix(
                                                                        get(data, "continuousCheckpoint.due_at")
                                                                    )
                                                                    .format("DD-MM-YYYY")}
                                                            </a>
                                                        </div>
                                                        <FlipClock
                                                            type="countdown"
                                                            units={[
                                                                {
                                                                    sep: "",
                                                                    type: "days",
                                                                    title: t("Кун"),
                                                                },
                                                                {
                                                                    sep: " ",
                                                                    type: "hours",
                                                                    title: t("Соат"),
                                                                },
                                                                {
                                                                    sep: ":",
                                                                    type: "minutes",
                                                                    title: t("Дақиқа"),
                                                                },
                                                                {
                                                                    sep: ":",
                                                                    type: "seconds",
                                                                    title: t("Сония"),
                                                                },
                                                            ]}
                                                            count_to={moment
                                                                .unix(
                                                                    get(data, "continuousCheckpoint.due_at")
                                                                )
                                                                .format("YYYY-MM-DD HH:mm:ss")}
                                                        />
                                                    </div>
                                                    {get(
                                                        data,
                                                        "continuousCheckpoint.condition.comment"
                                                    ) && (
                                                        <div className={"p-4"}>
                                <span
                                    className={
                                        "d-flex align-items-center text-hover cursor-pointer"
                                    }
                                >
                                  {t("Employee")} :{" "}
                                    {get(
                                        data,
                                        "continuousCheckpoint.condition.employee.NAME"
                                    )}{" "}
                                    {!isNil(
                                        get(data, "continuousCheckpoint.file.src")
                                    ) && (
                                        <svg
                                            onClick={() =>
                                                window.open(
                                                    get(
                                                        data,
                                                        "continuousCheckpoint.file.src"
                                                    ),
                                                    "_blank"
                                                )
                                            }
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={16}
                                            height={16}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="feather feather-file-plus mx-2"
                                        >
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                            <polyline points="14 2 14 8 20 8"/>
                                            <line x1={12} y1={18} x2={12} y2={12}/>
                                            <line x1={9} y1={15} x2={15} y2={15}/>
                                        </svg>
                                    )}
                                </span>
                                                            <span className={"d-block"}>
                                  {t("Comment")} :{" "}
                                                                {get(
                                                                    data,
                                                                    "continuousCheckpoint.condition.comment"
                                                                )}
                                </span>
                                                            <span>
                                  {t("Comment time")} :{" "}
                                                                {moment
                                                                    .unix(
                                                                        get(
                                                                            data,
                                                                            "continuousCheckpoint.condition.created_at"
                                                                        )
                                                                    )
                                                                    .format("DD-MM-YYYY HH:mm:ss")}
                                </span>
                                                        </div>
                                                    )}
                                                    {get(data, "continuousCheckpoint.canComplete") && (
                                                        <button
                                                            onClick={() => {
                                                                setCheckpoint(
                                                                    get(data, "continuousCheckpoint")
                                                                );
                                                                setStartCheckpoint(true);
                                                            }}
                                                            className={
                                                                "btn w-xs ml-auto btn-sm btn-primary "
                                                            }
                                                        >
                                                            {t("Tasdiqlash")}
                                                        </button>
                                                    )}
                                                    {get(data, "continuousCheckpoint.canConfirm") && (
                                                        <div
                                                            className={
                                                                "d-flex justify-content-end align-items-center"
                                                            }
                                                        >
                                                            <button
                                                                onClick={() =>
                                                                    confirm(
                                                                        get(data, "continuousCheckpoint.id")
                                                                    )
                                                                }
                                                                className={"btn btn-sm btn-primary"}
                                                            >
                                                                {t("Qabul qilish")}
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setRefuseCheckpoint(true);
                                                                    setCheckpoint(
                                                                        get(data, "continuousCheckpoint")
                                                                    );
                                                                }}
                                                                className={"btn btn-sm btn-danger ml-2"}
                                                            >
                                                                {t("Rad qilish")}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Drawer
                width={800}
                title={t("Выберите бизнес-процесс")}
                placement="right"
                closable={true}
                onClose={() => setCreditTypesOpen(false)}
                visible={isCreditTypesOpen}
                style={{
                    marginTop: "62px",
                }}
            >
                <MonitoringProcessContainer
                    client_id={id}
                    setCreditTypesOpen={setCreditTypesOpen}
                    getOneLoan={getOneLoan}
                />
            </Drawer>
            <Drawer
                title={t("File window")}
                placement={"left"}
                closable={false}
                onClose={() => setShowFile(false)}
                visible={showFile}
                key={"left"}
                style={{zIndex: 99999}}
                width={"50%"}
            >
                <PDFViewer url={get(file, "file.src")}/>
            </Drawer>
            <StartCheckpoint
                visible={startCheckpoint}
                onClose={() => setStartCheckpoint(false)}
                start={start}
            />
            <RefuseCheckpoint
                visible={refuseCheckpoint}
                onClose={() => setRefuseCheckpoint(false)}
                refuse={refuse}
            />
        </>
    );
}

export default withTranslation("bhm_one")(LoanView);

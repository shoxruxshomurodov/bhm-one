import React, { useEffect, useState } from "react";
import LoansScheme from "../../../../../schema/Loans";
import ApiActions from "../../../../../services/api/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { get, isEmpty, isNil, last } from "lodash";
import Normalizer from "../../../../../services/normalizr";
import Loader from "../../../../../components/Loader";
import { Drawer } from "antd";
import NumberFormat from "react-number-format";
import FlipClock from "x-react-flipclock";
import moment from "moment";
import StartProblemCheckpoint from "../../../component/checkpoint/StartProblemCheckpoint";
import RefuseCheckpoint from "../../../component/checkpoint/RefuseCheckpoint";
import { notification } from "antd";
import Utils from "../../../../../services/helpers/Utils";
import { withTranslation } from "react-i18next";
import { PDFViewer } from "react-view-pdf";
import { RiAddCircleFill, RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { request } from "../../../../../services/api";
import Swal from "sweetalert2";
import AddPhoneForm from "../components/AddPhoneForm";
import EditPhoneForm from "../components/EditPhoneForm";

function LoanView(props) {
  const { t } = props;
  const { id } = useParams();
  const [startProblemCheckpoint, setStartProblemCheckpoint] = useState(false);
  const [refuseCheckpoint, setRefuseCheckpoint] = useState(false);
  const [checkpoint, setCheckpoint] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [showCorrect, setShowCorrect] = useState();
  const [bonus_day, setBonusDay] = useState();
  const [showFile, setShowFile] = useState();
  const [file, setFile] = useState(null);
  const [isOpenAddPhoneDrawer, setIsOpenAddPhoneDrawer] = useState(false);
  const [isOpenEditPhoneDrawer, setIsOpenEditPhoneDrawer] = useState(false);

  const entities = useSelector((state) => get(state, "normalize.entities", {}));
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
    const scheme = { LoansScheme };
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
              "client,client.phones, branch,product,product.initialRequirements.document,product.initialRequirements.children.document,product.secondaryRequirements.document,product.secondaryRequirements.children.document,location,problemCheckpoint.condition,problemCheckpoint.canComplete,problemCheckpoint.canConfirm,problemCheckpoint.logs.logBy,problemCheckpoint.file.src,problemCheckpoint.logs.file.src,allProblemCheckpoints.logs.logBy,allProblemCheckpoints.stage,allProblemCheckpoints.logs.file.src,problemCheckpoint.isFinished,problemCheckpoint.stage,loanDetail.importData,loanDetail.region",
          },
        },
        scheme,
        storeName,
        entityName,
      },
    });
  };

  const startProblem = (
    file,
    comment,
    agency_name,
    doc_number,
    doc_date,
    main_sum,
    penalty_sum,
    percent_sum
  ) => {
    const formData = new FormData();
    if (file) {
      formData.append(`files`, file);
      formData.append(`comment`, comment);
      formData.append(`agency_name`, agency_name);
      formData.append(`doc_number`, doc_number);
      formData.append(`doc_date`, doc_date);
      formData.append(`main_sum`, main_sum);
      formData.append(`penalty_sum`, penalty_sum);
      formData.append(`percent_sum`, percent_sum);
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
        formMethods: { setIsFetched },
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
            setStartProblemCheckpoint(false);
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
        formMethods: { setIsFetched },
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
              message: t(get(e, "response.data.message")),
              description: t("Ошибка"),
              placement: "topRight",
            });
            setIsFetched(false);
          },
        },
      },
    });
  };
  const except = (checkpoint_id) => {
    setIsFetched(true);
    const url = `/monitoring/loan-details/except/${checkpoint_id}`;
    const storeName = "checkpoint-except";
    const entityName = "loan";
    const scheme = LoansScheme;
    dispatch({
      type: ApiActions.OPERATION_UPDATE.REQUEST,
      payload: {
        url,
        formMethods: () => {},
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
              message: t(get(e, "response.data.message")),
              description: t("Ошибка"),
              placement: "topRight",
            });
            setIsFetched(false);
          },
        },
      },
    });
  };
  const correct = (checkpoint_id) => {
    if (isEmpty(bonus_day)) {
      notification["error"]({
        message: t("Пожалуйста, выберите дополнительные дни"),
        description: t("Ошибка"),
        placement: "topRight",
      });
    } else {
      setIsFetched(true);
      const url = `/monitoring/loan-details/correct/${checkpoint_id}`;
      const storeName = "checkpoint-correct";
      const entityName = "loan";
      const scheme = LoansScheme;
      dispatch({
        type: ApiActions.OPERATION_UPDATE.REQUEST,
        payload: {
          url,
          attributes: { bonus_day },
          formMethods: () => {},
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
              setShowCorrect(false);
            },
            fail: (e) => {
              notification["error"]({
                message: t(get(e, "response.data.message")),
                description: t("Ошибка"),
                placement: "topRight",
              });
              setIsFetched(false);
            },
          },
        },
      });
    }
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
        attributes: { reason: comment },
        url,
        formMethods: () => {},
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
  const lastPhone = last(get(data, "client.phones"));

  const addClientPhone = (phoneNumber) => {
    request
      .post(`monitoring/phones`, {
        client_code: get(data, "client.code"),
        number: phoneNumber,
        type: "1",
      })
      .then((res) => {
        Swal.fire({
          title: "Muvafaqqiyatli",
          icon: "success",
          confirmButtonText: "Orqaga",
        }).then((result) => {
          result.isConfirmed && window.location.reload();
        });
      })
      .catch((e) => {
        Swal.fire({
          title: e,
          icon: "warning",
        });
      });
  };

  const editPhoneNumber = (updatePhone) => {
    request
      .put(`monitoring/phones/${get(lastPhone, "id")}`, {
        number: updatePhone,
        type: "1",
      })
      .then((res) => {
        Swal.fire({
          title: "Muvafaqqiyatli",
          icon: "success",
          confirmButtonText: "Orqaga",
        }).then((result) => {
          result.isConfirmed && window.location.reload();
        });
      })
      .catch((e) => {
        Swal.fire({
          title: e,
          icon: "warning",
        });
      });
  };

  const deletePhoneNumber = () => {
    Swal.fire({
      title: "O'chirish",
      text: "Ishonchingiz komilmi?",
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: "Ha",
      cancelButtonText: "Ortga",
    }).then((result) => {
      result.dismiss && setIsOpenEditPhoneDrawer(false);
      result.isConfirmed &&
        request
          .delete(`monitoring/phones/${get(lastPhone, "id")}`, {})
          .then((res) => {
            Swal.fire({
              title: "Muvafaqqiyatli",
              icon: "success",
              confirmButtonText: "Ortga",
            }).then((result) => {
              result.isConfirmed && window.location.reload();
            });
          })
          .catch((e) => {
            Swal.fire({
              title: e,
              icon: "warning",
            });
          });
    });
  };

  useEffect(() => {
    getOneLoan();
  }, []);

  if (!isFetchedData) {
    return <Loader />;
  }
  if (isFetched) {
    return <Loader />;
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
                data-pjax-state
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
                  <line x1={19} y1={12} x2={5} y2={12} />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
            </div>
          </div>
          <div className="scroll-y mx-3 card">
            <div className="p-4 d-sm-flex no-shrink b-b">
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
              <div>
                <div className="d-block">
                  <strong>{t("Bonus")}</strong> :{" "}
                  <span className={"text-muted"}>
                    {get(data, "loanDetail.bonus_day")} {t("day")}
                  </span>
                </div>
                <div className="d-block">
                  <strong>{t("Excepted")}</strong> :{" "}
                  <span className={"text-muted"}>
                    {get(data, "loanDetail.is_exception") ? t("Yes") : t("No")}
                  </span>
                </div>
                <div className={"mt-4 d-flex justify-content-end"}>
                  {!get(data, "loanDetail.is_exception") && (
                    <button
                      onClick={() => except(get(data, "id"))}
                      className={"btn btn-sm btn-primary mr-2"}
                    >
                      {t("Except")}
                    </button>
                  )}
                  {get(data, "loanDetail.is_exception") && (
                    <button
                      onClick={() => except(get(data, "id"))}
                      className={"btn btn-sm btn-warning mr-2"}
                    >
                      {t("UnExcept")}
                    </button>
                  )}
                  <button
                    onClick={() => setShowCorrect(true)}
                    className={"btn btn-sm btn-primary"}
                  >
                    {t("Correct")}
                  </button>
                </div>
              </div>
            </div>

            <div className="row no-gutters">
              <div
                className={`col-md-${
                  !get(data, "problemCheckpoint.isFinished") ? "8" : "12"
                } b-r`}
              >
                <div className="p-4">
                  <div className="b-b">
                    <div className="nav-active-border b-primary bottom">
                      <ul className="nav" id="myTab" role="tablist">
                        {get(data, "problemCheckpoint") && (
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              id="detail-tab"
                              data-toggle="tab"
                              href="#detail"
                              role="tab"
                              aria-controls="detail"
                              aria-selected="false"
                            >
                              {t("Details")}
                            </a>
                          </li>
                        )}
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
                            {t("История")}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="tab-content p-3">
                    <div
                      className="tab-pane fade active show"
                      id="detail"
                      role="tabpanel"
                      aria-labelledby="detail-tab"
                    >
                      <div className="col-md-8">
                        <div className="card py-2 px-2">
                          <div className="row d-flex align-items-center  ">
                            <div className="col-md-5">
                              <h1 className="mt-1">{t("Phone Number")}:</h1>
                            </div>
                            <div className="col-md-5">
                              <h1 className="mt-1">
                                {get(lastPhone, "number")}
                              </h1>
                            </div>
                            <div className="col-md-2 d-flex justify-content-end">
                              {(isEmpty(get(lastPhone, "number")) && (
                                <button
                                  type="button"
                                  className="btn btn-sm btn-light"
                                  onClick={() => {
                                    setIsOpenAddPhoneDrawer(true);
                                  }}
                                >
                                  <RiAddCircleFill className="text-success" />
                                </button>
                              )) || (
                                <button
                                  type="button"
                                  className="btn btn-sm btn-light"
                                  onClick={() => {
                                    setIsOpenEditPhoneDrawer(true);
                                  }}
                                >
                                  <RiEdit2Fill className="text-success" />
                                </button>
                              )}
                              {!isEmpty(get(data, "client.phones")) && (
                                <button
                                  type="button"
                                  className="btn btn-sm btn-light ml-1"
                                  onClick={deletePhoneNumber}
                                >
                                  <RiDeleteBin2Fill className="text-success" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <ul className="nav flex-column  mode-text-dark">
                            <li className="nav-link">
                              <div>{t("Bonus day")} :</div>
                              <small>{get(data, "loanDetail.bonus_day")}</small>
                            </li>
                            <li className="nav-link">
                              <div>{t("Debit days count")} :</div>
                              <small>
                                {get(data, "loanDetail.debit_days_count")}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div> {t("Max days")} :</div>
                              <small>{get(data, "loanDetail.max_days")}</small>
                            </li>
                            <li className="nav-link">
                              <div> {t("Props day count")} :</div>
                              <small>
                                {get(data, "loanDetail.pros_days_count")}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div> {t("Loan ID")} :</div>
                              <small>
                                {get(data, "loanDetail.importData.LOAN_ID")}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("Region")} :</div>
                              <small>
                                {get(data, "loanDetail.region.name")}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div> {t("FILIAL_CODE")} :</div>
                              <small>
                                {get(data, "loanDetail.importData.FILIAL_CODE")}
                              </small>
                            </li>

                            <li className="nav-link">
                              <div>{t("CLIENT_CODE")} :</div>
                              <small>
                                {get(data, "loanDetail.importData.CLIENT_CODE")}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("CLIENT_NAME")} :</div>
                              <small>
                                {get(data, "loanDetail.importData.CLIENT_NAME")}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("INN")} :</div>
                              <small>
                                {get(data, "loanDetail.importData.INN")}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_1_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_1_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("CURRENCY")} :</div>
                              <small>
                                {get(data, "loanDetail.importData.CURRENCY")}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("OPEN_DATE")} :</div>
                              <small>
                                {get(data, "loanDetail.importData.OPEN_DATE")}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("CLOSE_DATE")} :</div>
                              <small>
                                {get(data, "loanDetail.importData.CLOSE_DATE")}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("OSN_PERCENT")} :</div>
                              <small>
                                {get(data, "loanDetail.importData.OSN_PERCENT")}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("DLO_PERCENT")} :</div>
                              <small>
                                {get(data, "loanDetail.importData.DLO_PERCENT")}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("LAW_PERCENT")} :</div>
                              <small>
                                {get(data, "loanDetail.importData.LAW_PERCENT")}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("LNG_PERCENT")} :</div>
                              <small>
                                {get(data, "loanDetail.importData.LNG_PERCENT")}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("CMP_PERCENT")} :</div>
                              <small>
                                {get(data, "loanDetail.importData.CMP_PERCENT")}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("SPS_PERCENT")} :</div>
                              <small>
                                {get(data, "loanDetail.importData.SPS_PERCENT")}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_1_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_1_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_4_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_4_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_5_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_5_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_8_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_8_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("LOAN_DEBIT_DAY")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.LOAN_DEBIT_DAY"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("OVERALL_DEPT_AMOUNT")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.OVERALL_DEPT_AMOUNT"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("CLASS_QUALITY")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.CLASS_QUALITY"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_6_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_6_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_6_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_6_BALANCE"
                                )}
                              </small>
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6 p-2">
                          <ul className="nav flex-column mode-text-dark">
                            <li className="nav-link">
                              <div>{t("TYPE_3_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_3_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_3_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_3_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_6_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_6_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_7_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_7_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_7_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_7_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_82_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_82_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_82_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_82_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_46_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_46_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_46_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_46_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_118_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_118_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_118_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_118_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_22_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_22_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_22_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_22_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_79_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_79_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_79_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_79_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_11_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_11_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_11_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_11_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_13_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_13_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_13_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_13_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_55_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_55_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_55_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_55_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_57_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_57_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_62_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_62_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_62_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_62_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_67_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_67_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_67_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_67_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_74_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_74_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_74_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_74_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_34_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_34_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_34_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_34_BALANCE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_69_ACC_CODE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_69_ACC_CODE"
                                )}
                              </small>
                            </li>
                            <li className="nav-link">
                              <div>{t("TYPE_69_BALANCE")} :</div>
                              <small>
                                {get(
                                  data,
                                  "loanDetail.importData.TYPE_69_BALANCE"
                                )}
                              </small>
                            </li>
                          </ul>
                        </div>
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
                        style={{ maxHeight: "1000px", overflowY: "auto" }}
                      >
                        {!isEmpty(
                          get(data, "allProblemCheckpoints[0].logs")
                        ) ? (
                          get(data, "allProblemCheckpoints")?.map(
                            (checkpoint) => {
                              return (
                                <>
                                  <h1>{get(checkpoint, "stage.title")}</h1>
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
                                              style={{ fontSize: "8px" }}
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
                                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                  <polyline points="14 2 14 8 20 8" />
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
                                  <hr />
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
                              <circle cx={12} cy={12} r={10} />
                              <line x1={12} y1={16} x2={12} y2={12} />
                              <line x1={12} y1={8} x2={12} y2={8} />
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
              {!isNil(get(data, "problemCheckpoint")) &&
                !get(data, "problemCheckpoint.isFinished") && (
                  <div className={"col-md-4"}>
                    <div className={"p-4"}>
                      <div className="list list-row">
                        <div className={"card p-2"}>
                          <div className={"list-item no-border mb-4 p-0"}>
                            <div>
                              <a style={{ fontSize: "8px" }}>
                                {Utils.findLoanStatus(
                                  get(data, "problemCheckpoint.condition.title")
                                )}
                              </a>
                            </div>
                            <div className="flex">
                              <a
                                className="item-author text-color"
                                data-pjax-state
                              >
                                {t(get(data, "problemCheckpoint.stage.title"))}
                              </a>
                              <a
                                className="item-company text-muted h-1x"
                                data-pjax-state
                              >
                                {moment
                                  .unix(get(data, "problemCheckpoint.due_at"))
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
                                .unix(get(data, "problemCheckpoint.due_at"))
                                .format("YYYY-MM-DD HH:mm:ss")}
                            />
                          </div>
                          {get(data, "problemCheckpoint.condition.comment") && (
                            <div className={"p-4"}>
                              <span
                                className={
                                  "d-flex align-items-center text-hover cursor-pointer"
                                }
                              >
                                {t("Employee")} :{" "}
                                {get(
                                  data,
                                  "problemCheckpoint.condition.employee.NAME"
                                )}{" "}
                                {!isNil(
                                  get(data, "problemCheckpoint.file.src")
                                ) && (
                                  <svg
                                    onClick={() =>
                                      window.open(
                                        get(data, "problemCheckpoint.file.src"),
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
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1={12} y1={18} x2={12} y2={12} />
                                    <line x1={9} y1={15} x2={15} y2={15} />
                                  </svg>
                                )}
                              </span>
                              <span className={"d-block"}>
                                {t("Agency name")} :{" "}
                                {get(data, "problemCheckpoint.agency_name")}
                              </span>
                              <span className={"d-block"}>
                                {t("Doc number")} :{" "}
                                {get(data, "problemCheckpoint.doc_number")}
                              </span>
                              <span className={"d-block"}>
                                {t("Doc date")} :{" "}
                                {get(data, "problemCheckpoint.doc_date")}
                              </span>
                              <span className={"d-block"}>
                                {t("Main sum")} :{" "}
                                <NumberFormat
                                  displayType={"text"}
                                  thousandSeparator={" "}
                                  value={get(
                                    data,
                                    "problemCheckpoint.main_sum"
                                  )}
                                />
                              </span>
                              <span className={"d-block"}>
                                {t("Penalty sum")} :{" "}
                                <NumberFormat
                                  displayType={"text"}
                                  thousandSeparator={" "}
                                  value={get(
                                    data,
                                    "problemCheckpoint.penalty_sum"
                                  )}
                                />
                              </span>
                              <span className={"d-block"}>
                                {t("Percent Sum")} :
                                <NumberFormat
                                  displayType={"text"}
                                  thousandSeparator={" "}
                                  value={get(
                                    data,
                                    "problemCheckpoint.percent_sum"
                                  )}
                                />
                              </span>
                              <b className={"d-block"}>
                                {t("Total Sum")} :
                                <NumberFormat
                                  displayType={"text"}
                                  thousandSeparator={" "}
                                  value={get(
                                    data,
                                    "problemCheckpoint.total_sum"
                                  )}
                                />
                              </b>
                              <span className={"d-block"}>
                                {t("Comment")} :{" "}
                                {get(
                                  data,
                                  "problemCheckpoint.condition.comment"
                                )}
                              </span>
                              <span>
                                {t("Comment time")} :{" "}
                                {moment
                                  .unix(
                                    get(
                                      data,
                                      "problemCheckpoint.condition.created_at"
                                    )
                                  )
                                  .format("DD-MM-YYYY HH:mm:ss")}
                              </span>
                            </div>
                          )}
                          {get(data, "problemCheckpoint.canComplete") && (
                            <button
                              onClick={() => {
                                setCheckpoint(get(data, "problemCheckpoint"));
                                setStartProblemCheckpoint(true);
                              }}
                              className={"btn w-xs ml-auto btn-sm btn-primary "}
                            >
                              {t("Tasdiqlash")}
                            </button>
                          )}
                          {get(data, "problemCheckpoint.canConfirm") && (
                            <div
                              className={
                                "d-flex justify-content-end align-items-center"
                              }
                            >
                              <button
                                onClick={() =>
                                  confirm(get(data, "problemCheckpoint.id"))
                                }
                                className={"btn btn-sm btn-primary"}
                              >
                                {t("Qabul qilish")}
                              </button>
                              <button
                                onClick={() => {
                                  setRefuseCheckpoint(true);
                                  setCheckpoint(get(data, "problemCheckpoint"));
                                }}
                                className={"btn btn-sm btn-danger ml-2"}
                              >
                                {t("Rad qilish")}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      <Drawer
        title={t("Correct window")}
        placement={"right"}
        closable={false}
        onClose={() => setShowCorrect(false)}
        visible={showCorrect}
        key={"right"}
        style={{ zIndex: 99999 }}
        width={"15%"}
      >
        <select
          style={{ width: "100%" }}
          onChange={(e) => setBonusDay(get(e, "target.value"))}
          className="form-control"
        >
          <option value={""}>{t("выбрать дополнительные дни")}</option>
          <option value={"30"}>{t("1 oy")}</option>
          <option value={"90"}>{t("3 oy")}</option>
          <option value={"180"}>{t("6 oy")}</option>
        </select>
        <div className={"mt-2"}>
          <button
            onClick={() => correct(get(data, "id"))}
            className={"btn btn-sm btn-primary mr-2"}
          >
            {t("submit")}
          </button>
          <button
            onClick={() => setShowCorrect(false)}
            className={"btn btn-sm btn-white"}
          >
            {t("close")}
          </button>
        </div>
      </Drawer>
      <Drawer
        title={t("File window")}
        placement={"left"}
        closable={false}
        onClose={() => setShowFile(false)}
        visible={showFile}
        key={"left"}
        style={{ zIndex: 99999 }}
        width={"50%"}
      >
        <PDFViewer
          height={"100%"}
          style={{ minHeight: "100%" }}
          url={get(file, "file.src")}
        />
      </Drawer>
      <Drawer
        title={t("Add Phone Number")}
        closable={false}
        placement="right"
        onClose={() => {
          setIsOpenAddPhoneDrawer(false);
        }}
        visible={isOpenAddPhoneDrawer}
        style={{ zIndex: 99999 }}
        width={"15%"}
      >
        <>
          <AddPhoneForm addPhoneNumber={addClientPhone} />
        </>
      </Drawer>
      <Drawer
        title={t("Edit Phone Number")}
        closable={false}
        placement="right"
        onClose={() => {
          setIsOpenEditPhoneDrawer(false);
        }}
        visible={isOpenEditPhoneDrawer}
        style={{ zIndex: 99999 }}
        width={"15%"}
      >
        <EditPhoneForm editPhoneNumber={editPhoneNumber} />
      </Drawer>
      <StartProblemCheckpoint
        visible={startProblemCheckpoint}
        onClose={() => setStartProblemCheckpoint(false)}
        start={startProblem}
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

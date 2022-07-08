import React, {useEffect, useState} from 'react';
import EmployeeScheme from "../../../../../schema/Employee";
import ApiActions from "../../../../../services/api/Actions";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {get, isEmpty, isNil} from "lodash";
import Normalizer from "../../../../../services/normalizr";
import Loader from "../../../../../components/Loader";
import NumberFormat from "react-number-format";
import moment from "moment";
import {withTranslation} from "react-i18next";

function EmployeeView(props) {
    const {t} = props;
    const {emp_id} = useParams();
    const entities = useSelector(state => get(state, 'normalize.entities', {}));
    let data = useSelector(state => get(state, 'normalize.data.monitoring-employee.result', {}));
    let isFetched = useSelector(state => get(state, 'normalize.data.monitoring-employee.isFetched', false));
    data = Normalizer.Denormalize(data, EmployeeScheme, entities);
    const dispatch = useDispatch();
    const getOneData = () => {
        const storeName = 'monitoring-employee';
        const entityName = 'employee';
        const scheme = {EmployeeScheme};
        dispatch({
            type: ApiActions.GET_ONE.TRIGGER,
            payload: {
                storeName,
            },
        });
        dispatch({
            type: ApiActions.GET_ONE.REQUEST,
            payload: {
                url: `monitoring/employees/${emp_id}`,
                config: {
                    params: {
                        include: "branch,reports"
                    }
                },
                scheme,
                storeName,
                entityName,
            },
        });
    }
    useEffect(() => {
        getOneData();
    }, [])
    if (!isFetched) {
        return <Loader/>
    }
    return (
        <>
            <div className="d-flex flex" id="content-body">
                <div className="d-flex flex-column flex">
                    <div className="p-3">
                        <div className="toolbar">
                            <button onClick={() => window.history.back()}
                                    className="btn btn-sm btn-white" data-pjax-state>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"
                                     fill="none"
                                     stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                                     className="feather feather-arrow-left">
                                    <line x1={19} y1={12} x2={5} y2={12}/>
                                    <polyline points="12 19 5 12 12 5"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="scroll-y mx-3 card">
                        <div className="p-4 d-sm-flex no-shrink b-b">
                            <div className={"avatar gd-info"} style={{
                                width: "80px",
                                height: "80px",
                                fontSize: "25px"
                            }}>{get(data, "LAST_NAME")?.charAt(0)}.{get(data, "FIRST_NAME")?.charAt(0)}.{get(data, "MIDDLE_NAME")?.charAt(0)}</div>
                            <div className="px-sm-4 my-3 my-sm-0 flex"><h2
                                className="text-md">{`${get(data, "EMP_ID")} - ${get(data, "fullName")}`}</h2>
                                <p className="d-block">{get(data, "sectionPostName")?.toUpperCase()}</p>
                                <p className="text-muted">{get(data, "branch.code")} - {get(data, "branch.name")}</p>
                            </div>
                        </div>
                        <div className="row no-gutters">
                            <div className={`col-md-12 b-r`}>
                                <div className="p-4">
                                    <div className="b-b">
                                        <div className="nav-active-border b-primary bottom">
                                            <ul className="nav" id="myTab" role="tablist">
                                                <li className="nav-item"><a className="nav-link active" id="home-tab"
                                                                            data-toggle="tab" href="#home3" role="tab"
                                                                            aria-controls="home"
                                                                            aria-selected="true">{t("Ma'lumotlar")}</a>
                                                </li>
                                                <li className="nav-item"><a className="nav-link" id="profile-tab"
                                                                            data-toggle="tab" href="#profile3"
                                                                            role="tab" aria-controls="profile"
                                                                            aria-selected="false">{t("Report")}</a>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div className="tab-content p-3">
                                        <div className="tab-pane fade active show" id="home3" role="tabpanel"
                                             aria-labelledby="home-tab">
                                            <div className="row">
                                                <div className="col-md-6 p-2">
                                                    <ul className="nav flex-column  mode-text-dark">
                                                        <li className="nav-link">
                                                            <div>{t("Пол")} :</div>
                                                            <small>{get(data, 'GENDER')}</small>
                                                        </li>
                                                        <li className="nav-link">
                                                            <div> {t("Дата начала")} :</div>
                                                            <small> {get(data, 'DATE_BEGIN')}</small>
                                                        </li>
                                                        <li className="nav-link">
                                                            <div> {t("Дата рождения")} :</div>
                                                            <small>{get(data, 'BIRTH_DATE')}</small>
                                                        </li>
                                                        <li className="nav-link">
                                                            <div> {t("Паспорт Серии")} :</div>
                                                            <small>{get(data, 'PASSPORT_SERIA')}</small>
                                                        </li>
                                                        <li className="nav-link">
                                                            <div> {t("Номер паспорта")} :</div>
                                                            <small>{get(data, 'PASSPORT_NUMBER')}</small>
                                                        </li>
                                                        <li className="nav-link">
                                                            <div>{t("Работа с телефоном")} :</div>
                                                            <small>{get(data, 'PHONE_WORK')}</small>
                                                        </li>
                                                        <li className="nav-link">
                                                            <div> {t("ИНПС")} :</div>
                                                            <small>{get(data, 'INPS')}</small>
                                                        </li>
                                                        <li className="nav-link">
                                                            <div>{t("INN")} :</div>
                                                            <small>{get(data, 'INN')}</small>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-6 p-2">
                                                    <ul className="nav flex-column mode-text-dark">
                                                        <li className="nav-link">
                                                            <div> {t("Состояние")} :</div>
                                                            <small>{get(data, 'CONDITION')}</small>
                                                        </li>
                                                        <li className="nav-link">
                                                            <div> {t("Ставка")} :</div>
                                                            <small>{get(data, 'STAVKA')}</small>
                                                        </li>
                                                        <li className="nav-link">
                                                            <div> {t("Название отдела")} :</div>
                                                            <small>{get(data, 'sectionDepName')}</small>
                                                        </li>
                                                        <li className="nav-link">
                                                            <div> {t("Должность")} :</div>
                                                            <small>{get(data, 'sectionPostName')}</small>
                                                        </li>
                                                        <li className="nav-link">
                                                            <div> {t("Банк")} :</div>
                                                            <small>{get(data, 'FILIAL')}</small>
                                                        </li>
                                                        <li className="nav-link">
                                                            <div> {t("Идентификатор сотрудника в iABS")} :</div>
                                                            <small>{get(data, 'USER_ID')}</small>
                                                        </li>
                                                        <li className="nav-link">
                                                            <div>{t("Номер таблицы")} :</div>
                                                            <small>{get(data, 'EMP_ID')}</small>
                                                        </li>
                                                        <li className="nav-link">
                                                            <div>{t("Идентификатор сотрудника в СБ")} :</div>
                                                            <small>{get(data, 'TAB_NUM')}</small>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="profile3" role="tabpanel"
                                             aria-labelledby="profile-tab">
                                            <div className="timeline">
                                                {!isEmpty(get(data, "purposiveCheckpoint.logs")) ? get(data, "purposiveCheckpoint.logs")?.map(checkpoint => {
                                                        return (
                                                            <div className="tl-item cursor-pointer text-hover">
                                                                <div className="tl-dot"><a style={{fontSize: "8px"}}
                                                                                           className="tl-author">
                                                                    {/*{Utils.findLoanStatus(get(checkpoint, "new_status"))}*/}
                                                                </a>
                                                                </div>
                                                                <div className="tl-content">
                                                                    <div
                                                                        className={"d-flex align-items-center"}>{get(checkpoint, "logBy.NAME")} {!isNil(get(checkpoint, "file")) &&
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         width={16} height={16} viewBox="0 0 24 24"
                                                                         fill="none" stroke="currentColor"
                                                                         strokeWidth={2} strokeLinecap="round"
                                                                         strokeLinejoin="round"
                                                                         className="feather feather-file-plus mx-2">
                                                                        <path
                                                                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                                                        <polyline points="14 2 14 8 20 8"/>
                                                                        <line x1={12} y1={18} x2={12} y2={12}/>
                                                                        <line x1={9} y1={15} x2={15} y2={15}/>
                                                                    </svg>}</div>
                                                                    <div
                                                                        className="text-muted ">{get(checkpoint, "comment")}
                                                                    </div>
                                                                    <div
                                                                        className="text-muted">{moment.unix(get(checkpoint, "log_at")).format("DD-MM-YYYY HH:mm:ss")}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }) :
                                                    <div className="alert alert-info" role="alert">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={16}
                                                             height={16} viewBox="0 0 24 24" fill="none"
                                                             stroke="currentColor" strokeWidth={2}
                                                             strokeLinecap="round" strokeLinejoin="round"
                                                             className="feather feather-info">
                                                            <circle cx={12} cy={12} r={10}/>
                                                            <line x1={12} y1={16} x2={12} y2={12}/>
                                                            <line x1={12} y1={8} x2={12} y2={8}/>
                                                        </svg>
                                                        <span className="mx-2">{t("Ma'lumot mavjud emas")}</span>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation("bhm_one")(EmployeeView);

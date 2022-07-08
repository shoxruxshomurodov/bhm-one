import React, {useState} from 'react';
import {Formik} from "formik";
import {withTranslation} from "react-i18next"
import {Link} from "react-router-dom";
import {get, isEqual, isEmpty} from "lodash";
import InputMask from "react-input-mask";
import EmployeeScheme from "../../../../../schema/Employees";
import ApiActions from "../../../../../services/api/Actions";
import {useDispatch} from "react-redux"
import {notification} from "antd";
import Loader from "../../../../../components/Loader";
import * as Yup from "yup";
import classNames from "classnames";
import TemplateTable from "../../../../../components/TemplateTable";
function EmployeeCreatePage(props) {
    const {t} = props;
    const [type, setType] = useState("1");
    const [responseData, setResponseData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const employeeScheme = Yup.object().shape({
        // type: Yup.string().required("Type ni  tanlang"),
        tab_number: isEqual(type, "1") && Yup.number().required("tab number ni kiriting"),
        document: isEqual(type, "2") && Yup.string().required("passport ni kiriting"),
        pinpp: isEqual(type, "2") && Yup.string().required("pinfl ni kiriting"),
        dep_name: isEqual(get(responseData, "type"), "2") && Yup.string().required("dep name ni kiriting"),
        post_name: isEqual(get(responseData, "type"), "2") && Yup.string().required("post name ni kiriting"),
    });
    const dispatch = useDispatch()
    const getEmployee = (params) => {
        setIsLoading(true)
        const storeName = "credit-monitoring-employee";
        const entityName = "employee";
        const scheme = {data: [EmployeeScheme]};
        dispatch({
            type: ApiActions.GET_ALL.TRIGGER,
            payload: {
                storeName,
            },
        });
        dispatch({
            type: ApiActions.GET_ALL.REQUEST,
            payload: {
                url: "/bonus/bonus-employee/info",
                config: {
                    params: {
                        ...params,
                    },
                },
                scheme,
                storeName,
                entityName,
                cb: {
                    success: (data) => {
                        setResponseData(data)
                        setIsLoading(false)
                        notification["success"]({
                            message: "Mahsus hodim yaratildi!!! Endi qo'shimcha ma'lumotlarni kiriting",
                            description: "Принято",
                            placement: "topLeft",
                        });
                    },
                    fail: (e) => {
                        setIsLoading(false)
                        const message = get(e, "response.data.message", "");
                        notification["error"]({
                            message: "Ошибка",
                            description: message,
                            placement: "topLeft",
                        });
                    },
                },
            },
        });
    }
    const create = (attributes, formMethods) => {
        setIsLoading(true)
        const url = "/bonus/bonus-employee";
        const storeName = "bonus-employee-create";
        const entityName = "employee";
        const scheme = EmployeeScheme;
        dispatch({
            type: ApiActions.OPERATION_ADD.REQUEST,
            payload: {
                url,
                storeName,
                entityName,
                scheme,
                attributes,
                cb: {
                    success: (nData, data) => {
                        setIsLoading(false)
                        notification["success"]({
                            message: "Успешно",
                            description: "Создано",
                            placement: "topRight",
                        });
                        window.history.back();
                        formMethods.setSubmitting(false);
                    },
                    fail: (e) => {
                        setIsLoading(false)
                        formMethods.setSubmitting(false)
                        const message = get(e, "response.data.message", []);
                        notification["error"]({
                            message: "Ошибка",
                            description: message,
                            placement: "topRight",
                        });
                    },
                },
            },
        });
    };
    if (isLoading) {
        return <Loader/>
    }
    return (
        <Formik
            initialValues={{
                type: get(responseData, "type", "") ? get(responseData, "type", "") : "1",
                tab_number: "",
                document: get(responseData, "data.document", ""),
                pinpp: get(responseData, "data.pinfl", ""),
                dep_name: "",
                post_name: ""
            }}
            validationSchema={employeeScheme}
            onSubmit={(values, actions) => {
                const {type, tab_number, document, pinpp, dep_name, post_name} = values;
                if (!isEmpty(responseData)) {
                    create({type, document, pinpp, dep_name, post_name}, actions)
                } else if (isEqual(type, "2")) {
                    getEmployee({type, document, pinpp}, actions);
                } else {
                    create({type, tab_number}, actions);
                }
            }}
        >
            {({
                  handleSubmit,
                  handleChange,
                  values,
                  errors,
                  touched,
                  isSubmitting,
                  setFieldValue
              }) => {
                return (
                    <div>
                        <div className="page-hero page-container" id="page-hero">
                            <div className="padding d-flex">
                                <div className="page-title"><h2
                                    className="text-md text-highlight">{t("Hodim yaratish")}</h2><small
                                    className="text-muted">{t("Maxsus kreditlarni undirish uchun hodim biriktirish")}</small>
                                </div>
                                <div className="flex"/>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                                         strokeLinejoin="round" className="feather feather-arrow-left">
                                        <line x1={19} y1={12} x2={5} y2={12}/>
                                        <polyline points="12 19 5 12 12 5"/>
                                    </svg>
                                    <Link
                                        to={"/credit-monitoring/employees"}
                                        className="btn btn-md text-muted p-0"><span
                                        className="d-none d-sm-inline mx-1">{t("Ortga")}</span>
                                    </Link></div>
                            </div>
                        </div>
                        <div className={"page-content page-container"} id={"page-content"}>
                            <div className={"padding"}>
                                <div className="card">
                                    <div className="card-header"><strong>{t("Hodim yaratish")}</strong></div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label className="text-muted"
                                                       htmlFor="exampleInputEmail1">{t("Hodim turi")}</label>
                                                <select disabled={!isEmpty(responseData)} onChange={event => {
                                                    setFieldValue("type", get(event, "target.value"));
                                                    setType(get(event, "target.value"))
                                                }}
                                                        placeholder={"Hodim turini tanlang"}
                                                        name={"type"} className="form-control form-control-sm">
                                                    <option value={1}
                                                            selected={isEqual(type, "1")}>{t("Bank hodimi")}</option>
                                                    <option value={2}
                                                            selected={isEqual(type, "2")}>{t("Mahsus hodim")}</option>
                                                </select>
                                                <small
                                                    className={"form-text text-danger"}>{errors.type && touched.type && errors.type}</small>
                                            </div>
                                            {isEqual(type, "1") &&
                                            <div className="form-group"><label className="text-muted"
                                                                               htmlFor="exampleInputPassword1">{t("Tab number")}</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    placeholder="tab number"
                                                    onChange={event => setFieldValue("tab_number",get(event,"target.value"))}
                                                    value={values.tab_number}
                                                    name={"tab_number"}
                                                />
                                                <small
                                                    className={"form-text text-danger"}>{errors.tab_number && touched.tab_number && errors.tab_number}</small>
                                            </div>
                                            }
                                            {isEqual(type, "2") &&
                                            <>
                                                <div className="form-group"><label className="text-muted"
                                                                                   htmlFor="exampleInputPassword1">{t("Passport")}</label>
                                                    <InputMask
                                                        mask="aa9999999"
                                                        type="text"
                                                        name="document"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                        value={values.document}
                                                        disabled={!isEmpty(responseData)}
                                                        placeholder="passport"
                                                    />
                                                    <small
                                                        className={"form-text text-danger"}>{errors.document && touched.document && errors.document}</small>
                                                </div>
                                                <div className="form-group"><label className="text-muted"
                                                                                   htmlFor="exampleInputPassword1">{t("Pinfl")}</label>
                                                    <InputMask
                                                        mask="99999999999999"
                                                        type="text"
                                                        name="pinpp"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                        value={values.pinpp}
                                                        disabled={!isEmpty(responseData)}
                                                        placeholder="pinfl"
                                                    />
                                                    <small
                                                        className={"form-text text-danger"}>{errors.pinpp && touched.pinpp && errors.pinpp}</small>
                                                </div>
                                            </>}
                                            {isEqual(get(responseData, "type"), "2") &&
                                            <>
                                                <div className="form-group"><label className="text-muted"
                                                                                   htmlFor="exampleInputPassword1">{t("Dep name")}</label>
                                                    <input
                                                        type="text"
                                                        name="dep_name"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                        value={values.dep_name}
                                                        disabled={isSubmitting}
                                                        placeholder="dep name"
                                                    />
                                                    <small
                                                        className={"form-text text-danger"}>{errors.dep_name && touched.dep_name && errors.dep_name}</small>
                                                </div>
                                                <div className="form-group"><label className="text-muted"
                                                                                   htmlFor="exampleInputPassword1">{t("Post name")}</label>
                                                    <input
                                                        type="text"
                                                        name="post_name"
                                                        className="form-control"
                                                        onChange={handleChange}
                                                        value={values.post_name}
                                                        disabled={isSubmitting}
                                                        placeholder="post name"
                                                    />
                                                    <small
                                                        className={"form-text text-danger"}>{errors.post_name && touched.post_name && errors.post_name}</small>
                                                </div>


                                                    <TemplateTable
                                                        head={[
                                                            t("Full name"),
                                                            t("Passport"),
                                                            t("Pinfl"),
                                                            t("Type"),
                                                        ]}
                                                    >
                                                        <tr
                                                            key={get(responseData, "data.result")}
                                                            className={"v-middle cursor-pointer text-hover"}
                                                        >
                                                            <td className={"text-muted "}>{`${get(responseData, "data.surname_latin")} ${get(responseData, "data.name_latin")} ${get(responseData, "data.patronym_latin")}`}</td>
                                                            <td className={"text-muted"}>{get(responseData, "data.document")}</td>
                                                            <td className={"text-muted"}>{get(responseData, "data.pinfl")}</td>
                                                            <td className={"text-muted"}>{isEqual(get(responseData, "type"),1) ? t("Bank hodimi"): t("Maxsus hodim")}</td>
                                                        </tr>
                                                    </TemplateTable>
                                            </>
                                            }
                                            <button type="submit" className="btn btn-primary">{t("Submit")}</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}


export default withTranslation("bhm_one")(EmployeeCreatePage);
import React, {useState} from 'react';
import PageHeader from "../../../../components/PageHeader";
import DocumentScheme from "../../../../schema/Document";
import {useDispatch} from "react-redux";
import ApiActions from "../../../../services/api/Actions";
import {get, isEmpty} from "lodash";
import {notification} from "antd";
import Loader from "../../../../components/Loader";
import {withTranslation} from "react-i18next";
import {useHistory} from "react-router";
import {Formik} from 'formik';
import StagesScheme from "../../../../schema/Stages";

function StagesCreatePage(props) {
    const {t} = props;
    const history = useHistory()
    const [isFetched, setIsFetched] = useState(false)
    const dispatch = useDispatch();
    const create = (data) => {
        setIsFetched(true)
        const storeName = "credit-monitoring-stages-create";
        const entityName = "stage";
        const scheme = {data: [StagesScheme]}
        dispatch({
            type: ApiActions.OPERATION_ADD.REQUEST,
            payload: {
                attributes: {
                    ...data
                },
                url: "monitoring/stages",
                formMethods: () => {
                },
                scheme,
                storeName,
                entityName,
                cb: {
                    success: (nData, data) => {
                        notification['success']({
                            message: t('Успешно'),
                            description: t('Создано'),
                            placement: 'topRight',
                        });
                        setIsFetched(false)
                        window.history.back()
                    },
                    fail: (e) => {
                        notification['error']({
                            message: t(get(e, "response.data[0].message")),
                            description: t('Ошибка'),
                            placement: 'topRight',
                        });
                        setIsFetched(false)
                    }
                }
            }
        });
    }
    const cancelLink = () => {
        history.push(`/credit-monitoring/stages`)
    }
    if (isFetched) {
        return <Loader/>
    }
    return (
        <>
            <PageHeader name={t("Stages")} desc={t("Stage create")}/>
            <div className={"page-content page-container"}>
                <div className={"card"}>
                    <div className="card-header"><strong>{t("Create stage")}</strong></div>
                    <div className={"card-body"}>
                        <Formik
                            initialValues={{title: '', comment: '',start_day:'',expire_day:''}}
                            validate={values => {
                                const errors = {};
                                if (!values.title) {
                                    errors.title = t('Title is required');
                                }
                                if (!values.comment) {
                                    errors.comment = t('Comment is required');
                                }
                                if (!values.start_day) {
                                    errors.start_day = t("Start day is required");
                                }
                                if (!values.expire_day) {
                                    errors.expire_day = t("Expire day is required");
                                }
                                return errors;
                            }}
                            onSubmit={(values, {setSubmitting}) => {
                                create(values)
                            }}
                        >
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  isSubmitting,
                                  /* and other goodies */
                              }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group row"><label
                                        className="col-sm-3 col-form-label">{t("Title")}</label>
                                        <div className="col-sm-9"><input
                                            name="title"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.title}
                                            type="text"
                                            className="form-control"/>
                                            <small className={"text-danger"}>{errors.title && touched.title && errors.title}</small>
                                        </div>
                                    </div>
                                    <div className="form-group row"><label
                                        className="col-sm-3 col-form-label">{t("Comment")}</label>
                                        <div className="col-sm-9"><input
                                            name="comment"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.comment}
                                            type="text"
                                            className="form-control"/>
                                            <small className={"text-danger"}>{errors.comment && touched.comment && errors.comment}</small>
                                        </div>
                                    </div>
                                    <div className="form-group row"><label
                                        className="col-sm-3 col-form-label">{t("Start day")}</label>
                                        <div className="col-sm-9"><input
                                            name="start_day"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.start_day}
                                            type="number"
                                            className="form-control"/>
                                            <small className={"text-danger"}>{errors.start_day && touched.start_day && errors.start_day}</small>
                                        </div>
                                    </div>
                                    <div className="form-group row"><label
                                        className="col-sm-3 col-form-label">{t("Expire day")}</label>
                                        <div className="col-sm-9"><input
                                            name="expire_day"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.expire_day}
                                            type="number"
                                            className="form-control"/>
                                            <small className={"text-danger"}>{errors.expire_day && touched.expire_day && errors.expire_day}</small>
                                        </div>
                                    </div>
                                    <button className={"btn  btn-primary mr-2"} disabled={isSubmitting} type="submit">{t("Save")}</button>
                                    <button onClick={cancelLink} className={"btn btn-default"} type="button">{t("Cancel")}</button>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
}

export default withTranslation("bhm_one")(StagesCreatePage);

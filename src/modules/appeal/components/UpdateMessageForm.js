import React, {Component} from 'react';
import {Link, useParams} from "react-router-dom";
import {Form, Formik} from "formik";
import InputMask from "react-input-mask";
import get from "lodash/get";
import {withTranslation} from "react-i18next";

const UpdateMessageForm = ({messages,updateMessage,t}) => {

        return (
            <div>
                <div className="page-content page-container">
                    <div className="card">
                        <div className="card-header">
                            {t("withTranslation form")}
                        </div>
                        <div className="card-body">
                            <Formik
                                initialValues={{
                                    message: messages.message,
                                    ru:  messages.ru,
                                    uz:  messages.uz,
                                    en:  messages.en,
                                    lt:  messages.lt,
                                    id: messages.id,
                                }}

                                onSubmit={(values) => {
                                    updateMessage(values);
                                }}

                            >
                                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                                    <Form className="m-t  mode-dark" onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right">{t("withTranslation text")}</label>
                                            <div className="col-sm-9">
                                                <InputMask
                                                    type="text"
                                                    name="message"
                                                    readOnly={true}
                                                    className=
                                                        "form-control  mode-dark "
                                                    placeholder={"Message"}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.message}
                                                />
                                                <div className="text-danger my-2">
                                                    {errors.message && touched.message ? (
                                                        errors.message
                                                    ) : null}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right">RU</label>
                                            <div className="col-sm-9">
                                                <InputMask
                                                    type="text"
                                                    name="ru"
                                                    className=
                                                        "form-control   mode-dark "
                                                    placeholder={"Ru"}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.ru}
                                                />
                                                <div className="text-danger my-2">
                                                    {errors.ru && touched.ru ? (
                                                        errors.ru
                                                    ) : null}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right">EN</label>
                                            <div className="col-sm-9">
                                                <InputMask
                                                    type="text"
                                                    name="en"
                                                    className=
                                                        "form-control   mode-dark "
                                                    placeholder={"En"}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.en}
                                                />
                                                <div className="text-danger text-center my-2">
                                                    {errors.en && touched.en ? (
                                                        errors.en
                                                    ) : null}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right">УЗ</label>
                                            <div className="col-sm-9">
                                                <InputMask
                                                    type="text"
                                                    name="uz"
                                                    className=
                                                        "form-control   mode-dark "
                                                    placeholder={"Uz"}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.uz}
                                                />
                                                <div className="text-danger text-center my-2">
                                                    {errors.uz && touched.uz ? (
                                                        errors.uz
                                                    ) : null}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right">UZ</label>
                                            <div className="col-sm-9">
                                                <InputMask
                                                    type="text"
                                                    name="lt"
                                                    className=
                                                        "form-control   mode-dark "
                                                    placeholder={"Lotin"}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.lt}
                                                />
                                                <InputMask
                                                    type="hidden"
                                                    name="id"
                                                    className=
                                                        "form-control text-center  mode-dark "
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.id}
                                                />
                                                <div className="text-danger text-center my-2">
                                                    {errors.id && touched.id ? (
                                                        errors.id
                                                    ) : null}

                                                </div>
                                            </div>
                                        </div>
                                            <div className="col-sm-4 offset-3">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary mr-2 w-sm"
                                                >
                                                    {t("Save")}
                                                </button>
                                                <Link to="/language" className={"btn btn-link w-sm"} type="button">{t("Cancel")}</Link>
                                            </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>

                </div>

            </div>
        );

}

export default withTranslation("bhm_one")(UpdateMessageForm);
import React, {Component,useEffect} from 'react';
import {Field, Form, Formik} from 'formik';
import InputMask from 'react-input-mask';
import * as Yup from "yup";

const CreateMessageForm = ({createMessage,t}) =>{

    return (
        <div>
            <Formik
                initialValues={{
                    message: '',
                    ru: '',
                    uz: '',
                    en: '',
                    lt: '',
                }}


                onSubmit={(values) => {
                    createMessage(values);
                }}

            >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <Form className="m-t  mode-dark" onSubmit={handleSubmit}>
                        <div className="row"  style={{padding:40}}>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="m-1">Message</label>
                                    <InputMask
                                        type="text"
                                        name="message"
                                        className=
                                            "form-control text-center  mode-dark "
                                        placeholder={"Message"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.message}
                                        style={{fontSize: "1.1rem"}}
                                    />
                                    <div className="text-danger text-center my-2">
                                        {errors.message && touched.message ? (
                                            errors.message
                                        ) : null}

                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="m-1">Ru</label>
                                    <InputMask
                                        type="text"
                                        name="ru"
                                        className=
                                            "form-control text-center  mode-dark "
                                        placeholder={"Ru"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.ru}
                                        style={{fontSize: "1.1rem"}}
                                    />
                                    <div className="text-danger text-center my-2">
                                        {errors.ru && touched.ru ? (
                                            errors.ru
                                        ) : null}

                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="m-1">Uz</label>
                                    <InputMask
                                        type="text"
                                        name="uz"
                                        className=
                                            "form-control text-center  mode-dark "
                                        placeholder={"Uz"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.uz}
                                        style={{fontSize: "1.1rem"}}
                                    />
                                    <div className="text-danger text-center my-2">
                                        {errors.uz && touched.uz ? (
                                            errors.uz
                                        ) : null}

                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="form-group">
                                <label className="m-1">En</label>
                                <InputMask
                                    type="text"
                                    name="en"
                                    className=
                                        "form-control text-center  mode-dark "
                                    placeholder={"En"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    values={values.en}
                                    style={{fontSize: "1.1rem"}}
                                />
                                <div className="text-danger text-center my-2">
                                    {errors.en && touched.en ? (
                                        errors.en
                                    ) : null}

                                </div>
                            </div>
                        </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="m-1">Lotin</label>
                                    <InputMask
                                        type="text"
                                        name="lt"
                                        className=
                                            "form-control text-center  mode-dark "
                                        placeholder={"Lotin"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.lt}
                                        style={{fontSize: "1.1rem"}}
                                    />
                                    <div className="text-danger text-center my-2">
                                        {errors.lt && touched.lt ? (
                                            errors.lt
                                        ) : null}

                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 offset-4 mt-3">
                                <button
                                    type="submit"
                                    className="btn btn-success btn-block btn-md"
                                    style={{marginLeft: '5px',fontSize: "1.1rem"}}
                                >
                                    {t("Save")}
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CreateMessageForm;

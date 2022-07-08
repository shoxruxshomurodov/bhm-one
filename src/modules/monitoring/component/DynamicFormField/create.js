import React, {useState} from "react";
import {Field, FieldArray, Form, Formik} from "formik";
import {Link} from "react-router-dom";
import {get} from "lodash";
import {withTranslation} from "react-i18next";


const Create = ({
        t,
        cancelLink,
        request,
        initialValues,
    }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={values => request(values)}
            render={({values}) => {
                return (
                    <Form>
                        <FieldArray
                            name="children"
                            render={arrayHelpers => {
                                return (
                                    <div>
                                        {values.children &&
                                        values.children.map((child, index) => {
                                            return (
                                                <div className={"form-group row"} key={index}>
                                                    <label className="col-sm-3 col-form-label">{t("File name")}</label>
                                                    <div className={"col-sm-9 d-flex align-items-center"}>
                                                        <Field
                                                            className={"form-control form-control-sm"}
                                                            name={`children.${index}`}
                                                            value={get(child, "title")}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                arrayHelpers.remove(index);
                                                            }}
                                                            className={"btn btn-sm btn-danger p-1"}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg" width={16}
                                                                height={16}
                                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                                strokeWidth={2} strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="feather feather-trash-2 mx-2">
                                                                <polyline points="3 6 5 6 21 6"/>
                                                                <path
                                                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                                                <line x1={10} y1={11} x2={10} y2={17}/>
                                                                <line x1={14} y1={11} x2={14} y2={17}/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        }
                                        <button className={"btn btn-warning d-block mt-3 ml-auto btn-block"}
                                                onClick={() => {
                                                    arrayHelpers.push("");
                                                }} type="button">
                                            {t("Attach file")}
                                        </button>
                                    </div>
                                )
                            }
                            }
                        />
                        <div className={"mt-5"}>
                            <button className={"btn  btn-primary mr-2"} type="submit">{t("Save")}</button>
                            <button onClick={cancelLink}className={"btn btn-default"} type="button">{t("Cancel")}</button>
                        </div>
                    </Form>
                )
            }}
        />
    )
};
export default withTranslation("bhm_one")(Create);

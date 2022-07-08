import React, {useState} from "react";
import {Field, FieldArray, Form, Formik} from "formik";
import {Link} from "react-router-dom";
import {get} from "lodash";
import {withTranslation} from "react-i18next";


const Update = ({
        t,
        cancelLink,
        request,
        initialValues,
        identifyFormFieldValue = (id, title, state, isNew) => {
        }
    }) => {
    const [field, setField] = useState("");
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={values => request(values)}
            render={({values}) => {
                return (
                    <Form>
                        <div className="form-group row"><label className="col-sm-3 col-form-label text-right">{t("Document")}</label>
                            <div className="col-sm-9"><Field type="text" name={"title"} className="form-control"/>
                            </div>
                        </div>
                        <FieldArray
                            name="children"
                            render={arrayHelpers => {
                                return (
                                    <div>
                                        {values.children &&
                                        values.children.map((child, index) => {
                                            return (
                                                <div className={"form-group row"} key={index}>
                                                    <label className="col-sm-3 col-form-label text-right">{t("File name")}</label>
                                                    <div className={"col-sm-9 d-flex align-items-center"}>
                                                        <Field
                                                            className={"form-control form-control-sm"}
                                                            name={`children.${index}`}
                                                            value={get(child, "title")}
                                                            render={({
                                                                         field: {name, value, onChange, onBlur},
                                                                         form: {isSubmitting}
                                                                     }) => {
                                                                return (
                                                                    <textarea name={name} onChange={e => {
                                                                        setField(get(e, "target.value"))
                                                                        identifyFormFieldValue(get(child, "id") ? get(child, "id") : index, get(e, "target.value"), {
                                                                            is_deleted: false,
                                                                            is_new: false,
                                                                            is_modified: true
                                                                        })
                                                                    }} disabled={isSubmitting}
                                                                           defaultValue={get(value, "title")}
                                                                           type="text"
                                                                           className={"form-control form-control-sm"}/>
                                                                )
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                arrayHelpers.remove(index);
                                                                identifyFormFieldValue(get(child, "id") ? get(child, "id") : index, child, {
                                                                    is_deleted: true,
                                                                    is_new: get(child, "id") ? false : true
                                                                })
                                                            }}
                                                            className={"btn btn-sm btn-link p-1 text-danger "}
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
                                        <button className={"btn btn-outline-info d-block mt-3 ml-auto w-sm"}
                                                onClick={() => {
                                                    arrayHelpers.push("");
                                                    identifyFormFieldValue(get(arrayHelpers, "form.values.children").length, field, {
                                                        is_deleted: false,
                                                        is_new: true,
                                                        is_modified: false
                                                    })
                                                }} type="button">
                                            {t("Attach file")}
                                        </button>
                                    </div>
                                )
                            }
                            }
                        />
                        <div className={"form-group row"}>
                            <div className={"col-sm-4 offset-3"}>
                                <button className={"btn w-sm btn-primary mr-2"} type="submit">{t("Save")}</button>
                                <Link to={cancelLink} className={"btn w-sm btn-link"} type="button">{t("Cancel")}</Link>
                            </div>
                        </div>
                    </Form>
                )
            }}
        />
    )
};
export default withTranslation("bhm_one")(Update);

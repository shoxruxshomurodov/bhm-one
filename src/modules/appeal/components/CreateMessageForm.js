import React, {Component, useEffect, useState} from 'react';
import {Field, Form, Formik} from 'formik';
import InputMask from 'react-input-mask';
import * as Yup from "yup";
import TextArea from "antd/es/input/TextArea";
import Select from "react-select";
import Switch from "react-switch";
import {isEqual,get} from "lodash";
const CreateMessageForm = ({createAppeal,filials,t}) =>{
    const [types,setTypes] = useState({isPositive:true,isNegative:true});
    const AppealSchema = Yup.object().shape({
        message:  Yup.string().required("Messageni to`ldiring"),
    });

    const validate = values => {
        const errors = {};
        if (!values.filial_anonym && !values.filial_code) {
            errors.filial_code = 'Required';
        }
        if (!values.phone_anonym && !values.phone) {
            errors.phone = 'Required';
        }
        if (!values.full_name_anonym && !values.full_name) {
            errors.full_name = 'Required';
        }

        return errors;
    };
    const changeButton = (name,type) => {

        if(isEqual(name,"isPositive") && type) {
            setTypes({"isPositive":!type,"isNegative":type})
        }
        if(isEqual(name,"isPositive") && !type) {
            setTypes({"isPositive":!type,"isNegative":type})
        }
        if(isEqual(name,"isNegative") && type) {
            setTypes({"isPositive":type,"isNegative":!type})
        }
        else if(isEqual(name,"isNegative") && !type) {
           setTypes({"isNegative":!type,"isPositive":type})
        }
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6" style={{textAlign: "center",marginTop:100}}>
                    <button

                        type="button"
                        name={"isPositive"}
                        onClick={e => changeButton(get(e,"target.name"),get(types,"isPositive"))}
                        className={get(types,"isPositive") ? "btn btn-success" : "btn btn-warning"}
                    >
                        Таклиф
                    </button>

                    <button
                        style={{marginLeft:100}}
                        type="button"
                        name={"isNegative"}
                        onClick={e => changeButton(get(e,"target.name"),get(types,"isNegative"))}
                        className={get(types,"isNegative") ? "btn btn-success" : "btn btn-warning"}
                    >
                        Мурожаат
                    </button>
                </div>
                <div className="col-md-3"></div>
            </div>
            <Formik
                initialValues={{
                    filial_code: '',
                    message: '',
                    full_name: '',
                    phone: '',
                    filial_anonym: false,
                    phone_anonym: false,
                    full_name_anonym: false,
                    ButtonClassName: "btn btn-success",
                }}
                validationSchema={AppealSchema}
                validate={validate}

                onSubmit={(values) => {
                    values.type= get(types,"isPositive");
                    createAppeal(values);
                }}
            >
                {({values, setFieldValue, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <Form className="m-t  mode-dark" onSubmit={handleSubmit}>
                        <div className="row" style={{padding: 40}}>
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <div className="form-group">
                                                <label className="m-1">Филиал код</label>
                                                <Select
                                                    placeholder="Филиал код"
                                                    className="form-control"
                                                    onChange={(value) => {
                                                        values.filial_code = value.value
                                                    }}
                                                    options={filials}
                                                />
                                                <div className="text-danger text-center my-2">
                                                    {errors.filial_code && touched.filial_code ? (
                                                        errors.filial_code
                                                    ) : null}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <label className="m-1">Anonim</label>
                                            <Switch
                                                onChange={(value) => {
                                                    setFieldValue("filial_anonym", value);
                                                }}
                                                checked={values.filial_anonym}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <div className="form-group">
                                                <label className="m-1">ФИО</label>
                                                <InputMask
                                                    type="text"
                                                    name="full_name"
                                                    className=
                                                        "form-control text-center  mode-dark "
                                                    placeholder={"ФИО"}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    values={values.full_name}
                                                    style={{fontSize: "1.1rem"}}
                                                />
                                                <div className="text-danger text-center my-2">
                                                    {errors.full_name && touched.full_name ? (
                                                        errors.full_name
                                                    ) : null}

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <label className="m-1">Anonim</label>
                                            <Switch
                                                onChange={(value) => {
                                                    setFieldValue("full_name_anonym", value);
                                                }}
                                                checked={values.full_name_anonym}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <div className="form-group">
                                                <label className="m-1">Phone</label>
                                                <InputMask
                                                    type="text"
                                                    name="phone"
                                                    className=
                                                        "form-control text-center  mode-dark "
                                                    placeholder={"Phone"}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    values={values.ru}
                                                    style={{fontSize: "1.1rem"}}
                                                />
                                                <div className="text-danger text-center my-2">
                                                    {errors.phone && touched.phone ? (
                                                        errors.phone
                                                    ) : null}

                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <label className="m-1">Anonim</label>
                                            <Switch
                                                onChange={(value) => {
                                                    setFieldValue("phone_anonym", value);
                                                }}
                                                checked={values.phone_anonym}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label className="m-1">Матнни киритинг</label>
                                        <TextArea
                                            type="text"
                                            name="message"
                                            className=
                                                "form-control text-center  mode-dark "
                                            placeholder={"Матнни киритинг"}
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


                            </div>
                            <div className="col-md-3"></div>


                            <div className="col-sm-4 offset-4 mt-3">
                                <button
                                    type="submit"
                                    className="btn btn-success btn-block btn-md"
                                    style={{marginLeft: '5px', fontSize: "1.1rem"}}
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

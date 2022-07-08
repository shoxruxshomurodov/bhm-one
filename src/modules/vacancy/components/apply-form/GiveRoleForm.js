import React, {Component,useEffect} from 'react';
import {Field, Form, Formik} from 'formik';
import InputMask from 'react-input-mask';
import * as Yup from "yup";

const GiveRoleForm = ({submitForm}) =>{
    const AppealSchema = Yup.object().shape({
        role: Yup.string().required("Required"),
        phone: Yup.string().required("Required"),
    });

    return (
        <div>
            <Formik
                initialValues={{
                    role: '',
                    phone: '',
                }}

                validationSchema={AppealSchema}

                onSubmit={(values) => {
                    submitForm(values);
                }}

            >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <Form className="m-t  mode-dark" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="m-1">Role</label>
                                    <select
                                        name="role"
                                        className="form-control"
                                        style={{
                                            color: "#000",
                                            width: "100%",
                                            margin: "auto",
                                        }}
                                        onBlur={handleBlur}
                                        placeholder={"Role"}
                                        onChange={handleChange}
                                    >
                                        <option value=""/>
                                        <option value="vacancy_filial_manager">Filial Manager</option>
                                        <option value="vacancy_hr_role">HR</option>
                                        <option value="vacancy_department_manager">Department Manager</option>

                                    </select>
                                    <div className="text-danger text-center my-2">
                                        {errors.role && touched.role ? (
                                            errors.role
                                        ) : null}

                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="m-1">Номер телефона</label>
                                    <InputMask
                                        type="text"
                                        name="phone"
                                        className=
                                            "form-control text-center  mode-dark "
                                        placeholder={"Номер телефона"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.phone}
                                        style={{fontSize: "1.1rem"}}
                                        mask="(99)999-99-99"
                                    />
                                    <div className="text-danger text-center my-2">
                                        {errors.phone && touched.phone ? (
                                            errors.phone
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
                                    Give role
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default GiveRoleForm;

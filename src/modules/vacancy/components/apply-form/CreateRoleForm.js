import React, {Component,useEffect} from 'react';
import {Field, Form, Formik} from 'formik';
import InputMask from 'react-input-mask';
import * as Yup from "yup";

const CreateRoleForm = ({submitForm}) =>{
    const AppealSchema = Yup.object().shape({
        role: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
    });

    return (
        <div>
            <Formik
                initialValues={{
                    role: '',
                    description: '',
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
                                    <InputMask
                                        type="text"
                                        name="role"
                                        className=
                                            "form-control text-center  mode-dark "
                                        placeholder={"Role"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.role}
                                        style={{fontSize: "1.1rem"}}
                                    />
                                    <div className="text-danger text-center my-2">
                                        {errors.role && touched.role ? (
                                            errors.role
                                        ) : null}

                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="m-1">Description</label>
                                    <InputMask
                                        type="text"
                                        name="description"
                                        className=
                                            "form-control text-center  mode-dark "
                                        placeholder={"Description"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.description}
                                        style={{fontSize: "1.1rem"}}
                                    />
                                    <div className="text-danger text-center my-2">
                                        {errors.description && touched.description ? (
                                            errors.description
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
                                    Create
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CreateRoleForm;

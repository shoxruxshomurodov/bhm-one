import React, {Component,useEffect} from 'react';
import {Field, Form, Formik} from 'formik';
import InputMask from 'react-input-mask';
import * as Yup from "yup";

const QuestionForm = ({submitForm, candidate_id,user_id,rating_list = [],...props}) =>{
    const AppealSchema = Yup.object().shape({
        title: Yup.string().required("Required"),
        ball: Yup.string().required("Required"),
        comment: Yup.string().required("Required"),
    });

    return (
        <div>
            <Formik
                initialValues={{
                    candidate_id: candidate_id,
                    title: '',
                    ball: '',
                    comment: '',
                    user_id: user_id,
                }}

                validationSchema={AppealSchema}

                onSubmit={(values, {setFieldError,setSubmitting}) => {
                    submitForm(values, {setFieldError,setSubmitting});
                }}

            >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <Form className="m-t  mode-dark" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="m-1">Сарлавҳа</label>
                                    <InputMask
                                        type="text"
                                        name="title"
                                        className=
                                            "form-control text-center  mode-dark "
                                        placeholder={"Сарлавҳа"}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        values={values.title}
                                        style={{fontSize: "1.1rem"}}
                                    />
                                    <div className="text-danger text-center my-2">
                                        {errors.title && touched.title ? (
                                            errors.title
                                        ) : null}

                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <label className="m-1 d-block">Изоҳ</label>
                                <Field
                                    name="comment"
                                    component="textarea"
                                    rows="6"
                                    placeholder="Изоҳ"
                                    className={"d-block w-100 mb-2 p-3 form-control"}
                                />
                                <div className="text-danger text-center my-2">
                                    {errors.comment && touched.comment ? (
                                        errors.comment
                                    ) : null}

                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label className="m-1">Балл</label>
                                    <Field as="select" name="ball" className=
                                        "form-control text-center  mode-dark "  style={{fontSize: "1.1rem"}} >
                                        <option selected >Выберите балл</option>
                                        {
                                            rating_list && rating_list.map(({ball,name}) => <option
                                                value={ball} key={ball}>{name}</option>)
                                        }
                                    </Field>
                                    <div className="text-danger text-center my-2">
                                        {errors.ball && touched.ball ? (
                                            errors.ball
                                        ) : null}

                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 offset-sm-4 text-right">
                                <button
                                    type="submit"
                                    className="btn btn-success btn-block btn-md"
                                    style={{marginLeft: '5px', marginTop:'25px',fontSize: "1.1rem"}}
                                >
                                    Отправить
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default QuestionForm;

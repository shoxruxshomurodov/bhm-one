import React from 'react';
import {Formik} from 'formik';
import {isEmpty, get} from "lodash"
import classNames from "classnames";

const RequirementGeneralForm = ({onClose, onSubmitRequest,product}) => {
    const initialValues = {
        continuous_days:get(product,"continuous_days"),
        purposive_days:get(product,"purposive_days")
    }
    return (
        <div>
            <Formik
                initialValues={initialValues}
                // validate={values => {
                //     const errors = {};
                //     if (isEmpty(get(values, "continuous_days"))) {
                //         errors.continuous_days = "Введите непрерывные дни"
                //
                //     }
                //     if (isEmpty(get(values, "purposive_days"))) {
                //         errors.purposive_days = "Введите целевые дни"
                //     }
                //     return errors;
                // }}
                onSubmit={(values, {setSubmitting}) => {
                    onSubmitRequest(values)
                    setSubmitting(false);
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
                        <div className="form-group row"><label className="col-sm-4 col-form-label">Непрерывные дни </label>
                            <div className="col-sm-8"><input name={"continuous_days"} onChange={handleChange}
                                                             onBlur={handleBlur} value={values.continuous_days} type="text"
                                                             className={classNames("form-control", {
                                                                 "is-invalid": errors.continuous_days && touched.continuous_days
                                                             })}
                            />
                                <small
                                    className={"form-text text-muted"}> {errors.continuous_days && touched.continuous_days && errors.continuous_days}</small>

                            </div>
                        </div>
                        <div className="form-group row"><label className="col-sm-4 col-form-label">Целевые дни</label>
                            <div className="col-sm-8"><input name="purposive_days"
                                                             onChange={handleChange}
                                                             onBlur={handleBlur} value={values.purposive_days} type="text"
                                                             className={classNames("form-control", {
                                                                 "is-invalid": errors.purposive_days && touched.purposive_days
                                                             })}/>
                                <small
                                    className={"form-text text-muted"}> {errors.purposive_days && touched.purposive_days && errors.purposive_days}</small>
                            </div>
                        </div>
                        <div className={"mt-5"}>
                            <button className={"btn w-sm btn-sm btn-primary mr-1"} type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                            <button onClick={onClose} type={"button"} className={"btn w-sm btn-sm btn-white"}>
                                Орқага
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
};

export default RequirementGeneralForm;
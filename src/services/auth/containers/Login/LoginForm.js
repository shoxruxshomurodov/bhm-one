import React, {Component} from "react";
import {Formik} from "formik";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {AiOutlineArrowLeft} from "react-icons/ai";
import storage from "../../../storage";
import InputMask from "react-input-mask";

class LoginForm extends Component {
    goback = () => {
        const {history} = this.props;
        history.push("/auth");
        storage.remove("token");
    };

    render() {
        const {t, phone, submitForm, resetForm} = this.props;
        return (
            <div>
                <Formik
                    initialValues={{phone, password: ""}}
                    validate={(values) => {
                        const errors = {};
                        if (!values.password) {
                            errors.password = t("Пожалуйста введите пароль");
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting, setFieldError}) => {
                        submitForm(values, {setSubmitting, setFieldError});
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting
                      }) => (
                        <form className="m-t" onSubmit={handleSubmit}>
                            <h4>{`+${phone[0]}${phone[1]}${phone[2]} ${phone[3]}${phone[4]} *** ** ${phone[10]}${phone[11]}`}</h4>
                            <div className="form-group">
                                <label className="m-3">{t("Введите ваш пароль")} </label>
                                <InputMask
                                    type="password"
                                    name="password"
                                    className="form-control text-center"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.secret}
                                    style={{fontSize: "1.3rem"}}
                                    placeholder="Пароль"
                                    autoFocus
                                />
                                <span className="text-danger">
                  {errors.password && touched.password && errors.password}
                </span>
                            </div>
                            <span
                                onClick={this.goback}
                                className="btn btn-white btn-md"
                                style={{marginLeft: "5px"}}
                            >
                <AiOutlineArrowLeft/>
                Назад
              </span>
                            <button
                                type="submit"
                                className="btn btn-warning btn-md"
                                style={{marginLeft: "5px"}}
                                disabled={isSubmitting}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-check "
                                >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                {t("Подтвердить")}
                            </button>
                            <p
                                style={{
                                    marginLeft: "5px",
                                    marginTop: "20px",
                                    cursor: "pointer",
                                    textDecoration: "underline"
                                }}
                                onClick={resetForm}
                            >
                                Забыли пароль?
                            </p>
                        </form>
                    )}
                </Formik>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {};
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    };
};

export default withTranslation("bhm_one")(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm))
);

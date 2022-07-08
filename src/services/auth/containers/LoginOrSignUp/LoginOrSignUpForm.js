import React, { Component } from "react";
import InputMask from "react-input-mask";
import { Formik } from "formik";
import { get} from "lodash";
import { IoMdFingerPrint } from "react-icons/io";
import { Link } from "react-router-dom";
class LoginOrSignUpForm extends Component {
  render() {
    const { loginOrSignUp,CertSignIn,activeKey } = this.props;
    return (
      <Formik
        initialValues={{ phone: "" }}
        validate={(values) => {
          const errors = {};
            if (values.phone && values.phone.replace(/\D/g, "").length < 9 && values.phone.replace(/\D/g, "").length > 0) {
                errors.phone = "Номер телефона введен не полностью";
            }
            return errors;
        }}
        onSubmit={(values, actions) => {
          loginOrSignUp(get(values, "phone").replace(/\D/g, ""), actions);
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
            <div className="form-group">
              <label className="m-3">
                Пожалуйста, введите номер вашего мобильного телефона.
              </label>
              <InputMask
                mask="(99) 999-99-99"
                name="phone"
                className="form-control text-center"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                placeholder={"(__)-___-__-__"}
                style={{ fontSize: "1.3rem" }}
                autoFocus
                disabled={isSubmitting}
              />
              <span className="text-danger font-weight-bold">
                {errors.phone && touched.phone && errors.phone}
              </span>
            </div>

            <button
              type="submit"
              className="btn btn-success btn-md btn-block"
              disabled={!values.phone.replace(/\D/g, "").length}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-play mx-2"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Войти
            </button>
            <h5 className="my-2">Или</h5>
            <button
						type="button"
            disabled={activeKey} onClick={CertSignIn}
              className="btn btn-primary btn-md btn-block"
            >
             <IoMdFingerPrint size={20} className="mr-2" />
              Войти с ключом
            </button>


          </form>
        )}
      </Formik>
    );
  }
}

export default LoginOrSignUpForm;

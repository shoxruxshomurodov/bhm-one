import React from "react";
import { Formik } from "formik";
import InputMask from "react-input-mask";
import "../../../../assets/styles/style.css";
import { BiRefresh } from "react-icons/bi";
import { isEqual } from "lodash";

const UpdatePasswordForm = (props) => {
  let { submitForm, phone } = props;
  phone = phone.slice(3, 12);
  return (
    <Formik
      initialValues={{
        password: "",
        password_repeat: "",
        old_password: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.old_password) {
          errors.old_password = "Пожалуйста введите старий пароль потверждение";
        }
        if (!values.password) {
          errors.password = "Пожалуйста введите новый пароль потверждение";
        }
        if (!isEqual(values.password, values.password_repeat)) {
          errors.password_repeat = "пароль не равен";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        submitForm(values, { setSubmitting, setFieldError });
      }}
    >
      {({
        values,
        errors,
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <form className="page-container mode-dark" onSubmit={handleSubmit}>
          <label className="m-1">телефонный номер:</label>
          <InputMask
            mask="(99)-999-99-99"
            type="text"
            name="phone_num"
            className="form-control text-center  mode-dark "
            value={phone}
            placeholder={"телефонный номер"}
            style={{ fontSize: "1.1rem" }}
          />
          <label className="m-1">старий пароль:</label>
          <InputMask
            type="password"
            name="old_password"
            className="form-control text-center  mode-dark "
            placeholder={"старий пароль"}
            onChange={handleChange}
            onBlur={handleBlur}
            values={values.old_password}
            style={{ fontSize: "1.1rem" }}
          />
          <div className="text-danger text-center my-2">
            {errors.old_password && errors.old_password}
          </div>
          <label className="m-1">новый пароль:</label>
          <InputMask
            type="password"
            name="password"
            className="form-control text-center  mode-dark "
            placeholder={"новый пароль"}
            onChange={handleChange}
            onBlur={handleBlur}
            values={values.password}
            style={{ fontSize: "1.1rem" }}
          />
          <div className="text-danger text-center my-2">
            {errors.password && errors.password}
          </div>
          <label className="m-1">повторение новый пароль:</label>
          <InputMask
            type="password"
            name="password_repeat"
            className="form-control text-center  mode-dark "
            onBlur={handleBlur}
            onChange={handleChange}
            values={values.password_repeat}
            placeholder={"повторение новый пароль"}
            style={{ fontSize: "1.1rem" }}
          />
          <div className="text-danger text-center my-2">
            {errors.password_repeat && errors.password_repeat}
          </div>
          <button
            type="submit"
            className="btn btn-md btn-primary mt-4"
            disabled={isSubmitting}
          >
            <BiRefresh fontSize="20" className="form-icon" />
            {"Обновить"}
          </button>
        </form>
      )}
    </Formik>
  );
};

export default UpdatePasswordForm;

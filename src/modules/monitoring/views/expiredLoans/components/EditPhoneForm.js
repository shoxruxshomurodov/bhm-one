import { Formik } from "formik";
import { get } from "lodash";
import React from "react";
import { withTranslation } from "react-i18next";
import InputMask from "react-input-mask";

const EditPhoneForm = ({ editPhoneNumber, t }) => {
  return (
    <Formik
      initialValues={{ phone: "" }}
      validate={(values) => {
        const errors = {};
        if (
          values.phone &&
          values.phone.replace(/\D/g, "").length < 9 &&
          values.phone.replace(/\D/g, "").length > 0
        ) {
          errors.phone = t("Номер телефона введен не полностью");
        }
        return errors;
      }}
      onSubmit={(values) => {
        editPhoneNumber(get(values, "phone").replace(/\D/g, ""));
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
      }) => (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <InputMask
              mask="(99) 999-99-99"
              name="phone"
              className="form-control text-center"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              placeholder={"(__)-___-__-__"}
              style={{ fontSize: "1.5rem" }}
              autoFocus
              disabled={isSubmitting}
            />
            <span className="text-danger">
              {errors.phone && touched.phone && errors.phone}
            </span>
          </div>
          <div className={"mt-2"}>
            <button
              className={"btn btn-sm btn-primary mr-2"}
              type="submit"
              disabled={values.phone.replace(/\D/g, "").length < 9}
            >
              {t("Submit")}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};
export default withTranslation("bhm_one")(EditPhoneForm);

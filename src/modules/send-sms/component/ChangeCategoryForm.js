import React from "react";
import { Formik } from "formik";
import { Input } from "antd";
import { get } from "lodash";
import { withTranslation } from "react-i18next";
const ChangeCategoryForm = ({ submitFormChangeCategory, data, t }) => {
  return (
    <div className="pt-12">
      <Formik
        initialValues={{
          category_id: get(data, "id"),
          category_name: get(data, "name"),
        }}
        validate={(values) => {
          const errors = {};
          if (values.category_name.length > 3) {
            errors.category_name = t("Категория имя введен не полностью");
          }
        }}
        onSubmit={(values) => submitFormChangeCategory(values)}
      >
        {({
          isSubmitting,
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="col-md-12">
              <div className="row mt-3">
                <div className="col-md-12">
                  <Input
                    type="text"
                    name="category_name"
                    placeholder={t("Enter Name")}
                    onChange={handleChange}
                    value={values.category_name}
                  />
                </div>
                <span className="text-danger">
                  {errors.category_name &&
                    touched.category_name &&
                    errors.category_name}
                </span>
              </div>

              <div className="row mt-3 mb-3">
                <div className="col-md-12">
                  <button
                    className="btn btn-primary btn-block w-50 float-right"
                    disable={isSubmitting}
                    type="submit"
                  >
                    {t("O'zgartirish")}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default withTranslation("bhm_one")(ChangeCategoryForm);

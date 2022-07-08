import React from "react";
import { Formik } from "formik";
import { Input } from "antd";
import { withTranslation } from "react-i18next";
const CreateCategoryForm = ({ submitForm, t }) => {
  return (
    <div className="pt-12">
      <Formik
        initialValues={{
          category_id: "",
          category_name: "",
        }}
        validate={(values) => {
          const errors = {};
          if (values.category_name.length < 3) {
            errors.category_name = t("Категория имя введен не полностью");
          }
        }}
        onSubmit={(values) => submitForm(values)}
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
                    placeholder="Enter Name"
                    onChange={handleChange}
                    value={values.category_name}
                  />
                </div>
              </div>
              <span className="text-danger">
                {errors.category_name &&
                  touched.category_name &&
                  errors.category_name}
              </span>
              <div className="row mt-3 mb-3">
                <div className="col-md-12">
                  <button
                    className="btn btn-primary btn-block w-50 float-right"
                    disable={values.category_name.length < 3}
                    type="submit"
                  >
                    {t("Yaratish")}
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

export default withTranslation("bhm_one")(CreateCategoryForm);

import TextArea from "antd/lib/input/TextArea";
import { Formik } from "formik";
import React from "react";
import Input from "antd/lib/input";
import Select from "antd/lib/select";
import { withTranslation } from "react-i18next";

const SendSmsForm = ({ t, categories = [], submitForm }) => {
  return (
    <div className="card">
      <Formik
        initialValues={{ category_id: "", files: null, content: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.category_id) {
            errors.category_id = t("Iltimos ID ni kiriting");
          }
          if (values.files === null) {
            errors.content = t("Iltimos Excel faylni kiriting");
          }
          if (!values.content.length) {
            errors.content = t("Iltimos Kontentni kiriting");
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          submitForm(values);
          resetForm({ values: "" });
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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="col-md-12">
              <div className="row mt-3">
                <div className="col-md-12">
                  <Select
                    placeholder={t("Select Category")}
                    name="category_id"
                    value={values.category_id || undefined}
                    onChange={(value) => setFieldValue("category_id", value)}
                    options={categories.map(({ name, id }) => ({
                      label: name,
                      value: id,
                    }))}
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
                <span className="text-danger">
                  {errors.category_id &&
                    touched.category_id &&
                    errors.category_id}
                </span>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <TextArea
                    type="text"
                    className="form-control-md"
                    placeholder={t("Content")}
                    name="content"
                    onChange={handleChange}
                    value={values.content}
                  />
                  <span className="text-danger">
                    {errors.content && touched.content && errors.content}
                  </span>
                </div>
                <div className="col-md-12 ">
                  <div className="float-right">
                    {values.content.length === 0 ? "" : values.content.length}
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <Input
                    type="file"
                    className="form-control-md "
                    name="file"
                    onChange={(e) => {
                      setFieldValue("files", e.currentTarget.files[0]);
                    }}
                  />
                  <span className="text-danger">
                    {errors.files && touched.files && errors.files}
                  </span>
                </div>
              </div>
              <div className="row mt-3 mb-3">
                <div className="col-md-6">
                  <button
                    className="btn bg-primary btn-block w-50"
                    disable={isSubmitting}
                    type="submit"
                  >
                    {t("Jo'natish")}
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

export default withTranslation("bhm_one")(SendSmsForm);

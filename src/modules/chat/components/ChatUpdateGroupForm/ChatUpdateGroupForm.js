import React, { Component } from "react";
import { Formik } from "formik";
import { withTranslation } from "react-i18next";
import get from "lodash/get";

class ChatUpdateGroupForm extends Component {
  render() {
    const {
      handleSubmit = (values, {setSubmitting, setFieldError} ) => {
        console.log("submiting");
      },
      t,
      chat
    } = this.props;
    return (
      <div
        className="d-flex flex pr-md-3 justify-content-center align-items-center flex-column"
        style={{ minHeight: "calc(100% - 60px)" }}
      >
        <Formik
          initialValues={{ title: get(chat,"title") }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = t("Пожалуйста выберите пользователя");
            }
            return errors;
          }}
          onSubmit={(values,actions) => { 
            handleSubmit(values,actions);
            actions.resetForm({
              values: {
                title: ""
              }
            })
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => (
            <form
              className="jumbotron text-center gd-info"
              onSubmit={handleSubmit}
              style={{ width: "35%" }}
            >
              <h2 className="bpm__title mb-5" style={{color:"#fff"}}>Update Chat Name </h2>
              {Object.keys(errors).length > 0 ? (
                <div className="alert alert-danger">
                  {Object.keys(errors).map((key) => {
                    return <div className="alert-error">{errors[key]}</div>;
                  })}
                </div>
              ) : (
                ""
              )}
              <div className="form-group mb-5">
                <input
                  className="form-control"
                  placeholder="Enter name"
                  onChange={(e) => {
                    setFieldValue("title", e.target.value);
                  }}
                  value={values.title}
                  style={{ backgroundColor: "#fff",color:"#000" }}
                />
              </div>
              <button
                type="submit"
                className="btn w-sm mb-1 btn-white"
                disabled={isSubmitting}
              >
                Update
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withTranslation("bhm_one")(ChatUpdateGroupForm);

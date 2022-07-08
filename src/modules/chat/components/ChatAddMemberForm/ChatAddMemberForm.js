import React, { Component } from "react";
import { Formik } from "formik";
import { withTranslation } from "react-i18next";
import { get } from "lodash";
class ChatAddMemberForm extends Component {
  render() {
    const {
      handleSubmit = (values, { setSubmitting, setFieldError }) => {
        console.log("values", values);
        setSubmitting(false);
        setFieldError(false);
      },
      chat_id,
      contacts,
      group,
      t,
    } = this.props;
    const { title } = group;
    return (
      <div
        id="modal-right"
        className="modal fade form-group"
        data-backdrop="true"
        data-class="modal-open-aside"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div
          className="d-flex flex flex-column"
          style={{ minHeight: "100vh", width: "400px", float: "right" }}
        >
          <Formik
            initialValues={{ user_id: "", chat_id }}
            validate={(values) => {
              const errors = {};
              if (!values.user_id) {
                errors.user_id = t("Пожалуйста выберите пользователя");
              }
              return errors;
            }}
            onSubmit={(...props) => {
              handleSubmit(...props);
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
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "100vh",
                }}
              >
                {Object.keys(errors).length > 0 ? (
                  <div
                    className="alert alert-danger gd-danger "
                    style={{ zIndex: "9999" }}
                  >
                    {Object.keys(errors).map((key) => {
                      return <div className="alert-error">{errors[key]}</div>;
                    })}
                  </div>
                ) : (
                  ""
                )}

                <div className="modal-dialog modal-right modal-size">
                  <div className="modal-content h-100 no-radius">
                    <div className="modal-header">
                      <div className="modal-title text-md mode-text-light">ADD GROUP</div>
                      <button className="close mode-text-light" data-dismiss="modal">
                        ×
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="p-4 text-center">
                        <p>Add member to {title} group</p>
                      </div>
                      <select
                        className="form-control"
                        style={{ color: "#000" }}
                        value={values.value}
                        onChange={(e) => {
                          setFieldValue("user_id", e.target.value);
                        }}
                      >
                        {contacts.map((contact) => (
                          <option value={contact.id}>
                            {get(contact, "profile")
                              ? get(contact, "profile.NAME")
                              : get(contact, "phone")}
                          </option>
                        ))}
                      </select>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-light"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="submit"
                          className="btn w-sm mb-1 btn-primary"
                          disabled={isSubmitting}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default withTranslation("bhm_one")(ChatAddMemberForm);

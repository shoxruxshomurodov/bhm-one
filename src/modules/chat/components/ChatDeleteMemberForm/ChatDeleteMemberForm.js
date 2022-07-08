import React, { Component } from "react";
import { Formik } from "formik";
import { withTranslation } from "react-i18next";
class ChatDeleteMemberForm extends Component {
  render() {
    const {
      handleSubmit = (values, { setSubmitting, setFieldError }) => {
        console.log("submiting");
        setSubmitting(false);
      },
      chat_id,
      group,
      t,
    } = this.props;
    const { title, chatMembers } = group;

    return (
      <div
        id="modal-left"
        className="modal fade form-group"
        data-backdrop="true"
        data-class="modal-open-aside"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div
          className="d-flex flex justify-content-center align-items-center flex-column"
          style={{ minHeight: "100vh", width: "400px" }}
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

                <div className="modal-dialog modal-left modal-size">
                  <div className="modal-content h-100 no-radius">
                    <div className="modal-header">
                      <div className="modal-title text-md mode-text-light">DELETE GROUP</div>
                      <button className="close mode-text-light" data-dismiss="modal">
                        ×
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="text-center pb-4">
                        <p>Delete member {title} to group</p>
                      </div>

                      <select
                        className="form-control"
                        value={values.value}
                        onChange={(e) => {
                          setFieldValue("user_id", e.target.value);
                        }}
                        style={{
                          color: "#000",
                          width: "90%",
                          margin: "auto",
                        }}
                      >
                        {chatMembers &&
                          chatMembers.map((member) => (
                            <option value={member.user_id}>
                              {member.profile ?member.profile.name:member.user_id}
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
                          className="btn btn-danger"
                          disabled={isSubmitting}
                        >
                          Delete
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

export default withTranslation("bhm_one")(ChatDeleteMemberForm);

import React, { Component } from "react";
import { Formik } from "formik";
import { withTranslation } from "react-i18next";
import { TweenLite, Power3 } from "gsap";
class ChatCreateGroupForm extends Component {
  constructor(props) {
    super(props);

    this.loadRef = React.createRef();
  }
  componentDidMount() {
    TweenLite.from(this.loadRef, 0.8, {
      opacity: 0,
      x: -200,
      ease: Power3.easeInOut,
    });
  }
  render() {
    const {
      handleSubmit = (values, { setSubmitting, setFieldError }) => {
        console.log("submiting");
      },
      t,
    } = this.props;
    return (
      <div className="w-100 mode-chat-dark">
        <div class="page-hero" id="page-hero">
          <div className="padding d-flex">
            <div class="page-title">
              <h2 className="text-md text-highlight mode-text-dark">Create new group</h2>
              <small class="text-muted">
                Small count and labeling component.
              </small>
            </div>
            <div class="flex"></div>

          </div>
        </div>
        <div style={{ padding: "100px" }}>
          <Formik
            initialValues={{ title: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.title) {
                errors.title = t("Пожалуйста выберите пользователя");
              }
              return errors;
            }}
            onSubmit={(values, actions) => {
              handleSubmit(values, actions);
              actions.resetForm({
                values: {
                  title: "",
                },
              });
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
                className="text-center"
                onSubmit={handleSubmit}
                ref={(el) => (this.loadRef = el)}
              >
                {Object.keys(errors).length > 0 ? (
                  <div className="alert alert-danger">
                    {Object.keys(errors).map((key) => {
                      return <div className="alert-error">{errors[key]}</div>;
                    })}
                  </div>
                ) : (
                  ""
                )}
                <div className="form-group">
                  <input
                    className="form-control w-50"
                    placeholder="Enter name"
                    onChange={(e) => {
                      setFieldValue("title", e.target.value);
                    }}
                    value={values.title}
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      margin: "auto",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-sm  btn-primary cursor-pointer"
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default withTranslation("bhm_one")(ChatCreateGroupForm);

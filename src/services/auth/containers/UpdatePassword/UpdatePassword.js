import { get } from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import UpdatePasswordForm from "../UpdatePassword/UpdatePasswordForm";
import { withRouter } from "react-router";
import Swal from "sweetalert2";
import { request } from "../../../api";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { withTranslation } from "react-i18next";
import { Button, Card, Col, Row } from "antd";
import Hat from "../../../../components/Hat/Hat";
class UpdatePassword extends Component {
  submitForm = (values, { setSubmitting, setFieldError }) => {
    const { password, password_repeat, old_password } = values;
    const { phone, history, t } = this.props;
    request
      .post(`auth/default/change-password`, {
        phone,
        old_password,
        password,
        password_repeat,
      })
      .then((_success) => {
        Swal.fire({
          icon: "success",
          backdrop: "rgba(0,0,0,0.9)",
          background: "none",
          title: t("Сохранять !"),
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            title: "title-color",
          },
        });
        history.push("/home");
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          icon: "error",
          backdrop: "rgba(0,0,0,0.9)",
          background: "none",
          title: message,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            title: "title-color",
          },
        });
        setSubmitting(false);
        setFieldError(false);
      });
  };
  render() {
    const { phone, t } = this.props;
    return (
      <>
        <div class="page-hero" id="page-hero">
          <div class="padding d-flex">
            <div class="page-title">
              <h2 className="text-md text-highlight mode-text-dark">
                {t(" Изменить пароль")}
              </h2>
              <small class="text-muted">
                {t("Small count and labeling component.")}
              </small>
            </div>
            <div class="flex"></div>
            <div>
              <Link to="/home">
                <Button icon={<ArrowLeftOutlined className="vertical-none" />}>
                  {t("Back")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="w-auto-sm mx-auto py-5">
            <div className="card">
              <div className="card-header">
                <h3> {t("Изменить пароль")}</h3>
              </div>
              <div className="card-body">
                <UpdatePasswordForm
                  phone={phone}
                  t={t}
                  submitForm={this.submitForm}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    phone: get(state, "auth.user.phone"),
  };
};

export default connect(
  mapStateToProps,
  null
)(withTranslation("bhm_one")(withRouter(UpdatePassword)));

import React, { Component } from "react";
import { request } from "../../../api";
import actions from "../../actions";
import get from "lodash/get";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import isEqual from "lodash/isEqual";
import LoginForm from "./LoginForm";

class Login extends Component {
  state = {
    phone: null,
    password: null,
    token: null,
    isFetchedLogin: false,
    isFetchedResetPassword: false,
    resetPasswordToken: null
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      !isEqual(prevState.isFetchedLogin, this.state.isFetchedLogin) &&
      !isEqual(prevState.phone, this.state.phone) &&
      !isEqual(prevState.password, this.state.password) &&
      !isEqual(prevState.token, this.state.token)
    ) {
      const { token } = this.state;
      const { loginByToken } = this.props;
      loginByToken(token);
    }

    if (!isEqual(prevProps.isFetched, get(this.props, "isFetched"))) {
      if (this.props.isFetched) {
        const { history } = this.props;
        history.push("/home");
      }
    }
    if (
      !isEqual(
        prevState.isFetchedResetPassword,
        get(this.state, "isFetchedResetPassword")
      )
    ) {
      const { resetPasswordToken, isFetchedResetPassword } = this.state;
      if (isFetchedResetPassword) {
        const { history } = this.props;
        history.push(`/auth/approve/${resetPasswordToken.token}`);
      }
    }
  }

  submitForm = (values, { setSubmitting, setFieldError }) => {
    const { history } = this.props;
    let _request = request.post("auth/default/login", {
      ...values
    });
    _request
      .then((success) => {
        const { data } = success;
        this.setState({
          ...this.state,
          ...values,
          token: data,
          password: values.password,
          isFetchedLogin: true
        });
        history.push(`/home`);
      })
      .catch((error) => {
        const data = error.response.data;
        data.map((item) => {
          return setFieldError("password", item.message);
        });
        setSubmitting(false);
      });
  };

  resetForm = () => {
    const { phone } = this.props;
    let _request = request.post("auth/default/reset-password", {
      phone
    });
    _request
      .then((success) => {
        const { data } = success;
        this.setState({
          ...this.state,
          resetPasswordToken: data,
          isFetchedResetPassword: true
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { phone } = this.props;
    return (
        <LoginForm
            phone={phone}
            submitForm={this.submitForm}
            resetForm={this.resetForm}
        />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginByToken: (token) => {
      dispatch({
        type: actions.LOGIN_BY_TOKEN.REQUEST,
        payload: { token }
      });
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    isAuthenticated: get(state.auth, "isAuthenticated", false),
    isFetched: get(state.auth, "isFetched", false)
  };
};

export default withTranslation("bhm_one")(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
);

import React, { Component } from "react";
import Actions from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import LoginOrSignUpForm from "./LoginOrSignUpForm";
import { get, isEqual } from "lodash";
import Normalizer from "../../../normalizr";
import TokenScheme from "../../../../schema/Token";
import UserScheme from "../../../../schema/User";
import Utils from "../../../helpers/Utils";
import { info,sign } from "../../../certWs";
class LoginOrSignUp extends Component {
  state = {
    activeKey: true,
  };
  loginOrSignUp = (phone, formMethods) => {
    const { loginOrSignUpDispatch } = this.props;
    loginOrSignUpDispatch(phone, formMethods);
  };
  CertSignIn = () => {
    const { certSignIn } = this.props;
    sign("authWithKey",certSignIn)
    this.closeInterval();
  };
  initInterVal = () => {
    document.wsInitKey = setInterval(() => {
      this.keyListener();
    }, 8000);
  };

  changeActiveKeyState = (state) => {
    this.setState({activeKey:state})
  }
  closeInterval = () => {
    clearInterval(document.wsInitKey);
    this.changeActiveKeyState(false)
  }
  keyListener = () => {
    info(() => {},false,this.closeInterval);
  };

  componentDidMount() {
    this.keyListener();
    this.initInterVal();
  }
  componentWillUnmount() {
    clearInterval(document.wsInitKey);
    this.changeActiveKeyState(true)
  }

  componentDidUpdate(prevProps) {
    const {
      isFetchedToken,
      isFetchedUser,
      userId,
      tokenId,
      history,
      entities,
      certId,
      isFetchedCert,
      loginByToken
    } = this.props;
    const { isFetchedCert: prevIsFetchedCert } = prevProps;
    if (
      !Utils.isEqualsArrsAttr(prevProps, this.props, [
        "isFetchedToken",
        "tokenId"
      ]) &&
      isFetchedToken
    ) {
      const token = Normalizer.Denormalize(tokenId, TokenScheme, entities);
      history.push(`/auth/approve/${get(token, "token")}`);
    }
    if (
      !Utils.isEqualsArrsAttr(prevProps, this.props, [
        "isFetchedUser",
        "userId"
      ]) &&
      isFetchedUser
    ) {
      const user = Normalizer.Denormalize(userId, UserScheme, entities);
      history.push(`/auth/login/${btoa(get(user, "phone"))}`);
    }
    if (!isEqual(prevIsFetchedCert, isFetchedCert)) {
      const token = Normalizer.Denormalize(certId, TokenScheme, entities);
      loginByToken(token);
      history.push("/home");
    }
  }

  render() {
    const { activeKey } = this.state;
    return (
      <>
        <h4>Вход или регистрация</h4>
        <LoginOrSignUpForm
          activeKey={activeKey}
          CertSignIn={this.CertSignIn}
          loginOrSignUp={this.loginOrSignUp}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    isFetchedToken: get(state, "normalize.data.get-token.isFetched", false),
    isFetchedUser: get(state, "normalize.data.get-user.isFetched", false),
    tokenId: get(state, "normalize.data.get-token.result", null),
    userId: get(state, "normalize.data.get-user.result", null),
    certId: get(state, "normalize.data.cert-sign.result", []),
    isFetchedCert: get(state, "normalize.data.cert-sign.isFetched", false),
    entities: get(state, "normalize.entities", [])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginOrSignUpDispatch: (phone, formMethods) => {
      dispatch({
        type: Actions.LOGIN_OR_SIGN_UP.REQUEST,
        payload: { phone, formMethods }
      });
    },
    certSignIn: (certinfo,signedMsg) => {
      dispatch({
        type: Actions.CERT_SIGN.REQUEST,
        payload: { certinfo,signedMsg }
      });
    },
    loginByToken: (token) => {
      dispatch({
        type: Actions.LOGIN_BY_TOKEN.REQUEST,
        payload: { token }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginOrSignUp));

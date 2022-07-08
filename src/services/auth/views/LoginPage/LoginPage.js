import React, { Component } from "react";
import Login from "../../containers/Login/Login";

class LoginPage extends Component {
  render() {
    const { phone } = this.props.match.params;
    return <Login phone={atob(phone)} />;
  }
}

export default LoginPage;

import React, { Component } from "react";
import { withRouter } from "react-router";
import Monitoring from "./../../../../container/Respublic/Monitoring";
class index extends Component {
  render() {
    const { address } = this.props.match.params;
    return <Monitoring address={address} />;
  }
}

export default withRouter(index);

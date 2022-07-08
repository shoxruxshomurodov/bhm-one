import React, { Component } from "react";
import { withRouter } from "react-router";
import Judges from "../../../../container/Respublic/Judges";
class index extends Component {
  render() {
    const { address } = this.props.match.params;
    return <Judges address={address} />;
  }
}

export default withRouter(index);

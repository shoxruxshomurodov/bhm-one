import React, { Component } from "react";
import Approve from "../../containers/Approve/Approve";

class ApprovePage extends Component {
  render() {
    const { token } = this.props.match.params;
    return <Approve token={token} />;
  }
}

export default ApprovePage;

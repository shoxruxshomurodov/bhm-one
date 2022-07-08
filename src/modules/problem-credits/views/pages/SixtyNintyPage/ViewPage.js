import React, { Component } from "react";
import View from "../../../container/SixtyNinty/components/View";
import { withRouter } from "react-router";
class ViewPage extends Component {
  render() {
    const { loan_id } = this.props.match.params;
    return <View loan_id={loan_id} />;
  }
}

export default withRouter(ViewPage);

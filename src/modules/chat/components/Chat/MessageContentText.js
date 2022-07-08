import React, { Component } from "react";
import * as PropTypes from "prop-types";
class MessageContentText extends Component {
  render() {
    const { text} = this.props;
    return (
      <div
        className=
          "chat-content rounded msg bg-body mode-dark"
      >
        {text}
      </div>
    );
  }
}

MessageContentText.propTypes = {
  text: PropTypes.string.isRequired,
};
export default MessageContentText;

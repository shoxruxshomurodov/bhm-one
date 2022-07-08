import React, { Component } from "react";
import * as PropTypes from "prop-types";
class Chat extends Component {
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <div className="d-flex flex pr-md-3" id="content-body">
          <div
            className="d-flex flex-column flex card m-0 mb-md-3 mode-chat-dark"
            id="chat-list"
            data-plugin="chat"
          >
            {children}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Chat.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Chat;

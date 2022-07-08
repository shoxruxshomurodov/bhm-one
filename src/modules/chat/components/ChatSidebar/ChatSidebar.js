import React, { Component } from "react";
import * as PropTypes from "prop-types";
class ChatSidebar extends Component {
  render() {
    const { children} = this.props;
    return (
      <React.Fragment>
        <div className="aside aside-sm" id="content-aside">
          <div
            className=
              "d-flex flex-column w-xl modal-dialog bg-body mode-dark"
            id="chat-nav"
          >
            {children}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ChatSidebar.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ChatSidebar;

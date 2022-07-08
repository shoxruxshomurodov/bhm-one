import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import * as PropTypes from "prop-types";
class Message extends Component {
  render() {
    const {
      children,
      isOwn = false,
      // userLink,
      // userImage,
      userTitle,
      createdAt,
    } = this.props;
    return (
      <div
        className="chat-item"
        style={{ marginTop: "1.5rem" }}
        data-class={isOwn ? "alt" : ""}
      >
        <Link to="#" className="avatar w-40 mode-avatar-dark ">
          {userTitle}
        </Link>
        <div className="chat-body">
          {" "}
          {children}
          <div className="chat-date date">
            {" "}
            {moment.unix(createdAt).calendar()}
          </div>
        </div>
      </div>
    );
  }
}
Message.propTypes = {
  children: PropTypes.element.isRequired,
  isOwn: PropTypes.bool.isRequired,
  userLink: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  userTitle: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
};

export default Message;

import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { get, isEqual } from "lodash";
class ChatContactItem extends Component {
  render() {
    let {
      // chatImgSrc,
      // chatImgTitle,
      isOnline,
      chatName,
      chatDescription,
      newMsgCount,
      contactUrl,
      chatUrl,
      chatType,
      interlocutor,
    } = this.props;
    return (
      <React.Fragment>
        <div className="list-item">
          <div>
            <span
              className={isOnline ? "avatar-status on" : "avatar-status on"}
            />
          </div>
          <div>
            <Link to={contactUrl}>
              <span
                className={
                  isEqual(chatType, 1)
                    ? "w-40 avatar gd-info"
                    : "w-40 avatar gd-warning"
                }
              >
                {/* <img src={chatImgSrc} alt={chatImgTitle}/> */}
                {get(interlocutor, "profile")
                  ? get(interlocutor, "profile.NAME")
                      .split(" ")[0][0]
                      .toUpperCase() +
                    get(interlocutor, "profile.NAME")
                      .split(" ")[1][0]
                      .toUpperCase()
                  : chatName.split(" ")[0][0].toUpperCase()}
              </span>
            </Link>
          </div>
          <div className="flex">
            <Link
              to={
                isEqual(chatType, 1)
                  ? `/chat/interlocutor/${get(interlocutor, "id")}`
                  : `/chat/group/${chatUrl}`
              }
              className=
                "item-author text-color mode-text-dark"
               
            >
              {get(interlocutor, "profile")
                ? get(interlocutor, "profile.NAME")
                : interlocutor
                ? get(interlocutor, "phone")
                : chatName}
            </Link>
            <div className="item-except text-muted text-sm h-1x d-none">
              {chatDescription}
            </div>
          </div>
          {newMsgCount && (
            <div>
              <span className="item-amount d-none d-sm-block badge badge-pill gd-warning">
                {newMsgCount}
              </span>
            </div>
          )}
          <div />
        </div>
      </React.Fragment>
    );
  }
}

ChatContactItem.propTypes = {
  chatImg: PropTypes.string,
  chatImgTitle: PropTypes.string,
  isOnline: PropTypes.bool.isRequired,
  chatName: PropTypes.string.isRequired,
  chatDescription: PropTypes.string,
  newMsgCount: PropTypes.number.isRequired,
  contactUrl: PropTypes.string.isRequired,
  chatUrl: PropTypes.string.isRequired,
};

export default ChatContactItem;

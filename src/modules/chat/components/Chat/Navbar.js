import React, { Component } from "react";
import { get } from "lodash";
import * as PropTypes from "prop-types";
import { FiUserPlus, FiUserMinus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import ChatDeleteMember from "../../containers/ChatDeleteMember/ChatDeleteMember";
import ChatAddMember from "../../containers/ChatAddMember/ChatAddMember";
import 'bootstrap/dist/js/bootstrap.js';
class Navbar extends Component {
  handleClick = () => {
    const { handleDeleteGroup, chat_id } = this.props;
    handleDeleteGroup(chat_id);
  };
  handleDeleteContact = () => {
    const { handleDeleteInterlocutor,user_id } = this.props;
    handleDeleteInterlocutor(user_id);
  };
  render() {
    let {
      title,
      chat_id,
      user_id,
      members = [],
      // memberImageProp = "image.src",
      // memberTitleProp = "image.title",
      interlocutorChat,
    } = this.props;
    return (
      <div className="navbar flex-nowrap b-b">
        <button
          data-toggle="modal"
          data-target="#content-aside"
          data-modal=""
          className="d-md-none btn btn-sm btn-icon no-bg"
        >
          <span>
            <i data-feather="menu" />
          </span>
        </button>
        <span className="text-ellipsis d-flex align-items-center mr-2">
          <span className="text-md text-highlight mr-2">
            {get(interlocutorChat, "profile")
              ? get(interlocutorChat, "profile.NAME")
              : interlocutorChat
              ? get(interlocutorChat, "phone")
              : title}
          </span>
          {chat_id && (
            <Link
              to={`/chat/group/${chat_id}/update`}
              onClick={this.update}
              className="w-24 avatar circle gd-primary mr-1 border-none"
              style={{ boxShadow: "none" }}
            >
              <FiEdit2 />
            </Link>
          )}
          {chat_id && (
            <button
              onClick={this.handleClick}
              className="w-24 avatar circle gd-danger mr-1 border-none"
              style={{ boxShadow: "none" }}
            >
              <FiTrash2 />
            </button>
          )}
          {user_id && (
            <button
              onClick={this.handleDeleteContact}
              className="w-24 avatar circle bg-danger mr-1 border-none"
              style={{ boxShadow: "none" }}
            >
              <FiTrash2 />
            </button>
          )}
        </span>
        {members.map((member) => {
          return (
            <div className="avatar-group">
              <Link
                to={`/chat/interlocutor/${member.user_id}`}
                className="w-24 avatar circle bg-success-lt border-none "
              >
                <span class="avatar-status b-white avatar-top on"></span>
                {member.user_id}
              </Link>
            </div>
          );
        })}
        <span className="flex" />
        <div>
          {chat_id && (
            <div className="d-flex flex-wrap align-items-center avatar-group">
              <button
                className="w-24 avatar circle  gd-primary border-none"
                data-toggle="modal"
                type="button"
                data-target="#modal-right"
                data-toggle-class="modal-open-aside"
              >
                <FiUserPlus />
              </button>
              <button
                className="w-24 avatar circle gd-danger border-none"
                data-toggle="modal"
                data-target="#modal-left"
                data-toggle-class="modal-open-aside"
              >
                <FiUserMinus />
              </button>
              <ChatDeleteMember chat_id={chat_id} />
              <ChatAddMember chat_id={chat_id} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired,
  memberImageProp: PropTypes.string.isRequired,
  memberTitleProp: PropTypes.string.isRequired,
  chat_id: PropTypes.number.isRequired,
};

export default Navbar;

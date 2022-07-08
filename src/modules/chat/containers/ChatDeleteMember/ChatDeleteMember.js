import React, { Component } from "react";
import get from "lodash/get";
import { connect } from "react-redux";
import actions from "../../actions";
// import ChatSidebar from "../../components/ChatSidebar/ChatSidebar";
// import NavBarSidebar from "../../components/ChatSidebar/NavBar";
// import ChatContactList from "../../components/ChatSidebar/ChatContactList";
// import ChatContactItem from "../../components/ChatSidebar/ChatContactItem";
import ChatDeleteMemberForm from "../../components/ChatDeleteMemberForm/ChatDeleteMemberForm";
import { withRouter } from "react-router";
import isEqual from "lodash/isEqual";
import Normalizer from "../../../../services/normalizr";
import ChatScheme from "../../../../schema/Chat";
class ChatDeleteMember extends Component {
  handleSubmit = (values, { setSubmitting, setFieldError }) => {
    const { deleteMember } = this.props;
    deleteMember({ ...values, setSubmitting, setFieldError });
  };

  componentDidUpdate(oldProps, oldState) {
    const { isFetched, getChatGroup } = this.props;
    const { isFetched: isFetchedOld } = oldProps;
    const { history, chat_id } = this.props;
    if (!isEqual(isFetched, isFetchedOld) && isFetched === true) {
      getChatGroup({ chat_id });
      history.push(`/chat/group/${chat_id}`);
    }
  }
  componentDidMount() {
    const { getAllChats, getChatGroup, chat_id } = this.props;
    getAllChats();
    getChatGroup({ chat_id });
  }

  render() {
    let { group, chat_id, isFetched, chats, entities } = this.props;
    chats = Normalizer.Denormalize(chats, [ChatScheme], entities);
    return (
      <>
        {/* <div
          className="d-flex flex fixed-content"
          style={{ background: "#fff" }}
        >
          (
          <ChatSidebar>
            <NavBarSidebar />
            <ChatContactList contacts={chats}>
              {({ contact }) => (
                <ChatContactItem
                  chatName={contact.title}
                  chatUrl={contact.id}
                />
              )}
            </ChatContactList>
          </ChatSidebar>
        </div> */}
        <ChatDeleteMemberForm
          group={group}
          chat_id={chat_id}
          handleSubmit={this.handleSubmit}
          isFetched={isFetched}
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllChats: () => {
      dispatch({ type: actions.GET_ALL_CHATS.REQUEST });
    },
    getChatGroup: ({ chat_id }) => {
      dispatch({ type: actions.GET_CHAT_GROUP.REQUEST, payload: { chat_id } });
    },
    deleteMember: ({ chat_id, user_id, setSubmitting, setFieldError }) => {
      dispatch({
        type: actions.DELETE_MEMBER_GROUP.REQUEST,
        payload: { chat_id, user_id, setSubmitting, setFieldError },
      });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    chats: get(state, "normalize.data.get-chat.result.data", []),
    entities: get(state, "normalize.entities", {}),
    group: get(state.chat, "group", {}),
    isFetched: get(state.chat, "deleteMemberGroup.isFetched", false),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChatDeleteMember));

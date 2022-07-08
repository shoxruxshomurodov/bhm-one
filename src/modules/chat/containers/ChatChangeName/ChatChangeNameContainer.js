import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import actions from "../../actions";
import ChatSidebar from "../../components/ChatSidebar/ChatSidebar";
import NavBarSidebar from "../../components/ChatSidebar/NavBar";
import ChatContactList from "../../components/ChatSidebar/ChatContactList";
import ChatContactItem from "../../components/ChatSidebar/ChatContactItem";
import ChatUpdateGroupForm from "../../components/ChatUpdateGroupForm/ChatUpdateGroupForm";
import isEqual from "lodash/isEqual";
import { withRouter } from "react-router";
import Loader from "../../../../components/Loader/LoaderMessage";
import Normalizer from "../../../../services/normalizr";
import ChatScheme from "../../../../schema/Chat";
class ChatChangeNameContainer extends Component {
  handleSubmit = (values) => {
    const { changeChatGroupTitle, chat_id } = this.props;
    console.log("values", values);
    changeChatGroupTitle({ ...values, chat_id });
  };
  componentDidMount() {
    const { chat_id, getChatById, getAllChats } = this.props;
    getChatById({ chat_id });
    getAllChats();
  }

  componentDidUpdate(oldProps, oldState) {
    const { isFetchedDeleted } = this.props;
    const { isFetchedDeleted: isFetchedDeletedOld } = oldProps;
    const { history, chat_id } = this.props;
    if (
      !isEqual(isFetchedDeleted, isFetchedDeletedOld) &&
      isFetchedDeleted === true
    ) {
      history.push(`/chat/group/${chat_id}`);
    }
  }

  render() {
    let { chats, isFetched, group: chat, entities } = this.props;
    chats = Normalizer.Denormalize(chats, [ChatScheme], entities);
    return (
      <>
        <div className="d-flex flex fixed-content">
          <ChatSidebar>
            <NavBarSidebar />
            <ChatContactList contacts={chats}>
              {({ contact }) => (
                <ChatContactItem
                  chatName={contact.title}
                  chatUrl={contact.id}
                  chatType={contact.type}
                  interlocutor={get(contact, 'interlocutor')}
                />
              )}
            </ChatContactList>
          </ChatSidebar>
          {isFetched ? (
            <ChatUpdateGroupForm handleSubmit={this.handleSubmit} chat={chat} />
          ) : (
            <Loader />
          )}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllChats: () => {
      dispatch({ type: actions.GET_ALL_CHATS.REQUEST });
    },
    getChatById: ({ chat_id }) => {
      dispatch({ type: actions.GET_CHAT_GROUP.REQUEST, payload: { chat_id } });
    },
    changeChatGroupTitle: ({ chat_id, title }) => {
      dispatch({
        type: actions.CHANGE_CHAT_GROUP_TITLE.REQUEST,
        payload: { chat_id, title },
      });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    chats: get(state, "normalize.data.get-chat.result.data", []),
    entities: get(state, "normalize.entities", {}),
    group: get(state, "chat.group", {}),
    isFetchedDeleted: get(state, "chat.isFetched", false),
    isFetched: get(state, "normalize.data.get-chat.isFetched", false),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChatChangeNameContainer));

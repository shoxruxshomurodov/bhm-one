import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import orderBy from "lodash/orderBy";
import ChatSidebar from "../../components/ChatSidebar/ChatSidebar";
import Chat from "../../components/Chat/Chat";
import NavbarChat from "../../components/Chat/Navbar";
import Messages from "../../components/Chat/Messages";
import MessageForm from "../../components/Chat/MessageForm";
import NavBarSidebar from "../../components/ChatSidebar/NavBar";
import ChatContactList from "../../components/ChatSidebar/ChatContactList";
import ChatContactItem from "../../components/ChatSidebar/ChatContactItem";
import { withRouter } from "react-router";
import Normalizer from "../../../../services/normalizr";
import ChatScheme from "../../../../schema/Chat";
class ChatInterlocutor extends Component {
  handleSubmitMessage = (values) => {
    const { createInterlocutorMessage, user_id } = this.props;
    createInterlocutorMessage({ ...values, user_id });
  };

  fetchMoreMessages = () => {
    const { meta, getInterlocutorMsgs, user_id } = this.props;
    const { nextPage } = meta;
    setTimeout(() => {
      getInterlocutorMsgs({
        user_id,
        params: {
          page: nextPage,
        },
      });
    }, 500);
  };

  handleDeleteInterlocutor = (user_id) => {
    const { deleteInterlocutorChat } = this.props;
    deleteInterlocutorChat({ user_id });
  };

  componentDidMount() {
    const {
      getAllChats,
      getInterlocutorMsgsClear,
      user_id,
      getInterlocutorChat,
    } = this.props;
    const clear = true;
    getAllChats();
    getInterlocutorMsgsClear({ user_id, clear });
    getInterlocutorChat({ user_id, clear });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const clear = true;
    const {
      getAllChats,
      getInterlocutorMsgs,
      getInterlocutorChat,
      meta,
    } = this.props;
    const { nextPage } = meta;
    const { user_id: oldUserId } = prevProps;
    const { user_id } = this.props;
    if (!isEqual(oldUserId, user_id) && user_id) {
      getAllChats();
      setTimeout(() => {
        getInterlocutorMsgs({
          user_id,
          clear,
          params: {
            page: nextPage,
          },
        });
      }, 500);
      getInterlocutorChat({ user_id, clear });
    }

    const { isDeleted } = this.props;
    const { isDeleted: isDeletedOld } = prevProps;
    if (!isEqual(isDeleted, isDeletedOld) && isDeleted === true) {
      const { history } = this.props;
      history.push(`/chat/`);
    }
  }

  render() {
    let {
      chats,
      chat_id,
      messages,
      isFetched,
      meta,
      user_id,
      user,
      interlocutorChat,
      entities,
    } = this.props;
    const { loadMore = false, pageSize: count = 0 } = meta;
    messages = orderBy(messages, ["created_at"], ["asc"]);
    chats = Normalizer.Denormalize(chats, [ChatScheme], entities);

    return (
      <React.Fragment>
        <ChatSidebar>
          <NavBarSidebar />
          <ChatContactList contacts={chats}>
            {({ contact }) => (
              <ChatContactItem
                chatName={contact.title}
                chatUrl={contact.id}
                chatType={contact.type}
                interlocutor={get(contact, "interlocutor")}
              />
            )}
          </ChatContactList>
        </ChatSidebar>
        <Chat>
          <NavbarChat
            title={user_id}
            handleDeleteGroup={this.handleDeleteGroup}
            handleDeleteInterlocutor={this.handleDeleteInterlocutor}
            interlocutorChat={interlocutorChat}
            user_id={user_id}
          />
          <Messages
            messages={messages}
            isFetched={isFetched}
            loadMore={loadMore}
            count={count}
            fetchMoreMessages={(values) => this.fetchMoreMessages(values)}
            user={user}
          />
          <MessageForm
            chat_id={chat_id}
            handleSubmitMessage={this.handleSubmitMessage}
          />
        </Chat>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllChats: () => {
      dispatch({ type: actions.GET_ALL_CHATS.REQUEST });
    },

    deleteInterlocutorChat: ({ user_id }) => {
      dispatch({
        type: actions.DELETE_INTERLOCUTOR_CHAT.REQUEST,
        payload: {
          user_id,
        },
      });
    },

    createInterlocutorMessage: ({ user_id, message }) => {
      dispatch({
        type: actions.CREATE_INTERLOCUTOR_MESSAGE.REQUEST,
        payload: { user_id, message },
      });
    },

    getInterlocutorMsgs: ({ user_id, params, clear }) => {
      dispatch({
        type: actions.GET_INTERLOCUTOR_MESSAGES.REQUEST,
        payload: { user_id, params, clear },
      });
    },

    getInterlocutorMsgsClear: ({ user_id, clear, params }) => {
      dispatch({
        type: actions.GET_INTERLOCUTOR_MESSAGES.REQUEST,
        payload: { user_id, clear, params },
      });
    },
    getInterlocutorChat: ({ user_id, clear }) => {
      dispatch({
        type: actions.GET_INTERLOCUTOR_CHAT.REQUEST,
        payload: { user_id, clear },
      });
    },
  };
};

const mapStateToProps = (state, oldProps) => {
  const { user_id: chat_id, user_id } = oldProps;
  const result = {
    chats: get(state, "normalize.data.get-chat.result.data", []),
    messages: get(state, `chat.interlocutorMsgs.${chat_id}.result.data`, []),
    isFetched: get(state, `normalize.data.${chat_id}.isFetched`, false),
    meta: get(state, `chat.interlocutorMsgs.${chat_id}.result._meta`, {}),
    entities: get(state, "normalize.entities", {}),
    isDeleted: get(
      state,
      `chat.deleteInterlocutor.${user_id}.isFetched`,
      false
    ),
    user: get(state, `auth.user`, {}),
    interlocutorChat: get(state, `chat.interlocutorChat.${user_id}.info`, {}),
  };
  return result;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChatInterlocutor));

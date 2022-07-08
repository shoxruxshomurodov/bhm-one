import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../actions";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
import ChatSidebar from "../../components/ChatSidebar/ChatSidebar";
import Chat from "../../components/Chat/Chat";
import NavbarChat from "../../components/Chat/Navbar";
import Messages from "../../components/Chat/Messages";
import MessageForm from "../../components/Chat/MessageForm";
import NavBarSidebar from "../../components/ChatSidebar/NavBar";
import ChatContactList from "../../components/ChatSidebar/ChatContactList";
import ChatContactItem from "../../components/ChatSidebar/ChatContactItem";
import { withRouter } from "react-router";
import ChatScheme from "../../../../schema/Chat";
import Normalizer from "../../../../services/normalizr";
class ChatContainer extends Component {
  handleSubmitMessage = (values) => {
    const { createChatMessage, chat_id } = this.props;
    createChatMessage({ ...values, chat_id });
  };

  fetchMoreMessages = () => {
    const { meta, getMessagesByChat, chat_id } = this.props;
    const { nextPage } = meta;
    getMessagesByChat({
      chat_id,
      params: {
        page: nextPage,
      },
    });
  };

  handleDeleteGroup = (chat_id) => {
    const { deleteGroup } = this.props;
    deleteGroup({ chat_id });
  };

  handleDeleteInterlocutor = (user_id) => {
    const { handleDeleteInterlocutor } = this.props;
    handleDeleteInterlocutor({ user_id });
  };
  componentDidMount() {
    const {
      getAllChats,
      getChatGroup,
      getMessagesByChatClear,
      chat_id,
    } = this.props;
    const clear = true;
    getAllChats();
    getChatGroup({ chat_id });
    getMessagesByChatClear({ chat_id, clear });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { getChatGroup, getMessagesByChat, chat_id } = this.props;
    if (!isEqual(prevProps.chat_id, this.props.chat_id)) {
      getChatGroup({ chat_id });
      getMessagesByChat({ chat_id });
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
      group,
      chat_id,
      messages,
      isFetched,
      meta,
      user,
      entities
    } = this.props;
    const { loadMore = false, pageSize: count = 0 } = meta;
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
            title={group.title}
            chat_id={chat_id}
            members={group.chatMembers}
            handleDeleteGroup={this.handleDeleteGroup}
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
    getChatGroup: ({ chat_id }) => {
      dispatch({ type: actions.GET_CHAT_GROUP.REQUEST, payload: { chat_id } });
    },
    createChatMessage: ({ chat_id, message }) => {
      dispatch({
        type: actions.CREATE_CHAT_MESSAGE.REQUEST,
        payload: { chat_id, message },
      });
    },
    deleteGroup: ({ chat_id }) => {
      dispatch({
        type: actions.DELETE_GROUP.REQUEST,
        payload: {
          chat_id,
        },
      });
    },
    getMessagesByChat: ({ chat_id, params }) => {
      dispatch({
        type: actions.GET_MESSAGES_BY_CHAT.REQUEST,
        payload: { chat_id, params },
      });
    },
    getMessagesByChatClear: ({ chat_id, clear, params }) => {
      dispatch({
        type: actions.GET_MESSAGES_BY_CHAT.REQUEST,
        payload: { chat_id, clear, params },
      });
    },
  };
};

const mapStateToProps = (state, oldProps) => {
  const { chat_id } = oldProps;
  const result = {
    chats: get(state, "normalize.data.get-chat.result.data", []),
    entities: get(state, "normalize.entities", {}),
    group: get(state, "chat.group", {}),
    isFetched: get(state, `chat.messages.${chat_id}.isFetched`, false),
    messages: get(state, `chat.messages.${chat_id}.result.data`, []),
    meta: get(state, `chat.messages.${chat_id}.result._meta`, {}),
    isDeleted: get(state, `chat.deleteGroup.${chat_id}.isFetched`, false),
    user: get(state, `auth.user`, {}),
  };
  return result;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChatContainer));

import React, { Component } from "react";
import get from "lodash/get";
import { connect } from "react-redux";
import actions from "../../actions";
import ChatSidebar from "../../components/ChatSidebar/ChatSidebar";
import NavBarSidebar from "../../components/ChatSidebar/NavBar";
import ChatContactList from "../../components/ChatSidebar/ChatContactList";
import ChatContactItem from "../../components/ChatSidebar/ChatContactItem";
import ChatAddMemberForm from "../../components/ChatAddMemberForm/ChatAddMemberForm";
import { withRouter } from "react-router";
import isEqual from "lodash/isEqual";
import Normalizer from "../../../../services/normalizr";
import ChatScheme from "../../../../schema/Chat";
class ChatAddMember extends Component {
  handleSubmit = (values, { setSubmitting, setFieldError }) => {
    const { addMember } = this.props;
    addMember({ ...values, setSubmitting, setFieldError });
  };

  componentDidUpdate(oldProps, oldState) {
    const { isFetched, getChatGroup } = this.props;
    const { isFetched: isFetchedOld } = oldProps;
    const { history, chat_id } = this.props;
    if (!isEqual(isFetched, isFetchedOld) && isFetched === true) {
      history.push(`/chat/group/${chat_id}`);
      getChatGroup({ chat_id });
    }
  }

  componentDidMount() {
    const { getAllContacts, getAllChats, getChatGroup, chat_id } = this.props;
    const clear = true;
    getAllContacts({ clear, params: { "per-page": 150 } });
    getAllChats();
    getChatGroup({ chat_id });
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    let { group, contacts, chat_id, entities,chats } = this.props;
    chats = Normalizer.Denormalize(chats, [ChatScheme], entities);
    return (
      <>
        {/* <div
          className="d-flex flex fixed-content"
          style={{ background: "#fff" }}
        >
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
          
        </div> */}
        <ChatAddMemberForm
          group={group}
          contacts={contacts}
          chat_id={chat_id}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllContacts: ({ clear, params }) => {
      dispatch({
        type: actions.GET_ALL_CONTACTS.REQUEST,
        payload: { clear, params },
      });
    },
    getAllChats: () => {
      dispatch({ type: actions.GET_ALL_CHATS.REQUEST });
    },
    getChatGroup: ({ chat_id }) => {
      dispatch({ type: actions.GET_CHAT_GROUP.REQUEST, payload: { chat_id } });
    },
    addMember: ({ chat_id, user_id, setSubmitting, setFieldError }) => {
      dispatch({
        type: actions.ADD_MEMBER_GROUP.REQUEST,
        payload: { chat_id, user_id, setSubmitting, setFieldError },
      });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    chats: get(state, "normalize.data.get-chat.result.data", []),
    contacts: get(state, "chat.contact.data", []),
    entities: get(state, "normalize.entities", {}),
    group: get(state, "chat.group", {}),
    isFetched: get(state, "normalize.data.addMemberGroup.isFetched", false),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChatAddMember)
);

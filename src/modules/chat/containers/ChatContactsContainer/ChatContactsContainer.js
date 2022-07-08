import React, { Component } from "react";
import { get } from "lodash";
import { connect } from "react-redux";
import actions from "../../actions";
import ChatSidebar from "../../components/ChatSidebar/ChatSidebar";
import NavBarSidebar from "../../components/ChatSidebar/NavBar";
import ChatContactList from "../../components/ChatSidebar/ChatContactList";
import ChatContactItem from "../../components/ChatSidebar/ChatContactItem";
import ChatContactsForm from "../../components/ChatContactsForm/ChatContactsForm";
import { withRouter } from "react-router";
import Normalizer from "../../../../services/normalizr";
import ChatScheme from "../../../../schema/Chat";
class ChatContactsContainer extends Component {
  state = {
    name:""
  }
  fetchMoreMessages = () => {
    const { meta, getAllContacts } = this.props;
    const {name} = this.state;
    const { nextPage } = meta;
    console.log(nextPage)
    getAllContacts({
      params: {
        page: nextPage,
        test: "test"
      },
      name
    });
  };

  componentDidMount() {
    const { getAllChats, getAllContactsClear } = this.props;
    const { meta, getAllContacts } = this.props;
    const { nextPage } = meta;
    getAllChats();
    getAllContacts({
      params: {
        page: nextPage
      }
    });
    const clear = true;
    getAllContactsClear(clear);
  }

  handleSubmit = (name)=>{
    this.setState({name})
    this.setState({test:"test"})
    const {  getAllContacts } = this.props;
    const {  test } = this.props;
    const { nextPage } = 0;
    return getAllContacts({params: {
       page: nextPage,
        test
     },
     name
   })
  }
  render() {
    let { chats, contacts, meta, isFetched, entities } = this.props;
    chats = Normalizer.Denormalize(chats, [ChatScheme], entities);
    const { loadMore, pageCount } = meta;
    console.log(meta);
    return (
      <div className="d-flex flex fixed-content" style={{ background: "#fff" }}>
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
        <ChatContactsForm
          contacts={contacts}
          isFetched={isFetched}
          loadMore={loadMore}
          count={pageCount}
          fetchMoreMessages={(values) => this.fetchMoreMessages(values)}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllChats: () => {
      dispatch({ type: actions.GET_ALL_CHATS.REQUEST });
    },
    getAllContacts: ({ params ,name}) => {
      dispatch({ type: actions.GET_ALL_CONTACTS.REQUEST, payload: { params ,name} });
    },
    getAllContactsClear: (clear) => {
      dispatch({ type: actions.GET_ALL_CONTACTS.REQUEST, payload: { clear } });
    }
  };
};

const mapStateToProps = (state) => {
  return {
    chats: get(state, "normalize.data.get-chat.result.data", []),
    contacts: get(state, "chat.contact.data", []),
    entities: get(state, "normalize.entities", {}),
    isFetched: get(state, "chat.isFetched"),
    meta: get(state, "chat.contact._meta", {})
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChatContactsContainer));

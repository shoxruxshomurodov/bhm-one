import React, { Component } from "react";
import ChatInterlocutor from "../../containers/ChatInterlocutor/ChatInterlocutor";
class ChatInterlocutorPage extends Component {
  render() {
    const {user_id} = this.props.match.params;
    return (
      <div className="d-flex flex fixed-content">
        <ChatInterlocutor user_id={user_id}  />
      </div>
    );
  }
}
export default ChatInterlocutorPage;

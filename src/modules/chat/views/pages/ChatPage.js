import React, {Component} from "react";
import ChatContainer from "../../containers/Chat/ChatContainer";

 class ChatPage extends Component {
    render() {
        const {chat_id} = this.props.match.params;
        return (
            <div className="d-flex flex fixed-content">
                <ChatContainer chat_id={chat_id}/>
            </div>
        );
    }
}

export default ChatPage;
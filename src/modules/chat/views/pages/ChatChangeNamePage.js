import React,{Component} from "react";
import ChatChangeNameContainer from "./../../containers/ChatChangeName/ChatChangeNameContainer";

class ChatChangeNamePage extends Component{
    render() {
        const {chat_id} = this.props.match.params;
        return (
            <div className="d-flex flex fixed-content">
                <ChatChangeNameContainer chat_id={chat_id}/>
            </div>
        );
    }
}

export default ChatChangeNamePage;
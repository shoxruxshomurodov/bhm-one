import React, { Component } from 'react';
import ChatAddMember from '../../containers/ChatAddMember/ChatAddMember';

class ChatAddMemberPage extends Component {
	render() {
		const { chat_id } = this.props.match.params;
		return <ChatAddMember chat_id={chat_id} />;
	}
}

export default ChatAddMemberPage;

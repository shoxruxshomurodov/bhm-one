import React, { Component } from 'react';
import ChatDeleteMember from '../../containers/ChatDeleteMember/ChatDeleteMember';

class ChatDeleteMemberPage extends Component {
	render() {
		const { chat_id } = this.props.match.params;
		return <ChatDeleteMember chat_id={chat_id} />;
	}
}

export default ChatDeleteMemberPage;

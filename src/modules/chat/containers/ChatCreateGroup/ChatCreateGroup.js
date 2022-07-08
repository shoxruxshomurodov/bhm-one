import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import actions from '../../actions';
import ChatSidebar from '../../components/ChatSidebar/ChatSidebar';
import NavBarSidebar from '../../components/ChatSidebar/NavBar';
import ChatContactList from '../../components/ChatSidebar/ChatContactList';
import ChatContactItem from '../../components/ChatSidebar/ChatContactItem';
import ChatCreateGroupForm from '../../components/ChatCreateGroupForm/ChatCreateGroupForm';
import isEqual from 'lodash/isEqual';
import { withRouter } from 'react-router-dom';
import Normalizer from '../../../../services/normalizr';
import ChatScheme from '../../../../schema/Chat';
class ChatContainer extends Component {
	handleSubmit = (values, { setSubmitting, setFieldError }) => {
		const { createChatGroup } = this.props;
		createChatGroup({ ...values, setSubmitting, setFieldError });
		console.log('CREATE_CHAT_GROUP');
	};

	componentDidMount() {
		const { getAllChats } = this.props;
		getAllChats();
	}

	componentDidUpdate(prevProps, prevState) {
		const { isFetched: isFetchedPrev } = prevProps;
		const { isFetched, history } = this.props;

		if (!isEqual(isFetchedPrev, isFetched) && isFetched === true) {
			history.push(`/chat/`);
		}
	}

	render() {
		let { chats, entities } = this.props;
		chats = Normalizer.Denormalize(chats, [ChatScheme], entities);
		return (
			<>
				<div className="d-flex flex fixed-content" style={{ background: '#fff' }}>
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
					<ChatCreateGroupForm handleSubmit={this.handleSubmit} />
				</div>
			</>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createChatGroup: ({ title, setSubmitting, setFieldError }) => {
			dispatch({
				type: actions.CREATE_CHAT_GROUP.REQUEST,
				payload: {
					title,
					setSubmitting,
					setFieldError,
				},
			});
		},
		getAllChats: () => {
			dispatch({ type: actions.GET_ALL_CHATS.REQUEST });
		},
	};
};

const mapStateToProps = (state) => {
	return {
		chats: get(state, 'normalize.data.get-chat.result.data', []),
		entities: get(state, 'normalize.entities', {}),
		isFetched: get(state, 'normalize.data.createGroup.isFetched', false),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChatContainer));

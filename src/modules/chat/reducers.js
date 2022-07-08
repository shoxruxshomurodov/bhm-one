import actions from './actions';
import {get,isEmpty} from 'lodash';

export default (state = {}, action) => {
	switch (action.type) {
		case actions.GET_CHAT_GROUP.REQUEST:
			return {
				...state,
				group: {
					...get(state, 'group', {}),
					isFetched: false,
				},
				isfetched: false,
			};
		case actions.GET_CHAT_GROUP.FAILURE:
			return {
				...state,
				group: {
					...get(state, 'group', {}),
					isFetched: true,
				},
				isfetched: true,
			};
		case actions.GET_CHAT_GROUP.SUCCESS:
			let { group } = action.payload;
			return {
				...state,
				group: {
					...group,
					isFetched: true,
				},
				isfetched: true,
			};
		case actions.ADD_MEMBER_GROUP.REQUEST:
			return {
				...state,
				addMemberGroup: {
					isFetched: false,
				},
			};

		case actions.ADD_MEMBER_GROUP.SUCCESS:
			let { result } = action.payload;
			return {
				...state,
				addMemberGroup: {
					result,
					isFetched: true,
				},
			};

		case actions.GET_ALL_CONTACTS.REQUEST:
			return {
				...state,
				isFetched: false,
			};

		case actions.GET_ALL_CONTACTS.SUCCESS:
			const {name} = action.payload;
			const {params} = action.payload;
			// debugger;
			const filterData = isEmpty(name) ? [...get(state,'contact.data',[]),...action.payload.contact.data]
				: isEmpty(params.test) ? action.payload.contact.data
				: [...get(state,'contact.data',[]),...action.payload.contact.data]
			return {
				...state,
				contact:{
					...get(state,'contact',{}),
					data:filterData,
					_meta:action.payload.contact._meta,
					_links:action.payload.contact._links,
				},
				isFetched: true,
			};

		case actions.ADD_MEMBER_GROUP.FAILURE:
			return {
				...state,
				addMemberGroup: {
					isFetched: true,
				},
			};

		case actions.DELETE_MEMBER_GROUP.REQUEST:
			return {
				...state,
				deleteMemberGroup: {
					isFetched: false,
				},
			};

		case actions.DELETE_MEMBER_GROUP.SUCCESS:
			let { deleted } = action.payload;
			return {
				...state,
				deleteMemberGroup: {
					deleted,
					isFetched: true,
				},
			};

		case actions.DELETE_MEMBER_GROUP.FAILURE:
			return {
				...state,
				deleteMemberGroup: {
					isFetched: false,
				},
			};

		case actions.CREATE_CHAT_MESSAGE.REQUEST:
			return {
				...state,
				createChatMessage: {
					isFetched: true,
				},
			};

		case actions.CREATE_CHAT_MESSAGE.SUCCESS:
			return ((action, state) => {
				let { chat_id, message } = action.payload;
				return {
					...state,
					messages: {
						...get(state, 'messages', {}),
						[chat_id]: {
							...get(state, `messages.${chat_id}`, {}),
							result: {
								...get(state, `messages.${chat_id}.result`, {}),
								data: [...get(state, `messages.${chat_id}.result.data`, []), message],
							},
						},
					},
				};
			})(action, state);

		case actions.CREATE_CHAT_MESSAGE.FAILURE:
			return {
				...state,
				createChatMessage: {
					isFetched: false,
				},
			};

		case actions.CREATE_CHAT_GROUP.REQUEST:
			return {
				...state,
				createGroup: {
					isFetched: false,
				},
			};

		case actions.CREATE_CHAT_GROUP.SUCCESS:
			return ((action, state) => {
				let { group } = action.payload;
				return {
					...state,
					createGroup: {
						group,
						isFetched: true,
					},
					chats: [...get(state, 'chats', []), group],
				};
			})(action, state);

		case actions.CREATE_CHAT_GROUP.FAILURE:
			return {
				...state,
				createGroup: {
					isFetched: false,
				},
			};

		case actions.GET_ALL_MESSAGES.REQUEST:
			return {
				...state,
				messages: {
					...get(state, 'messages', {}),
					all: {
						isFetched: true,
					},
				},
			};

		case actions.GET_ALL_MESSAGES.SUCCESS:
			let { data } = action.payload;
			return {
				...state,
				messages: {
					...get(state, 'messages', {}),
					all: {
						isFetched: true,
						data,
					},
				},
			};

		case actions.GET_ALL_MESSAGES.FAILURE:
			return {
				...state,
				messages: {
					...get(state, 'messages', {}),
					all: {
						isFetched: true,
					},
				},
			};

		case actions.GET_MESSAGES_BY_CHAT.REQUEST:
			let { chat_id } = action.payload;
			return {
				...state,
				messages: {
					...get(state, 'messages', {}),
					[chat_id]: {
						...get(state, `messages.${chat_id}`, {}),
						isFetched: false,
					},
				},
			};

		case actions.GET_MESSAGES_BY_CHAT.SUCCESS:
			return ((action, state) => {
				let { chat_id, clear, result } = action.payload;
				if (clear) {
					return {
						...state,
						messages: {
							...get(state, 'messages', {}),
							[chat_id]: {
								...get(state, `messages.${chat_id}`, {}),
								result: {
									...result,
									data: [...get(result, 'data', [])],
								},
								isFetched: true,
							},
						},
					};
				} else {
					return {
						...state,
						messages: {
							...get(state, 'messages', {}),
							[chat_id]: {
								...get(state, `messages.${chat_id}`, {}),
								result: {
									...result,
									data: [
										...get(state, `messages.${chat_id}.result.data`, []),
										...get(result, 'data', []),
									],
								},
								isFetched: true,
							},
						},
					};
				}
			})(action, state);

		case actions.GET_MESSAGES_BY_CHAT.FAILURE:
			return ((action, state) => {
				let { chat_id } = action.payload;
				return {
					...state,
					messages: {
						...get(state, 'messages', {}),
						[chat_id]: {
							isFetched: true,
						},
					},
				};
			})(action, state);

		case actions.DELETE_GROUP.REQUEST:
			return ((action, state) => {
				let { chat_id } = action.payload;
				return {
					...state,
					deleteGroup: {
						...get(state, 'deleteGroup', {}),
						[chat_id]: {
							isFetched: false,
						},
					},
				};
			})(action, state);

		case actions.DELETE_GROUP.SUCCESS:
			return ((action, state) => {
				let { chat_id } = action.payload;
				return {
					...state,
					deleteGroup: {
						...get(state, 'deleteGroup', {}),
						[chat_id]: {
							isFetched: true,
						},
					},
				};
			})(action, state);

		case actions.DELETE_GROUP.FAILURE:
			return ((action, state) => {
				let { chat_id } = action.payload;
				return {
					...state,
					deleteGroup: {
						...get(state, 'deleteGroup', {}),
						[chat_id]: {
							isFetched: false,
						},
					},
				};
			})(action, state);
		case actions.CHANGE_CHAT_GROUP_TITLE.REQUEST:
			return ((action, state) => {
				return {
					...state,
					isFetched: false,
				};
			})(action, state);
		case actions.CHANGE_CHAT_GROUP_TITLE.SUCCESS:
			return ((action, state) => {
				const { title } = action;
				debugger;
				return {
					...state,
					isFetched: true,
					title,
				};
			})(action, state);
		case actions.CHANGE_CHAT_GROUP_TITLE.FAILURE:
			return ((action, state) => {
				return {
					...state,
					isFetched: false,
				};
			})(action, state);

		case actions.CREATE_PRIVATE_CHAT.REQUEST:
			return ((action, state) => {
				return {
					...state,
					createPrivateChat: {
						isFetched: false,
					},
				};
			})(action, state);

		case actions.CREATE_PRIVATE_CHAT.SUCCESS:
			return ((action, state) => {
				const { result } = action.payload;
				return {
					...state,
					createPrivateChat: {
						isFetched: true,
						result,
					},
				};
			})(action, state);

		case actions.CREATE_PRIVATE_CHAT.FAILURE:
			return ((action, state) => {
				return {
					...state,
					createPrivateChat: {
						isFetched: false,
					},
				};
			})(action, state);

		case actions.GET_PRIVATE_CHAT.REQUEST:
			return ((action, state) => {
				return {
					...state,
					privatechat: {
						isFetched: false,
					},
				};
			})(action, state);

		case actions.GET_PRIVATE_CHAT.SUCCESS:
			return ((action, state) => {
				let { result } = action.payload;
				return {
					...state,
					privatechat: {
						isFetched: true,
						result,
					},
				};
			})(action, state);

		case actions.GET_PRIVATE_CHAT.FAILURE:
			return ((action, state) => {
				return {
					...state,
					privatechat: {
						isFetched: false,
					},
				};
			})(action, state);

		case actions.DELETE_INTERLOCUTOR_CHAT.REQUEST:
			return ((action, state) => {
				let { user_id } = action.payload;
				console.log(user_id, 'user_id inside reducer');
				return {
					...state,
					deleteInterlocutor: {
						...get(state, 'deleteInterlocutor', {}),
						[user_id]: {
							isFetched: false,
						},
					},
				};
			})(action, state);

		case actions.DELETE_INTERLOCUTOR_CHAT.SUCCESS:
			return ((action, state) => {
				let { user_id } = action.payload;
				return {
					...state,
					deleteInterlocutor: {
						...get(state, 'deleteInterlocutor', {}),
						[user_id]: {
							isFetched: true,
						},
					},
				};
			})(action, state);

		case actions.DELETE_INTERLOCUTOR_CHAT.FAILURE:
			return ((action, state) => {
				let { user_id } = action.payload;
				return {
					...state,
					deleteInterlocutor: {
						...get(state, 'deleteInterlocutor', {}),
						[user_id]: {
							isFetched: false,
						},
					},
				};
			})(action, state);

		case actions.GET_INTERLOCUTOR_MESSAGES.REQUEST:
			let { user_id } = action.payload;
			return {
				...state,
				interlocutorMsgs: {
					...get(state, 'interlocutorMsgs', {}),
					[user_id]: {
						...get(state, `interlocutorMsgs.${user_id}`, {}),
						isFetched: false,
					},
				},
			};

		case actions.GET_INTERLOCUTOR_MESSAGES.SUCCESS:
			return ((action, state) => {
				let { user_id, result, clear } = action.payload;
				if (clear) {
					return {
						...state,
						interlocutorMsgs: {
							...get(state, 'interlocutorMsgs', {}),
							[user_id]: {
								...get(state, `interlocutorMsgs.${user_id}`, {}),
								result: {
									...result,
									data: [...get(result, 'data', [])],
								},
								isFetched: true,
							},
						},
					};
				} else {
					return {
						...state,
						interlocutorMsgs: {
							...get(state, 'interlocutorMsgs', {}),
							[user_id]: {
								...get(state, `interlocutorMsgs.${user_id}`, {}),
								result: {
									...result,
									data: [
										...get(state, `interlocutorMsgs.${user_id}.result.data`, []),
										...get(result, 'data', []),
									],
								},
								isFetched: true,
							},
						},
					};
				}
			})(action, state);

		case actions.GET_INTERLOCUTOR_MESSAGES.FAILURE:
			return ((action, state) => {
				let { user_id } = action.payload;
				return {
					...state,
					interlocutorMsgs: {
						...get(state, 'interlocutorMsgs', {}),
						[user_id]: {
							isFetched: true,
						},
					},
				};
			})(action, state);

		case actions.CREATE_INTERLOCUTOR_MESSAGE.REQUEST:
			return {
				...state,
				createInterlocutorMessage: {
					isFetched: true,
				},
			};

		case actions.CREATE_INTERLOCUTOR_MESSAGE.SUCCESS:
			return ((action, state) => {
				let { user_id, msg } = action.payload;
				return {
					...state,
					interlocutorMsgs: {
						...get(state, 'interlocutorMsgs', {}),
						[user_id]: {
							...get(state, `interlocutorMsgs.${user_id}`, {}),
							result: {
								...get(state, `interlocutorMsgs.${user_id}.result`, {}),
								data: [...get(state, `interlocutorMsgs.${user_id}.result.data`, []), msg],
							},
						},
					},
				};
			})(action, state);

		case actions.CREATE_INTERLOCUTOR_MESSAGE.FAILURE:
			return {
				...state,
				createInterlocutorMessage: {
					isFetched: false,
				},
			};

		case actions.GET_INTERLOCUTOR_CHAT.REQUEST:
			return ((action, state) => {
				let { user_id } = action.payload;
				return {
					...state,
					interlocutorChat: {
						...get(state, 'interlocutorChat', {}),
						[user_id]: {
							isFetched: false,
						},
					},
				};
			})(action, state);

		case actions.GET_INTERLOCUTOR_CHAT.SUCCESS:
			return ((action, state) => {
				let { user_id, info, clear } = action.payload;
				if (clear) {
					return {
						...state,
						interlocutorChat: {
							...get(state, 'interlocutorChat', {}),
							[user_id]: {
								info,
								isFetched: true,
							},
						},
					};
				}
			})(action, state);

		case actions.GET_INTERLOCUTOR_CHAT.FAILURE:
			return ((action, state) => {
				let { user_id } = action.payload;
				return {
					...state,
					interlocutorChat: {
						...get(state, 'interlocutorChat', {}),
						[user_id]: {
							isFetched: false,
						},
					},
				};
			})(action, state);
		default:
			return state;
	}
};

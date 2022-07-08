import {call, put, takeLatest} from "redux-saga/effects";
import actions from "./actions";
import {request} from "../../services/api";
import ApiService from "./services/ApiService";
import * as actionTypes from "../../services/websocket/types";
import SocketService from "../../services/websocket/SocketService";
import Normalizer from "../../services/normalizr";
import ChatScheme from "../../schema/Chat";
import NormalizerAction from "../../services/normalizr/actions";

function* getAllChats() {
    try {
        const result = yield call(request.get, "chat/chat/get-chats-user", {
            params: {
                include: "interlocutor.profile"
            }
        });
        const {data: chats} = result;
        const normalizedData = yield call(Normalizer.Normalize, chats, {
            data: [ChatScheme]
        });
        yield put({
            type: NormalizerAction.NORMALIZE.REQUEST,
            payload: {
                ...normalizedData,
                storeName: "get-chat",
                entityName: "chat"
            }
        });
        yield put({type: actions.GET_ALL_CHATS.SUCCESS});
    } catch (e) {
        yield put({type: actions.GET_ALL_CHATS.FAILURE});
    }
}

function* getChatGroup(action) {
    try {
        const {chat_id} = action.payload;
        const params = {include: "chatMembers, chatMembers.profile, chatMessagesUnread.user"};
        const result = yield call(ApiService.getChatGroup, chat_id, params);
        const group = result.data;
        yield put({
            type: actions.GET_CHAT_GROUP.SUCCESS,
            payload: {
                group
            }
        });
    } catch (e) {
        yield put({type: actions.GET_CHAT_GROUP.FAILURE});
    }
}

function* createChatGroup(action) {
    try {
        const {title} = action.payload;
        const result = yield call(ApiService.createChatGroup, title);
        const group = result.data;
        yield put({
            type: actions.CREATE_CHAT_GROUP.SUCCESS,
            payload: {group}
        });
    } catch (e) {
        yield put({
            type: actions.CREATE_CHAT_GROUP.FAILURE
        });
    }
}

function* getAllContacts(action) {
    const {params, name="", clear} = action.payload;
    try {
        const result = yield call(ApiService.getChatContacts, name, params, clear);
        const contact = result.data;
        yield put({type: actions.GET_ALL_CONTACTS.SUCCESS, payload: {contact,name,params}});
    } catch (e) {
        yield put({type: actions.GET_ALL_CONTACTS.FAILURE, payload: e});
    }
}

function* addMemberGroup(action) {
    const {chat_id, user_id, setSubmitting, setFieldError} = action.payload;
    try {
        const result = yield call(ApiService.addMemberGroup, user_id, chat_id);
        yield put({
            type: actions.ADD_MEMBER_GROUP.SUCCESS,
            payload: {result}
        });
        setSubmitting(false);
    } catch (e) {
        const data = e.response.data;
        setSubmitting(false);
        data.map((item) => {
            return setFieldError(item.field, item.message);
        });
        yield put({
            type: actions.ADD_MEMBER_GROUP.FAILURE
        });
    }
}

function* deleteMemberGroup(action) {
    const {chat_id, user_id, setSubmitting, setFieldError} = action.payload;
    try {
        const deleted = yield call(ApiService.deleteMemberGroup, chat_id, user_id);
        yield put({
            type: actions.DELETE_MEMBER_GROUP.SUCCESS,
            payload: {deleted}
        });
        setSubmitting(false);
    } catch (e) {
        const data = e.response.data;
        setSubmitting(false);
        data.map((item) => {
            return setFieldError(item.field, item.message);
        });
        yield put({
            type: actions.DELETE_MEMBER_GROUP.FAILURE
        });
    }
}

function* createChatMessage(action) {
    const {chat_id, message: text} = action.payload;
    try {
        const result = yield call(ApiService.createChatMessage, chat_id, text);
        const message = result.data;
        yield put({
            type: actions.CREATE_CHAT_MESSAGE.SUCCESS,
            payload: {chat_id, message}
        });
    } catch (e) {
        yield put({
            type: actions.CREATE_CHAT_MESSAGE.FAILURE
        });
    }
}

function* deleteGroup(action) {
    const {chat_id} = action.payload;
    try {
        const result = yield call(ApiService.deleteGroup, chat_id);
        yield put({
            type: actions.DELETE_GROUP.SUCCESS,
            payload: {result, chat_id}
        });
    } catch (e) {
        yield put({
            type: actions.DELETE_GROUP.FAILURE
        });
    }
}

function* getAllMessages(action) {
    try {
        const result = yield call(ApiService.getAllMessages);
        const data = result.data;
        yield put({
            type: actions.GET_ALL_MESSAGES.SUCCESS,
            payload: {
                data
            }
        });
    } catch (e) {
        yield put({
            type: actions.GET_ALL_MESSAGES.FAILURE
        });
    }
}

function* getMessagesByChat(action) {
    const {chat_id, clear, params} = action.payload;
    try {
        const query = yield call(ApiService.getMessagesByChat, chat_id, params);
        const result = query.data;
        yield put({
            type: actions.GET_MESSAGES_BY_CHAT.SUCCESS,
            payload: {
                result,
                chat_id,
                clear
            }
        });
    } catch (e) {
        yield put({
            type: actions.GET_MESSAGES_BY_CHAT.FAILURE,
            payload: {
                chat_id
            }
        });
    }
}

function* changeChatGroupTitle(action) {
    const {chat_id, title} = action.payload;
    try {
        const query = yield call(ApiService.changeChatGroupName, chat_id, title);
        yield put({
            type: actions.CHANGE_CHAT_GROUP_TITLE.SUCCESS,
            payload: chat_id,
            title,
            result: query.data
        });
    } catch (e) {
        yield put({
            type: actions.CHANGE_CHAT_GROUP_TITLE.FAILURE,
            payload: {
                chat_id
            }
        });
    }
}

function* createPrivateChat(action) {
    const {phone, user_id} = action.payload;
    try {
        const query = yield call(ApiService.createPrivateChat, phone, user_id);
        const result = query.data;
        yield put({
            type: actions.CREATE_PRIVATE_CHAT.SUCCESS,
            payload: {result}
        });
    } catch (e) {
        yield put({
            type: actions.CREATE_PRIVATE_CHAT.FAILURE
        });
    }
}

function* getPrivateChat(action) {
    const {user_id} = action.payload;
    try {
        const query = yield call(ApiService.getPrivateChat, user_id);
        const result = query.data;
        yield put({
            type: actions.GET_PRIVATE_CHAT.SUCCESS,
            payload: {result}
        });
    } catch (e) {
        yield put({
            type: actions.GET_PRIVATE_CHAT.FAILURE,
            payload: {
                user_id
            }
        });
    }
}

function* deleteInterlocutorChat(action) {
    const {user_id} = action.payload;
    try {
        const query = yield call(ApiService.deleteInterlocutorChat, user_id);
        console.log(query, "query");
        yield put({
            type: actions.DELETE_INTERLOCUTOR_CHAT.SUCCESS,
            payload: {user_id}
        });
    } catch (e) {
        yield put({
            type: actions.DELETE_INTERLOCUTOR_CHAT.FAILURE,
            payload: {
                user_id
            }
        });
    }
}

function* createInterlocutorMessage(action) {
    const {user_id, message} = action.payload;
    try {
        const query = yield call(
            ApiService.createInterlocutorMessage,
            user_id,
            message
        );
        const msg = query.data;
        yield put({
            type: actions.CREATE_INTERLOCUTOR_MESSAGE.SUCCESS,
            payload: {user_id, msg}
        });
    } catch (e) {
        yield put({
            type: actions.CREATE_INTERLOCUTOR_MESSAGE.FAILURE,
            payload: {
                user_id
            }
        });
    }
}

function* getInterlocutorMessages(action) {
    const {user_id, clear, params} = action.payload;
    try {
        const query = yield call(
            ApiService.getInterlocutorMessages,
            user_id,
            params
        );
        const result = query.data;

        yield put({
            type: actions.GET_INTERLOCUTOR_MESSAGES.SUCCESS,
            payload: {
                result,
                user_id,
                clear
            }
        });
    } catch (e) {
        yield put({
            type: actions.GET_INTERLOCUTOR_MESSAGES.FAILURE,
            payload: {
                user_id
            }
        });
    }
}

function* getInterlocutorChat(action) {
    const {user_id, clear} = action.payload;
    try {
        const result = yield call(ApiService.getInterlocutorChat, user_id);
        const info = result.data;
        yield put({
            type: actions.GET_INTERLOCUTOR_CHAT.SUCCESS,
            payload: {user_id, info, clear}
        });
    } catch (e) {
        yield put({
            type: actions.GET_INTERLOCUTOR_CHAT.FAILURE,
            payload: {
                user_id
            }
        });
    }
}

function* websocketMessage(action) {
    yield put(SocketService.onMessage(action));
}

export default function* () {
    yield takeLatest(actions.GET_ALL_CHATS.REQUEST, getAllChats);
    yield takeLatest(actions.GET_CHAT_GROUP.REQUEST, getChatGroup);
    yield takeLatest(actions.CREATE_CHAT_GROUP.REQUEST, createChatGroup);
    yield takeLatest(actions.GET_ALL_CONTACTS.REQUEST, getAllContacts);
    yield takeLatest(actions.ADD_MEMBER_GROUP.REQUEST, addMemberGroup);
    yield takeLatest(actions.DELETE_MEMBER_GROUP.REQUEST, deleteMemberGroup);
    yield takeLatest(actions.CREATE_CHAT_MESSAGE.REQUEST, createChatMessage);
    yield takeLatest(actions.DELETE_GROUP.REQUEST, deleteGroup);
    yield takeLatest(actions.GET_ALL_MESSAGES.REQUEST, getAllMessages);
    yield takeLatest(actions.GET_MESSAGES_BY_CHAT.REQUEST, getMessagesByChat);
    yield takeLatest(
        actions.CHANGE_CHAT_GROUP_TITLE.REQUEST,
        changeChatGroupTitle
    );
    yield takeLatest(actions.CREATE_PRIVATE_CHAT.REQUEST, createPrivateChat);
    yield takeLatest(actions.GET_PRIVATE_CHAT.REQUEST, getPrivateChat);
    yield takeLatest(
        actions.DELETE_INTERLOCUTOR_CHAT.REQUEST,
        deleteInterlocutorChat
    );
    yield takeLatest(
        actions.CREATE_INTERLOCUTOR_MESSAGE.REQUEST,
        createInterlocutorMessage
    );
    yield takeLatest(
        actions.GET_INTERLOCUTOR_MESSAGES.REQUEST,
        getInterlocutorMessages
    );
    yield takeLatest(actions.GET_INTERLOCUTOR_CHAT.REQUEST, getInterlocutorChat);
    yield takeLatest(actionTypes.WEBSOCKET_MESSAGE, websocketMessage);
}

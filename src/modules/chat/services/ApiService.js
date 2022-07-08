import { request } from "../../../services/api";

class ApiService {
  static addMemberGroup = (user_id, chat_id) => {
    return request.post("chat/chat-member", {
      user_id,
      chat_id,
    });
  };

  static getAllContacts = (params) => {
    return request.get("auth/user/index", {
      params: {
        "per-page": 15,
        ...params,
        include: "profile",
      },
    });
  };

  static getChatContacts = (name='',params) => {
    return request.get(`chat/chat-user/index?name=${name}`, {
      params: {
        "per-page": 15,
        ...params,
        include: "profile",
      },
    });
  };

  static getChatGroup = (chat_id, params) => {
    return request.get(`chat/chat-group/${chat_id}`, { params: params });
  };

  static deleteMemberGroup = (chat_id, user_id) => {
    return request.delete("chat/chat-member/delete-by-chat-user", {
      data: {
        chat_id,
        user_id,
      },
    });
  };

  static createChatMessage = (chat_id, message) => {
    return request.post("chat/chat-message", {
      chat_id,
      message,
    });
  };

  static createChatGroup = (title) => {
    return request.post("chat/chat-group", {
      title,
    });
  };

  static deleteGroup = (chat_id) => {
    return request.delete(`chat/chat-group/${chat_id}`);
  };

  static getAllMessages = () => {
    return request.get(`chat/chat-message/list`);
  };

  static getMessagesByChat = (chat_id, params) => {
    return request.get(`chat/chat-message/list/${chat_id}`, {
      params: {
        "per-page": 15,
        ...params,
        include: "profile",
      },
    });
  };

  static changeChatGroupName = (chat_id, title) => {
    return request.put(`chat/chat-group/${chat_id}`, {
      title,
    });
  };

  static createPrivateChat = (user_id) => {
    return request.post("chat/chat-message/send-message-interlocutor", {
      interlocutor_user_id: user_id,
    });
  };

  static getPrivateChat = (user_id) => {
    return request.get(`chat/chat-private/${user_id}`);
  };

  static deleteInterlocutorChat = (user_id) => {
    return request.delete(`chat/chat-private/${user_id}`);
  };

  static createInterlocutorMessage = (user_id, message) => {
    return request.post(`chat/chat-message/send-message-interlocutor`, {
      interlocutor_user_id: user_id,
      message,
    });
  };

  static getInterlocutorMessages = (user_id, params) => {
    return request.get(`chat/chat-message/list/interlocutor/${user_id}`, {
      params: {
        "per-page": 15,
        ...params,
        sort: "-created_at",
      },
    });
  };

  static getInterlocutorChat = (user_id) => {
    return request.get(`auth/user/${user_id}`, {
      params: {
        include: "profile",
        sort: "-created_at",
      },
    });
  };
}

export default ApiService;

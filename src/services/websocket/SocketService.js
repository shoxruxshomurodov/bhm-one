import actions from "../../modules/chat/actions";
import isEqual from "lodash/isEqual";

class SocketService {
  static onMessage = (action) => {
    const { message: msg } =action.payload;
    const { type, data: message } = JSON.parse(msg);
    const { chat_id,chat } = message;
    if (isEqual(type, "new_message")) {
      const { type: chat_type } = chat;
      if (isEqual(chat_type, 2)) {
        return {
          type: actions.CREATE_CHAT_MESSAGE.SUCCESS,
          payload: { message, chat_id },
        };
      }
      if (isEqual(chat_type, 1)) {
        const user_id = message.created_by;
        const msg = message;
        return {
          type: actions.CREATE_INTERLOCUTOR_MESSAGE.SUCCESS,
          payload: { user_id,msg},
        };
      }
    }
  };
}

export default SocketService;

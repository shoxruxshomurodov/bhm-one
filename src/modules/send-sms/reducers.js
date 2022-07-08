import actions from "./actions";
import { get } from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.CHANGE_SMS_JOB_STATUS.REQUEST:
      return ((state) => {
        return {
          ...state,
        };
      })(state);
    case actions.CHANGE_SMS_JOB_STATUS.SUCCESS:
      return ((state) => {
        const { data } = action.payload;
        return {
          ...state,
        };
      })(action, state);
    case actions.CHANGE_SMS_JOB_STATUS.TRIGGER:
      return ((state) => {
        return {
          ...state,
        };
      })(state);

    default:
      return state;
  }
};

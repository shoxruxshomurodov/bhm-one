import actions from "./actions";
import {get} from "lodash";

export default (state = {}, action) => {
    switch (action.type) {
        case actions.GET_ALL_VACANCY.REQUEST:
            return ((state) => {
                return {
                    ...state,
                    'vacancy-list':{
                        data: {},
                        isFetched: false,
                    }
                }
            })(state);
        case actions.GET_ALL_VACANCY.SUCCESS:
            return ((state) => {
                const {data} = action.payload;
                return {
                    ...state,
                    'vacancy-list':{
                        data,
                        isFetched: true,
                    }
                }
            })(action, state);
        case actions.GET_ALL_VACANCY.TRIGGER:
            return ((state) => {
                return {
                    ...state,
                    'vacancy-list':{
                        data:{},
                        isFetched: false,
                    }
                }
            })(state);
        case actions.GET_VACANCY_USER.SUCCESS:
            let {data} = action.payload;
            return {
                ...state,
                vacancy_user: [
                    ...data,
                ],
                isfetched: true,
            };

        case actions.GET_VACANCY_USER.REQUEST:
            return {
                ...state,
                isFetched: false,
            };

        default:
            return state;
    }
};

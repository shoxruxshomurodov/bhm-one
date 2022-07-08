import actions from './actions';
import {get, isEmpty} from "lodash";

export default (state = {}, action) => {
    switch (action.type) {
        case actions.GET_LANGUAGE.REQUEST:
            return {
                ...state,
                isFetched: false,
            };
        case actions.GET_LANGUAGE.SUCCESS:
            const {data, _meta} = action.payload;
            const {name} = action.payload;
            const {params} = action.payload;
            const filterData = isEmpty(name) ? [...get(state,'data',[]),...action.payload.data]
                : isEmpty(params.test) ? action.payload.data
                    : [...get(state,'data',[]),...action.payload.data]
            return {
                ...state,
                messages:{
                    ...get(state,'contact',{}),
                    data:filterData,
                },
                isFetched: true,
                _meta,
            };
        case actions.GET_ONE_MESSAGE.SUCCESS:
            return ((action, state) => {
                const {data} = action.payload;
                console.log(data)
                return {
                    ...state,
                    one_message: data,
                    isMessageFetched: true,
                };
            })(action, state);
        case actions.GET_ONE_MESSAGE.REQUEST:
            return {
                ...state,
                isMessageFetched: false,
            };
        default:
            return state;
    }
}
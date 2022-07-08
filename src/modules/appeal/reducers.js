import actions from './actions';

export default (state = {}, action) => {
    switch (action.type) {

        case actions.GET_APPEAL.SUCCESS:
            const {data,meta} = action.payload;

            return {
                ...state,
                appeal: [
                    ...data,
                ],
                isfetched: true,
                _meta:meta,
            };

        case actions.GET_APPEAL.REQUEST:
            return {
                ...state,
                isFetched: true,
            };

        default:
            return state;
    }
}
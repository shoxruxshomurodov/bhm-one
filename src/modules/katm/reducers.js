import actions from './actions';

export default (state = {}, action) => {
    switch (action.type) {

        case actions.GET_ACTIVE_REQUESTS.SUCCESS:
            let {data, _meta} = action.payload;

            return {
                ...state,
                active_requests: [
                    ...data,
                ],
                isfetched: true,
                _meta,
            };

        case actions.GET_MONITORING.SUCCESS:
            const {content,meta} = action.payload;
            return {
                ...state,
                monitoring: [
                    ...content,
                ],
                isfetched: true,
                _meta:meta,
            };

        case actions.GET_MONITORING.REQUEST:
            return {
                ...state,
                isFetched: true,
            };
        case actions.GET_ACTIVE_REQUESTS.REQUEST:
            return {
                ...state,
                isFetched: true,
            };

        case actions.GET_VIEW_MONITORING.SUCCESS:
            const {monitoringById} = action.payload;
            return {
                monitoringById,
                isfetched: true,
            };

        case actions.GET_VIEW_MONITORING.REQUEST:
            return {
                isFetched: false,
            };
        case actions.GET_VIEW_MONITORING.REQUEST:
            return {
                isFetched: true,
            };

        default:
            return state;
    }
}
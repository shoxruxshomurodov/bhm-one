import Actions from '../actions'

export default (state = {}, action) => {
    switch (action.type) {
        case Actions.CHANGE_LANG.SUCCESS:
            return {
                ...state, ...{"lang": action.payload.lang}, ...{'isFetched': true}
            }
        default:
            return state
    }
}
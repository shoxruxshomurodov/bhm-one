import actions from "./actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_COLLECTOR_MIGRATE_CALENDAR.REQUEST:
      return {
        ...state,
        isFetched: false,
        events: []
      };
    case actions.GET_COLLECTOR_MIGRATE_CALENDAR.SUCCESS:
      const { events } = action.payload;
      return {
        ...state,
        isFetched: true,
        events
      };
    case actions.GET_COLLECTOR_DASHBOARD_ONE.REQUEST:
      return {
        ...state,
        isFetched: false,
        list_debt_credit: []
      };
    case actions.GET_COLLECTOR_DASHBOARD_ONE.SUCCESS:
      const { list_debt_credit } = action.payload;
      return {
        ...state,
        isFetched: true,
        list_debt_credit
      };
    case actions.GET_COLLECTOR_DASHBOARD_CHART_LIST.REQUEST:
      return {
        ...state,
        isFetched: false,
        dashboard_chart_list: []
      };
    case actions.GET_COLLECTOR_DASHBOARD_CHART_LIST.SUCCESS:
      const { dashboard_chart_list } = action.payload;
      return {
        ...state,
        isFetched: true,
        dashboard_chart_list
      };
    case actions.GET_COLLECTOR_DASHBOARD_THREE.REQUEST:
      return {
        ...state,
        isFetched: false,
        list_chart_info: []
      };
    case actions.GET_COLLECTOR_DASHBOARD_THREE.SUCCESS:
      const { list_chart_info } = action.payload;
      return {
        ...state,
        isFetched: true,
        list_chart_info
      };

    case actions.GET_COLLECTOR_CONTROLLER_VIEW_USER_INFO.REQUEST:
      return {
        ...state,
        isFetched: false,
        list_user_info: []
      };
    case actions.GET_COLLECTOR_CONTROLLER_VIEW_USER_INFO.SUCCESS:
      const { list_user_info } = action.payload;
      return {
        ...state,
        isFetched: true,
        list_user_info
      };
    case actions.SEND_EMPLOYEES_IDS_IMPORT.REQUEST:
      return {
        ...state,
        errorFetched: false,
        saved_success: false,
        equalIdsEmployees: []
      };
    case actions.SEND_EMPLOYEES_IDS_IMPORT.SUCCESS:
      const { equalIdsEmployees } = action.payload;
      return {
        ...state,
        errorFetched: true,
        saved_success: true,
        equalIdsEmployees
      };
    case actions.CHOOSED_EMPLOYEES_DROPDOWN.REQUEST:
      return {
        ...state,
        isFetched: false,
        choosedEmployees: []
      };
    case actions.CHOOSED_EMPLOYEES_DROPDOWN.SUCCESS:
      const { choosedEmployees } = action.payload;
      return {
        ...state,
        isFetched: true,
        choosedEmployees
      };
    case actions.GET_BONUS_LIST.REQUEST:
      return {
        ...state,
        isFetched: false,
        bonus: []
      };

    case actions.GET_BONUS_LIST.SUCCESS:
      const { bonus } = action.payload;
      return {
        ...state,
        isFetched: true,
        bonus
      };
    case actions.GET_BONUS_CHART.REQUEST:
      return {
        ...state,
        isFetched: false,
        bonus_chart: []
      };

    case actions.GET_BONUS_CHART.SUCCESS:
      const { bonus_chart } = action.payload;
      return {
        ...state,
        isFetched: true,
        bonus_chart
      };
    case actions.GET_BONUS_DETAIL_PAY.REQUEST:
      return {
        ...state,
        isFetched_detail: false,
        detail_pay: []
      };

    case actions.GET_BONUS_DETAIL_PAY.SUCCESS:
      const { detail_pay } = action.payload;
      return {
        ...state,
        isFetched_detail: true,
        detail_pay
      };
    case actions.GET_BONUS_USER.REQUEST:
      return {
        ...state,
        isFetched: false,
        bonus_user: []
      };

    case actions.GET_BONUS_USER.SUCCESS:
      const { bonus_user } = action.payload;
      return {
        ...state,
        isFetched: true,
        bonus_user
      };
    case actions.GET_EMPLOYEES_LIST.REQUEST:
      return {
        ...state,
        isFetched: false,
        employees_list: []
      };

    case actions.GET_EMPLOYEES_LIST.SUCCESS:
      const { employees_list } = action.payload;
      return {
        ...state,
        isFetched: true,
        employees_list
      };
    case actions.GET_SAVED_STATUS_COMMENT.REQUEST:
      return {
        ...state,
        isFetched: false,
        saved_comments: []
      };

    case actions.GET_SAVED_STATUS_COMMENT.SUCCESS:
      const { saved_comments } = action.payload;
      return {
        ...state,
        isFetched: true,
        saved_comments
      };
    case actions.CHANGE_CATEGORY.REQUEST:
      return {
        ...state,
        isFetched: false
      };
    case actions.CHANGE_CATEGORY.TRIGGER:
      return {
        ...state,
        isFetched: false
      };
    case actions.CHANGE_CATEGORY.SUCCESS:
      return {
        ...state,
        isFetched: true
      };
    default:
      return state;
  }
};

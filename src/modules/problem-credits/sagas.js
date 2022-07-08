import { call, put, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import ApiService from './services/ApiService';
function* getCollectorMigrationCalendar(action) {
	const { period } = action.payload;
	const result = yield call(ApiService.getCollectorMigrationCalendar, period);
	const { data: events } = result;
	yield put({
		type: actions.GET_COLLECTOR_MIGRATE_CALENDAR.SUCCESS,
		payload: { events },
	});
}

function* getDebtListHandle(action) {
	const { filial, region_id, period } = action.payload;
	const result = yield call(ApiService.getDebtListHandle, filial, region_id, period);
	const { data: list_debt_credit } = result;
	yield put({
		type: actions.GET_COLLECTOR_DASHBOARD_ONE.SUCCESS,
		payload: { list_debt_credit },
	});
}

function* getDashboardChartListHandle(action) {
	const { filial, region_id, period } = action.payload;
	const result = yield call(ApiService.getDashboardChartListHandle, filial, region_id, period);
	const { data: dashboard_chart_list } = result;
	yield put({
		type: actions.GET_COLLECTOR_DASHBOARD_CHART_LIST.SUCCESS,
		payload: { dashboard_chart_list },
	});
}

function* getChartListHandle(action) {
	const { filial, region_id, period } = action.payload;
	const result = yield call(ApiService.getChartListHandle, filial, region_id, period);
	const { data: list_chart_info } = result;
	yield put({
		type: actions.GET_COLLECTOR_DASHBOARD_THREE.SUCCESS,
		payload: { list_chart_info },
	});
}
function* getControllerViewHandler(action) {
	const { loan_id } = action.payload;
	const result = yield call(ApiService.getControllerViewHandler, loan_id);
	const { data: list_user_info } = result;
	yield put({
		type: actions.GET_COLLECTOR_CONTROLLER_VIEW_USER_INFO.SUCCESS,
		payload: { list_user_info },
	});
}
function* sendEmployeesIds(action) {
	const { ids } = action.payload;
	const result = yield call(ApiService.selectEmployeesIds, ids);
	const { data: equalIdsEmployees } = result;
	yield put({
		type: actions.SEND_EMPLOYEES_IDS_IMPORT.SUCCESS,
		payload: { equalIdsEmployees },
	});
}
function* choosedEmployeesDropdown() {
	const result = yield call(ApiService.choosedEmployeesDropdown);
	const { data: choosedEmployees } = result;
	yield put({
		type: actions.CHOOSED_EMPLOYEES_DROPDOWN.SUCCESS,
		payload: { choosedEmployees },
	});
}
function* sendUserIdAndCreditsIds(action) {
	const { user_id, loan_ids } = action.payload;
	yield call(ApiService.sendUserIdAndCreditsIds, user_id, loan_ids);
}

function* getBonus(action) {
	const { filial, month, year } = action.payload;
	const result = yield call(ApiService.getBonus, filial, month, year);
	const { data: bonus } = result;
	yield put({
		type: actions.GET_BONUS_LIST.SUCCESS,
		payload: { bonus },
	});
}
function* getBonusChart(action) {
	const { filial, month, year } = action.payload;
	const result = yield call(ApiService.getBonusChart, filial, month, year);
	const { data: bonus_chart } = result;
	yield put({
		type: actions.GET_BONUS_CHART.SUCCESS,
		payload: { bonus_chart },
	});
}
function* getDetailPay(action) {
	const { user_id, month, year } = action.payload;
	const result = yield call(ApiService.getDetailPay, user_id, month, year);
	const { data: detail_pay } = result;
	yield put({
		type: actions.GET_BONUS_DETAIL_PAY.SUCCESS,
		payload: { detail_pay },
	});
}
function* getBonusUser(action) {
	const { month, year } = action.payload;
	const result = yield call(ApiService.getBonusUser, month, year);
	const { data: bonus_user } = result;
	yield put({
		type: actions.GET_BONUS_USER.SUCCESS,
		payload: { bonus_user },
	});
}
function* getEmployeesList(action) {
	const { region_code, filial_code, page } = action.payload;
	const result = yield call(ApiService.getEmployeesList, region_code, filial_code, page);
	const { data: employees_list } = result;
	yield put({
		type: actions.GET_EMPLOYEES_LIST.SUCCESS,
		payload: { employees_list },
	});
}
function* getStatusSave(action) {
	const { loan_id, status, comment } = action.payload;
	const result = yield call(ApiService.getStatusSave, loan_id, status, comment);
	const { data: saved_comments } = result;
	yield put({
		type: actions.GET_SAVED_STATUS_COMMENT.SUCCESS,
		payload: { saved_comments },
	});
}
function* changeCategory(action) {
	const { loan_id, is_return, comment } = action.payload;
	yield call(ApiService.changeCategory, loan_id, is_return, comment);
	yield put({ type: actions.CHANGE_CATEGORY.SUCCESS });
	yield put({ type: actions.CHANGE_CATEGORY.TRIGGER });
}
function* changeCategoryInMonitoring(action) {
	const { loan_id, is_return, comment } = action.payload;
	yield call(ApiService.changeCategoryInMonitoring, loan_id, is_return, comment);
	yield put({ type: actions.CHANGE_CATEGORY.SUCCESS });
	yield put({ type: actions.CHANGE_CATEGORY.TRIGGER });
}
export default function*() {
	yield takeLatest(actions.GET_COLLECTOR_MIGRATE_CALENDAR.REQUEST, getCollectorMigrationCalendar);
	yield takeLatest(actions.GET_COLLECTOR_DASHBOARD_ONE.REQUEST, getDebtListHandle);
	yield takeLatest(actions.GET_COLLECTOR_DASHBOARD_THREE.REQUEST, getChartListHandle);
	yield takeLatest(actions.GET_COLLECTOR_DASHBOARD_CHART_LIST.REQUEST, getDashboardChartListHandle);
	yield takeLatest(actions.GET_COLLECTOR_CONTROLLER_VIEW_USER_INFO.REQUEST, getControllerViewHandler);
	yield takeLatest(actions.SEND_EMPLOYEES_IDS_IMPORT.REQUEST, sendEmployeesIds);
	yield takeLatest(actions.CHOOSED_EMPLOYEES_DROPDOWN.REQUEST, choosedEmployeesDropdown);
	yield takeLatest(actions.SEND_USERID_AND_EMPLOYEES_IDS.REQUEST, sendUserIdAndCreditsIds);
	yield takeLatest(actions.GET_BONUS_LIST.REQUEST, getBonus);
	yield takeLatest(actions.GET_BONUS_CHART.REQUEST, getBonusChart);
	yield takeLatest(actions.GET_BONUS_DETAIL_PAY.REQUEST, getDetailPay);
	yield takeLatest(actions.GET_BONUS_USER.REQUEST, getBonusUser);
	yield takeLatest(actions.GET_EMPLOYEES_LIST.REQUEST, getEmployeesList);
	yield takeLatest(actions.GET_SAVED_STATUS_COMMENT.REQUEST, getStatusSave);
	yield takeLatest(actions.CHANGE_CATEGORY.REQUEST, changeCategory);
	yield takeLatest(actions.CHANGE_CATEGORY_MONITORING.REQUEST, changeCategoryInMonitoring);
}

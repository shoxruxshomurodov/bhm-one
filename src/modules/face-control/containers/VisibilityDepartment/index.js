import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { get, values, isEmpty } from 'lodash';
import TableWriteReason from '../../components/Table/TableWriteReason';
import InputGroup from '../../components/InputGroup/InputGroup';
import moment from 'moment';
import Loader from '../../../../components/Loader';
class VisibilityDepartmentContainer extends Component {
	state = {
		code: null,
		period: moment().format('YYYY-MM'),
		slug: 'department',
		openModal: false,
		day: null,
		work_hour: null,
		full_name: null,
		tab_num: null,
	};

	selectHandler = (value) => {
		return this.setState({ code: value });
	};
	datePickerHandler = (period) => {
		return this.setState({ period: period });
	};
	btnHandler = () => {
		const { code, period, slug } = this.state;
		const { VisibilityDepartment } = this.props;
		VisibilityDepartment({ code, period, slug });
	};
	openReasonModaLEmployee = (day, work_hour, full_name, tab_num) => {
		this.setState({ openModal: true, day, work_hour, full_name, tab_num });
	};
	closeReasonModalEmployee = () => {
		this.setState({ openModal: false });
	};
	getVisibilityEmployeesHandler = () => {
		const { period, code, slug } = this.state;
		const { VisibilityDepartment } = this.props;
		VisibilityDepartment({ code, period, slug });
	};
	render() {
		let { selectDepartmentList, getVisibilityDepartment, isFetched } = this.props;
		let arrSelectDepartment = Object.entries(selectDepartmentList).map(([key, value]) => {
			return { value: key, label: value };
		});
		const { openModal, day, work_hour, full_name, tab_num, period } = this.state;
		getVisibilityDepartment = values(getVisibilityDepartment);
		const dateFormat = 'YYYY-MM';
		return (
			<>
				<InputGroup
					dateFormat={dateFormat}
					datePickerHandler={this.datePickerHandler}
					selectDepartmentList={arrSelectDepartment}
					selectHandler={this.selectHandler}
					btnHandler={this.btnHandler}
					picker="month"
					isShowed={true}
				/>

				{!isFetched && <Loader />}
				{!isEmpty(getVisibilityDepartment) && (
					<TableWriteReason
						items={getVisibilityDepartment}
						openModal={openModal}
						openReasonModaLEmployee={this.openReasonModaLEmployee}
						closeReasonModalEmployee={this.closeReasonModalEmployee}
						day={day}
						work_hour={work_hour}
						period={period}
						tab_num={tab_num}
						full_name={full_name}
						getVisibilityEmployeesHandler={this.getVisibilityEmployeesHandler}
						open={true}
					/>
				)}
				{isEmpty(getVisibilityDepartment) && isFetched && <p className="search-data">Маълумот йўқ</p>}
			</>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		selectDepartmentList: get(state, 'face.departmentList', {}),
		isFetched: get(state, 'face.isFetched', false),
		getVisibilityDepartment: get(state, 'face.getVisibilityDepartment', {}),
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		VisibilityDepartment: ({ code, period, slug }) =>
			dispatch({
				type: actions.GET_VISIBILITY_DEPARTMENT.REQUEST,
				payload: { code, period, slug },
			}),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(VisibilityDepartmentContainer);

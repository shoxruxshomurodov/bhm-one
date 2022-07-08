import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { get, values, isEmpty } from 'lodash';
import Table from '../../components/Table/Table';
import InputGroup from '../../components/InputGroup/InputGroup';
import moment from 'moment';
import Loader from '../../../../components/Loader';
class TotalWorkDepartmentEmployees extends Component {
	state = {
		code: null,
		period: moment().format('YYYY-MM'),
		slug: 'table',
	};

	selectHandler = (value) => {
		return this.setState({ code: value });
	};
	datePickerHandler = (period) => {
		return this.setState({ period: period });
	};
	btnHandler = () => {
		const { code, period, slug } = this.state;
		const { getTotalWorkDepartmentEmployees } = this.props;
		getTotalWorkDepartmentEmployees({ code, period, slug });
	};
	render() {
		let { selectDepartmentList, totalWorkDepartmentEmployees, isFetched } = this.props;
		let arrSelectDepartment = Object.entries(selectDepartmentList).map(([key, value]) => {
			return { value: key, label: value };
		});
		totalWorkDepartmentEmployees = values(totalWorkDepartmentEmployees);
		console.log(totalWorkDepartmentEmployees, 'totalWorkDepartmentEmployees');
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
				{!isEmpty(totalWorkDepartmentEmployees) && (
					<div className="table__wrapper">
						<Table items={totalWorkDepartmentEmployees} />
					</div>
				)}
				{isEmpty(totalWorkDepartmentEmployees) && isFetched && <p className="search-data">Маълумот йўқ</p>}
			</>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		selectDepartmentList: get(state, 'face.departmentList', {}),
		isFetched: get(state, 'face.isFetched', false),
		totalWorkDepartmentEmployees: get(state, 'face.totalWorkDepartmentEmployees', {}),
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getTotalWorkDepartmentEmployees: ({ code, period, slug }) =>
			dispatch({
				type: actions.GET_TOTAL_DEPARTMENT_EMPLOYEES_HOUR.REQUEST,
				payload: { code, period, slug },
			}),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(TotalWorkDepartmentEmployees);

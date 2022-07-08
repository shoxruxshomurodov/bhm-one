import React, { Component } from 'react';

import Chart from '../../components/drawChart/Chart';
import InputGroup from '../../components/InputGroup/InputGroup';
import { connect } from 'react-redux';
import actions from '../../actions';
import { get, isEmpty } from 'lodash';
import moment from 'moment';
import Loader from '../../../../components/Loader';
class DepartmentListContainer extends Component {
	state = {
		code: null,
		period: moment().format('YYYY-MM-DD'),
		slug: 'employees',
	};
	selectHandler = (value) => {
		return this.setState({ code: value });
	};
	datePickerHandler = (period) => {
		return this.setState({ period: period });
	};
	btnHandler = () => {
		const { code, period, slug } = this.state;
		const { getDepartmentEmployees } = this.props;
		return getDepartmentEmployees({ code, period, slug });
	};
	render() {
		let { selectDepartmentList, departmentEmployees, isFetched } = this.props;
		let arrSelectDepartment = Object.entries(selectDepartmentList).map(([key, value]) => {
			return { value: key, label: value };
		});
		const dateFormat = 'YYYY-MM-DD';
		return (
			<>
				<InputGroup
					dateFormat={dateFormat}
					datePickerHandler={this.datePickerHandler}
					selectDepartmentList={arrSelectDepartment}
					selectHandler={this.selectHandler}
					btnHandler={this.btnHandler}
					isShowed={true}
				/>
				{!isFetched && <Loader />}
				<Chart isFetched={isFetched} onlyUser={false} drawChart={departmentEmployees} />
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		selectDepartmentList: get(state, 'face.departmentList', {}),
		departmentEmployees: get(state, 'face.departmentEmployees', []),
		isFetched: get(state, 'face.isFetched', false),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getDepartmentEmployees: ({ code, period, slug }) =>
			dispatch({
				type: actions.GET_DEPARTMENT_EMPLOYEES.REQUEST,
				payload: { code, period, slug },
			}),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentListContainer);

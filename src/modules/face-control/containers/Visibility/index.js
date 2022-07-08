import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, get } from 'lodash';
import actions from '../../actions';
import InputGroup from '../../components/InputGroup/InputGroup';
import moment from 'moment';
import TableWriteReason from '../../components/Table/TableWriteReason';
import Loader from '../../../../components/Loader';
class VisibilityContainer extends Component {
	state = {
		period: moment().format('YYYY-MM'),
		openModal: false,
		day: null,
		work_hour: null,
		full_name: null,
		tab_num: null,
	};
	componentDidMount() {
		const { period } = this.state;
		const { VisibilityEmployees } = this.props;
		VisibilityEmployees({ period });
	}

	getVisibilityEmployeesHandler = () => {
		const { period } = this.state;
		const { VisibilityEmployees } = this.props;
		VisibilityEmployees({ period });
	};
	datePickerHandler = (period) => {
		return this.setState({ period: period });
	};
	btnHandler = () => {
		this.getVisibilityEmployeesHandler();
	};

	openReasonModaLEmployee = (day, work_hour, full_name, tab_num) => {
		this.setState({ openModal: true, day, work_hour, full_name, tab_num });
	};
	closeReasonModalEmployee = () => {
		this.setState({ openModal: false });
	};
	render() {
		const dateFormat = 'YYYY-MM';
		const { openModal, day, work_hour, full_name, tab_num, period } = this.state;
		const { getVisibilityEmployees, isFetched } = this.props;
		return (
			<>
				<InputGroup
					datePickerHandler={this.datePickerHandler}
					btnHandler={this.btnHandler}
					dateFormat={dateFormat}
					picker="month"
					isShowed={true}
				/>
				{!isFetched && <Loader />}
				{!isEmpty(getVisibilityEmployees) && (
					<TableWriteReason
						items={getVisibilityEmployees}
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
				{isEmpty(getVisibilityEmployees) && isFetched && <p className="search-data">Маълумот йўқ</p>}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isFetched: get(state, 'face.isFetched', false),
		getVisibilityEmployees: get(state, 'face.getVisibilityEmployees', {}),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		VisibilityEmployees: ({ period }) =>
			dispatch({
				type: actions.GET_VISIBILITY_EMPLOYEES.REQUEST,
				payload: { period },
			}),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(VisibilityContainer);

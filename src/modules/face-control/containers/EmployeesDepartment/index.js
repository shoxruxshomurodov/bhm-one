import React, { Component } from 'react';
import Chart from '../../components/drawChart/Chart';
import LeftTab from './LeftTab';
import RightTab from './RightTab';
import InputGroup from '../../components/InputGroup/InputGroup';
import Tab from '../../components/Tab/Tab';
import actions from '../../actions';
import { connect } from 'react-redux';
import { get, isEqual } from 'lodash';
import moment from 'moment';
class EmployeesDepartment extends Component {
	state = {
		period: moment(new Date(), 'YYYY-MM-DD'),
		tab_index: null,
	};
	componentDidMount() {
		const { getDepartment } = this.props;
		let { period } = this.state;
		getDepartment({ period });
	}
	datePickerHandler = (period) => {
		return this.setState({ period });
	};

	btnDepartmentList = () => {
		const { getDepartment } = this.props;
		const { period } = this.state;
		getDepartment({ period });
	};
	findTabIndex = (activeKey) => {
		this.setState({
			tab_index: parseInt(activeKey),
		});
	};
	render() {
		let { employees, isFetched } = this.props;
		const { tab_index } = this.state;
		const dateFormat = 'YYYY-MM-DD';
		return (
			<>
				{!isEqual(tab_index, 3) && (
					<InputGroup
						dateFormat={dateFormat}
						datePickerHandler={this.datePickerHandler}
						btnHandler={this.btnDepartmentList}
						isShowed={false}
					/>
				)}
				<Tab
					left={<LeftTab items={employees} isFetched={isFetched} />}
					center={<Chart drawChart={employees} onlyUser={false} isFetched={isFetched} />}
					right={<RightTab />}
					findTabIndex={this.findTabIndex}
				/>
			</>
		);
	}
}

const mapStateTopProps = (state) => {
	return {
		employees: get(state, 'face.employees', []),
		isFetched: get(state, 'face.isFetched', false),
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getDepartment: ({ period }) => {
			dispatch({
				type: actions.GET_DEPARTMENT.REQUEST,
				payload: { period },
			});
		},
	};
};

export default connect(mapStateTopProps, mapDispatchToProps)(EmployeesDepartment);

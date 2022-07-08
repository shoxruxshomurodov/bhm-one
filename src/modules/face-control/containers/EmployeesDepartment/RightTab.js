import React from 'react';
import InputGroup from '../../components/InputGroup/InputGroup';
import { connect } from 'react-redux';
import Table from '../../components/Table/Table';
import Loader from '../../../../components/Loader';
import moment from 'moment';
import { isEmpty, get, values } from 'lodash';
import actions from '../../actions';
class RightTab extends React.Component {
	state = {
		period: moment().format('YYYY-MM'),
		slug: 'table',
	};
	componentDidMount() {
		const { callRender, dep_code } = this.props;
		let { period, slug } = this.state;
		callRender({ code: dep_code, periodInMonthy: period, slug });
	}
	filterByPeriod = (period) => {
		return this.setState({ period });
	};

	sentToApi = () => {
		const { period, slug } = this.state;
		const { callRender, dep_code } = this.props;
		callRender({ code: dep_code, periodInMonthy: period, slug });
	};
	render() {
		let { drawTable, isFetched } = this.props;
		drawTable = values(drawTable);
		console.log(drawTable, 'drawTable');
		return (
			<>
				<InputGroup
					btnHandler={this.sentToApi}
					datePickerHandler={this.filterByPeriod}
					dateFormat="YYYY-MM"
					isShowed={false}
					picker="month"
				/>
				{!isFetched && <Loader />}
				{!isEmpty(drawTable) && <div className="table__wrapper">
					<Table items={drawTable} />
				</div>}

				{isFetched && isEmpty(drawTable) && <p className="search-data">Маълумот йўқ</p>}
			</>
		);
	}
}
const mapStateTopProps = (state) => {
	return {
		isFetched: get(state, 'face.isFetched', false),
		dep_code: get(state, 'auth.user.section.DEP_PARENT_CODE'),
		drawTable: get(state, 'face.softwareDepartmentEmployeesList', []),
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		callRender: ({ code, periodInMonthy, slug }) =>
			dispatch({
				type: actions.GET_SOFTWARE_DEPARTMENT_EMPLOYESS_LIST.REQUEST,
				payload: { code, periodInMonthy, slug },
			}),
	};
};
export default connect(mapStateTopProps, mapDispatchToProps)(RightTab);

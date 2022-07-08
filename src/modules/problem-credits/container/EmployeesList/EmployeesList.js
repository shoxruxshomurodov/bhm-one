import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import EmployeesTable from './component/Table';
import Loader from '../../../../components/Loader/Loader';
import { withRouter } from 'react-router';
import Pagination from '../../../../components/Pagination/Pagination';
import Normalizer from '../../../../services/normalizr';
import Employee from '../../../../schema/Employee';
class EmployeesList extends Component {
	componentDidMount() {
		const { callEmployeesList, region_code = '', filial_code = '' } = this.props;
		callEmployeesList({ region_code, filial_code, page: 1 });
	}
	handlePagination = (page = 1) => {
		const { callEmployeesList, region_code, filial_code } = this.props;
		callEmployeesList({ region_code, filial_code, page });
	};

	render() {
		const { drawToRender, isFetched, meta, entities } = this.props;
		const drawEmployees_list = get(
			Normalizer.Denormalize(drawToRender, { data: [Employee] }, entities),
			'data',
			[]
		);
		return (
			<div className="d-flex flex fixed-content">
				<div className="page-content w-100" id="page-content">
					<div className="bootstrap-table">
						{isFetched ? <EmployeesTable controllerIndex={drawEmployees_list} /> : <Loader />}
					</div>
					{!isEmpty(drawEmployees_list) && <Pagination meta={meta} onChange={this.handlePagination} />}
					{isEmpty(drawEmployees_list) && isFetched && <p className="search-data">Нет информации</p>}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		drawToRender: get(state, 'normalize.data.employee.result', []),
		meta: get(state, 'normalize.data.employee.result._meta', []),
		isFetched: get(state, 'normalize.data.employee.isFetched', false),
		entities: get(state, 'normalize.entities', []),
	};
};
export default connect(mapStateToProps, null)(withRouter(EmployeesList));

import React, { Component } from 'react';
import Paginate from 'react-js-pagination';
import { get } from 'lodash';
class Pagination extends Component {
	render() {
		const { meta, onChange } = this.props;
		return (
			<Paginate
				activePage={get(meta, 'currentPage')}
				itemsCountPerPage={get(meta, 'perPage', 20)}
				totalItemsCount={get(meta, 'totalCount', 1)}
				onChange={onChange}
			/>
		);
	}
}
export default Pagination;

import React from 'react';
import FilterByTypes from './FilterByTypes';
import FilterGroup from './FilterGroup';
import { isEqual } from 'lodash';
export default (props) => {
	const {
		period,
		isActive,
		type,
    filterByCategory,
		filterByType = () => {},
		filterByRegion,
		filterByFilial = () => {},
		filterByLoanStatus = () => {},
		filterByCreditType = () => {},
		filterByLoanId = () => {},
		filterByPeriod,
		sendToApi = () => {},
		regions = [],
		filials = [],
    category=[],
		loan_status = [],
		credit_type = [],
		tab_index,
	} = props;
	return (
		<div className="aside aside-sm " id="content-aside">
			<div className="modal-dialog d-flex flex-column w-md bg-body mode-dark" id="user-nav">
				<div className="navbar">
					<span className="text-md mx-2">Сана:</span>
					<button data-toggle="dropdown" className="btn btn-sm btn w-sm mb-1 bg-primary-lt no-shadow">
						{period}
					</button>
				</div>
				<div>
					<div className="sidenav p-2 ">
						<nav className="nav-active-text-primary" data-nav>
							{!isEqual(tab_index, 3) && (
								<FilterByTypes isActive={isActive} type={type} filterBy={filterByType} />
							)}
							<FilterGroup
								filterByRegion={filterByRegion}
								filterByFilial={filterByFilial}
								filterByLoanStatus={filterByLoanStatus}
								filterByCreditType={filterByCreditType}
                filterByCategory={filterByCategory}
								filterByLoanId={filterByLoanId}
								filterByPeriod={filterByPeriod}
								sendToApi={sendToApi}
								regions={regions}
								filials={filials}
                category={category}
								loan_status={loan_status}
								credit_types={credit_type}
								tab_index={tab_index}
							/>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
};

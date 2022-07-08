import React from 'react';
import Table from '../../../../components/Table/Table';
import Pagination from '../../../../components/Pagination/Pagination';
import Select from '../../../../components/Select/Select';
import Button from '../../../../components/Common/Button';
import Loader from '../../../../components/Loader';
import { isEmpty } from 'lodash';
const UnlinkedLoans = (props) => {
	const {
		options,
		drawToUnLinked_loans,
		unlinked_meta,
		sendToApi,
		checkedIdsCredits,
		onChange,
		filterByUserId,
		isFetched,
		pushedView,
	} = props;
	return (
		<>
			<div className="page-content">
				<div className="p-3">
					<div className="toolbar">
						<form className="w-100">
							<div className="d-flex w-100">
								<Select
									placeholder="Ходимларни танлаш"
									className="w-100 mr-1"
									filterBy={filterByUserId}
									options={options}
								/>
								<Button text="Бириктириш"  className="btn-primary unlinked_btn" sendToApi={sendToApi} />
							</div>
						</form>
					</div>
				</div>
				{isFetched ? (
					<Table
						body={drawToUnLinked_loans}
						head={[
							'№',
							'ID',
							'Бириктириш',
							'Мижоз номи',
							'Баланс ҳ/р',
							'Кредит миқдори ',
							'Кредит тури ',
							'Кредит қарздорлик ',
							'Муддати ўтган кредит',
							'Муддати ўтган жами фоиз',
							'Суд жараёнида',
						]}
						pushedView={pushedView}
						checkedIdsCredits={checkedIdsCredits}
						haveCheckbox={true}
					/>
				) : (
					<Loader />
				)}
				{!isEmpty(drawToUnLinked_loans) && <Pagination meta={unlinked_meta} onChange={onChange} />}
				{isEmpty(drawToUnLinked_loans) && isFetched && <p className="search-data">Маълумот йўқ</p>}
			</div>
		</>
	);
};

export default UnlinkedLoans;

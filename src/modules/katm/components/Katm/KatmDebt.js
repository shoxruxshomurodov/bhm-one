import React, { Component } from 'react';
import { Row, Col, Divider, Table, Result, Button, notification } from 'antd';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import isNil from 'lodash/isNil';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import actions from '../../Actions';
import NumberFormat from "react-number-format";

class KatmDebt extends Component {
	refreshService = () => {
		const { refresh_service, name = 'katm',client_type } = this.props;
		refresh_service({ name, client_type });
	};
	componentDidUpdate(prevProps) {
		const { isFetched: isFetchedPrev } = prevProps;
		const { isFetched, message } = this.props;
		if (isEqual(message, 'success') && !isEqual(isFetchedPrev, isFetched) && isFetched) {
			this.successNotification();
		}
		if (!isEqual(message, 'success') && !isEqual(isFetchedPrev, isFetched) && isFetched) {
			this.errorNotification();
		}
	}

	successNotification = () => {
		notification.success({
			message: `Katm data successfully refreshed`,
		});
	};

	errorNotification = () => {
		const { message } = this.props;
		notification.error({
			message: 'Katm data is not refreshed',
			description: `${message}`,
		});
	};
	render() {
		const { t, data, debts } = this.props;
		const items = get(data, 'items');
		return (
			<>
				{isNil(data) || isEqual(debts, 'null') ? (
					<Result
						status="404"
						title={t('Sorry')}
						subTitle={t('Katm data is not found.')}
						extra={
							<Button type="primary" onClick={() => this.refreshService()}>
								{t('Refresh')}
							</Button>
						}
					/>
				) : (
					<Row>
						{items &&
						items.map((item) => {
							if (isEqual(get(item, 'title'), 'nps_invoices')) {
								return '';
							}
							return (
								<Col span={8}>
									{t(get(item, 'title'))} : <a>{get(item, 'value')}</a>
								</Col>
							);
						})}
						<Table
							pagination={{ pageSize: 100 }}
							dataSource={debts}
							style={{
								width: '100%',
								marginTop: '15px',
							}}
							columns={[
								{
									title: t('НАИМЕНОВАНИЕ ОРГАНИЗАЦИИ'),
									dataIndex: 'org_name',
									key: 'org_name',
									sorter: true,
								},
								{
									title: t('КОНТРАКТА'),
									dataIndex: 'currency',
									key: 'currency',
									sorter: true,
								},
								{
									title: t(' НЕПОГАШЕННЫЕ ПРОСРОЧКИ'),
									dataIndex: 'curr_debts',
									key: 'curr_debts',
									render:(value) =>
										<NumberFormat
											value={value/100}
											displayType={'text'}
											thousandSeparator=' '
											renderText={formattedValue => formattedValue} // <--- Don't forget this!
										/>,
									sorter: true,
								},
								{
									title: t('НЕПОГАШЕННЫХ ОБЯЗАТЕЛЬСТВ'),
									dataIndex: 'all_debts',
									render:(value) =>
										<NumberFormat
											value={value/100}
											displayType={'text'}
											thousandSeparator=' '
											renderText={formattedValue => formattedValue} // <--- Don't forget this!
										/>,
									key: 'all_debts',

									sorter: true,
								},
								{
									title: t('ДАТА ОБНОВЛЕНИЯ'),
									dataIndex: 'last_update',
									key: 'last_update',
									sorter: true,
								}
							]}
						/>
					</Row>
				)}
			</>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		refresh_service: ({ name, client }) => {
			dispatch({ type: actions.REFRESH_SERVICES.REQUEST, payload: { name, client } });
		},
	};
};

const mapStateToProps = (state) => {
	return {
		isFetched: get(state, 'admin.katm.isFetched', false),
		message: get(state, 'admin.katm.data.message'),
	};
};

export default withTranslation('bhm_one')(connect(mapStateToProps, mapDispatchToProps)(KatmDebt));

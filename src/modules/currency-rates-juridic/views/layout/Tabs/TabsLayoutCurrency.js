import React, { Component } from 'react';
import '../../../../../assets/styles/style.css';
import Hat from '../../../../../components/Hat/Hat';
import WithUser from '../../../../../services/auth/rbac/WithUser';
import TabNav from '../Tabs/TabNav';
import { connect } from 'react-redux';
import CurrencyListScheme from "../../../../../schema/CurrencyListScheme";
import ApiActions from "../../../../../services/api/Actions";
class TabsLayoutCurrency extends Component {
	componentDidMount() {
		const { getAllCurrency } = this.props;
		getAllCurrency(1);
	}
	render() {
		const { children } = this.props;
		return (
			<WithUser>
				{({ userCan }) => {
					return (
						<div>
							<Hat name="Валюта курслари" />
							<div className="page-content">
								<div className="padding">
									<TabNav userCan={userCan} />
									<div className="pt-2">
									{children}
									</div>
								</div>
							</div>
						</div>
					);
				}}
			</WithUser>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return{
		getAllCurrency: ({page = 1}) => {
			const storeName = 'currency-list';
			const entityName = 'currency';
			const scheme = {data: [CurrencyListScheme]};
			dispatch({
				type: ApiActions.GET_ALL.REQUEST,
				payload: {
					url: '/course/passport-course/index',
					config: {
						params: {
							include:'employee',
							page
						},
					},
					scheme,
					storeName,
					entityName,
				},
			});
		},
	}
}
export default connect(null, mapDispatchToProps)(TabsLayoutCurrency);

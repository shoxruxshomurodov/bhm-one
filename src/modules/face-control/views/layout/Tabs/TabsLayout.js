import React, { Component } from 'react';
import '../../../../../assets/styles/style.css';
import Hat from '../../../../../components/Hat/Hat';
import WithUser from '../../../../../services/auth/rbac/WithUser';
import TabNav from '../Tabs/TabNav';
import { connect } from 'react-redux';
import actions from '../../../actions';
class TabsLayout extends Component {
	componentDidMount() {
		const { getPersonalMonthly,getDepartmentList } = this.props;
		getPersonalMonthly();
		getDepartmentList();
	}
	render() {
		const { children } = this.props;
		return (
			<WithUser>
				{({ userCan }) => {
					return (
						<div>
							<Hat name="Face Control" />
							<div className="page-content">
								<div className="padding">
									<TabNav userCan={userCan} />
									<div className="pt-3"> 
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
	return {
		getDepartmentList: () => dispatch({ type: actions.GET_DEPARTMENT_LIST.REQUEST }),
		getPersonalMonthly: () => {
			dispatch({ type: actions.GET_PERSONAL_MONTHLY.REQUEST });
		},
	};
};
export default connect(null, mapDispatchToProps)(TabsLayout);

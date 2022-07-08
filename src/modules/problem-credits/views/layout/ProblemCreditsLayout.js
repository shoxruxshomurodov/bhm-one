import React, { Component } from 'react';
import Hat from '../../../../components/Hat/Hat';
import ProblemCreditsNav from './ProblemCreditsNav';
import WithUser from '../../../../services/auth/rbac/WithUser';
class ProblemCreditsLayout extends Component {
	render() {
		const { children } = this.props;
		return (
			<WithUser>
				{({ userCan }) => {
					return (
						<div>
							<Hat
								name="Кредит портфели"
								desc="АБС дастуридан юкланаётган кредит портфели маълумотлар базаси"
							/>
							<div className="page-content">
								<div className="padding">
									<ProblemCreditsNav userCan={userCan} />
									{children}
								</div>
							</div>
						</div>
					);
				}}
			</WithUser>
		);
	}
}

export default ProblemCreditsLayout;

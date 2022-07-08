import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Utils from '../../../../services/helpers/Utils';
import config from '../../../../config';
import { connect } from 'react-redux';
import { get } from 'lodash';
class ProblemCreditsNav extends Component {
	render() {
		const { userCan } = this.props;
		return (
			<div className="nav-active-border b-primary bottom">
				<ul className="nav" role="tablist">
					<li className="nav-item all">
						{Utils.userCanStyle(userCan, config.ROLES.COLLECTOR_ADMIN) && (
							<NavLink to="/problem-credits/all" className="nav-link">
								Все
							</NavLink>
						)}
					</li>
					<li className="nav-item one-to-thirty">
						{Utils.userCanStyle(userCan, config.ROLES.COLLECTOR_ADMIN) && (
							<NavLink to="/problem-credits/one-to-thirty" className="nav-link">
								Қарздорлик 1 - 30 кунгача
							</NavLink>
						)}
					</li>
					<li className="nav-item thirty-to-sixty">
						{Utils.userCanStyle(userCan, config.ROLES.COLLECTOR_ADMIN) && (
							<NavLink to="/problem-credits/thirty-to-sixty" className="nav-link">
								Қарздорлик 31 - 60 кунгача
							</NavLink>
						)}
					</li>
					<li className="nav-item sixty-to-ninety">
						{Utils.userCanStyle(userCan, config.ROLES.COLLECTOR_ADMIN) && (
							<NavLink to="/problem-credits/sixty-to-ninety" className="nav-link">
								Қарздорлик 61 - 90 кунгача
							</NavLink>
						)}
					</li>
					<li className="nav-item ninety-to-all">
						{Utils.userCanStyle(userCan, config.ROLES.COLLECTOR_ADMIN) && (
							<NavLink to="/problem-credits/ninety-to-all" className="nav-link">
								Қарздорлик 91 - 180 кунгача
							</NavLink>
						)}
					</li>
					<li className="nav-item all-to-all">
						{Utils.userCanStyle(userCan, config.ROLES.COLLECTOR_ADMIN) && (
							<NavLink to="/problem-credits/hundred-to-all" className="nav-link">
								181 кундан ортиқ муддат
							</NavLink>
						)}
					</li>
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		region_code: get(state, 'problem_credits.region_code', ''),
		filial_code: get(state, 'problem_credits.filial_code', ''),
		time: get(state, 'problem_credits.time', false),
	};
};
export default connect(mapStateToProps)(ProblemCreditsNav);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './styles/loginLayout.css';
import { get, isEqual } from 'lodash';
import storage from '../../../services/storage';
import LoginBgImage from './../../../assets/images/new_bg.jpg';
import Logo from '../main/components/Logo';
class LoginLayout extends Component {
	render() {
		const { children, location } = this.props;
		return (
				isEqual(location.pathname, '/auth/appeal/create') ?
					<div className="layout-column">
						<div className="d-flex flex-column flex">
									<div id="content-body" className="text-center">
										<div className="p-3 p-md-5" style={{ position: 'relative' }}>
											{children}
										</div>
									</div>
						</div>
					</div>
					:
			<div className="layout-column">
				<div className="d-flex flex-column flex">
					<div
						style={{
							display:"flex",
							justifyContent:"center",
							alignItems:"center",
							minHeight:"100vh",
							backgroundImage: 'url(' + LoginBgImage + ')',
							backgroundRepeat:"no-repeat",
							backgroundSize:"cover"
						}}
					>
						<div  style={{ backgroundColor: 'rgba(255,255,255,0.8)',width:"370px" }}> {/* className="col-md-3" */}
							<div id="content-body" className="text-center">
								<div className="p-md-4">
									{!isEqual(location.pathname, '/auth/link/employee') && (
										<div id="a-c-8">
											<Logo />
										</div>
									)}
									{children}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		lang: get(state, 'translation.lang') ? get(state, 'translation.lang') : storage.get('lang'),
	};
};
export default connect(mapStateToProps, null)(withRouter(LoginLayout));

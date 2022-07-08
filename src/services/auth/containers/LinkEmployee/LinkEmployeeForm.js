import React, { Component } from 'react';
import { Formik } from 'formik';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import InputMask from 'react-input-mask';
import iabs_help_img from '../../../../assets/images/iabs_user_code.png';
import storage from '../../../storage';

class LinkEmployeeForm extends Component {
	goHome = () => {
		const { history } = this.props;
		storage.remove('token');
		history.push('/auth');
		window.location.reload();
	};
	render() {
		const { link, t } = this.props;

		return (
			<div>
				<div className="mb-3">
					<img src={iabs_help_img} alt="xb-logo" className="xb-logo-login" />
				</div>
				<Formik
					initialValues={{ profile_id: '', agree: false }}
					validate={(values) => {
						const errors = {};
						if (!values.profile_id) {
							errors.profile_id = t('Пожалуйста введите уникальный код пользователя');
						}
						if (values.profile_id && values.profile_id.length < 3) {
							errors.profile_id = t('Пожалуйста введите уникальный код пользователя');
						}
						if (!values.agree) {
							errors.agree = t('Для продолжение вам следует согласится с условиями');
						}
						return errors;
					}}
					onSubmit={(values, { setSubmitting, setFieldError }) => {
						link(values.profile_id, values.agree, {
							setSubmitting,
							setFieldError,
						});
					}}
				>
					{({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
						<form className="m-t" onSubmit={handleSubmit}>
							<div className="form-group">
								<InputMask
									type="text"
									//mask="999999"
									name="profile_id"
									className="form-control"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.value}
									placeholder={t('Уникальный код пользователя')}
									autoFocus
								/>
								<span className="text-danger">{errors.profile_id && errors.profile_id}</span>
							</div>
							<div className="form-group">
								<label>Вы согласны с условиями?</label>
								<input
									type="checkbox"
									name="agree"
									className="form-control"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.agree}
									placeholder={t('Я согласен')}
								/>
								<span className="text-danger">{errors.agree && errors.agree}</span>
							</div>
							<button
								type="submit"
								className="btn btn-primary gd-primary btn-block full-width m-b"
								disabled={isSubmitting}
							>
								Submit
							</button>
						</form>
					)}
				</Formik>
				<button
					onClick={this.goHome}
					className="btn btn-danger gd-danger btn-block full-width m-t"
					style={{
						marginTop: '10px',
					}}
				>
					Logout
				</button>
				<p className="mt-3">
					<small>
						Акционерный коммерческий <br /> Народный банк Республики Узбекистан &copy; 2021
					</small>
				</p>
			</div>
		);
	}
}

export default withTranslation('docflow')(withRouter(LinkEmployeeForm));

import React, { Component } from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import get from 'lodash/get';
import Utils from '../../../helpers/Utils';
class ApproveForm extends Component {
	render() {
		const { submitForm, token } = this.props;
		return (
			<div>
				<h4>{Utils.hideNumber(get(token, 'user.phone', ''))}</h4>
				<Formik
					initialValues={{ secret: '' }}
					validate={(values) => {
						const errors = {};
						if (
							values.secret &&
							values.secret.replace(/\D/g, '').length < 5 &&
							values.secret.replace(/\D/g, '').length > 0
						) {
							errors.secret = 'Код введен не полностью';
						}
						if (!values.secret) {
							errors.secret = 'Пожалуйста введите код потверждение';
						}
						return errors;
					}}
					onSubmit={(values, { setSubmitting, setFieldError }) => {
						submitForm(values, { setSubmitting, setFieldError });
					}}

				>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
						<form className="m-t" onSubmit={handleSubmit}>
							<div className="form-group">
								<label className="m-3">
									Мы отправили код активации на ваш телефон. Пожалуйста, введите ниже.
								</label>
								<InputMask
									mask="99999"
									type="text"
									name="secret"
									className="form-control text-center"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.secret}
									disabled={isSubmitting}
									placeholder="код"
									style={{ fontSize: '1.2rem' }}
									autoFocus
								/>
								<span className="text-danger font-weight-bold">
									{' '}
									{errors.secret && touched.secret && errors.secret}
								</span>
							</div>
							<Link to="/auth" className="btn btn-white btn-md">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width={16}
									height={16}
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-arrow-left mx-2"
								>
									<line x1={19} y1={12} x2={5} y2={12} />
									<polyline points="12 19 5 12 12 5" />
								</svg>
								Назад
							</Link>
							<button
								type="submit"
								className="btn btn-warning btn-md"
								style={{ marginLeft: '5px' }}
								disabled={isSubmitting}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-check mx-2"
								>
									<polyline points="20 6 9 17 4 12"></polyline>
								</svg>
								Потвердить
							</button>
						</form>
					)}
				</Formik>
			</div>
		);
	}
}

export default ApproveForm;

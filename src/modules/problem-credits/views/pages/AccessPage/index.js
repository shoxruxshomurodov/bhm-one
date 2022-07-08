import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import InputMask from 'react-input-mask';
// import * as Yup from 'yup';
import { request } from '../../../../../services/api';
import DinamicAlert from '../../../../../components/SweetAlert/DinamicAlert';
// const phoneSchema = Yup.object().shape({
// 	phone: Yup.string()
// 		.min(17, 'введите свой номер полностью')
// 		.max(17, 'введите свой номер полностью')
// 		.required('Пожалуйста введите ваш телефонный номер'),
// });
class index extends Component {
	state = {
		message: '',
		code: '',
		isFetched: false,
	};
	AccessEmployee = (values, { setSubmitting }) => {
		const phone = values.phone.replace(/\s/g, '').slice(1);
		request
			.post('/problem-credit/rbac/assign', { phone })
			.then((success) => {
				const {
					data: { message, code },
				} = success;
				this.setState({ message, code, isFetched: true });
				setSubmitting(false);
			})
			.catch((_error) => {
				this.setState({ message: 'Ходим топилмади', code: 404, isFetched: true });
				setSubmitting(false);
			});
	};
	render() {
		const { message, code, isFetched } = this.state;

		return (
			<div className="page-content" id="page-content">
				<div className="padding">
					<Formik
						initialValues={{ phone: '' }}
						validate={(values) => {
							const errors = {};
							if (!values.phone) {
								errors.phone = 'Пожалуйста введите ваш телефонный номер';
							}
							if (
								values.phone &&
								values.phone.replace(/\D/g, '').length < 12 &&
								values.phone.replace(/\D/g, '').length > 0
							) {
								errors.phone = 'введите свой номер полностью';
							}
							return errors;
						}}
						onSubmit={(values, { setSubmitting, setFieldError }) => {
							this.AccessEmployee(values, { setSubmitting, setFieldError });
						}}
					>
						{({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
							<Form className="m-t mode-dark" onSubmit={handleSubmit}>
								<div className="form-group">
									<div className="input-group">
										<InputMask
											type="text"
											name="phone"
											mask="+\9\98 99 999 99 99"
											className="form-control text-center mode-dark "
											placeholder="Ходим телефон рақами"
											style={{ fontSize: '1.2rem' }}
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.phone}
											disabled={isSubmitting}
										/>
										<div className="input-group-append">
											<button
												className="btn btn-outline-secondary"
												disabled={isSubmitting}
												type="submit"
											>
												Доступ бериш
											</button>
										</div>
									</div>
									<p className="text-danger text-center mt-2 font-weight-bold">
										{errors.phone && errors.phone}
									</p>
								</div>
							</Form>
						)}
					</Formik>
					{isFetched && <DinamicAlert message={message} code={code} />}
				</div>
			</div>
		);
	}
}
export default index;

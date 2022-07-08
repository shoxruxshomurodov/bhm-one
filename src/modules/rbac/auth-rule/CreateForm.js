import * as React from 'react';
import {Formik} from 'formik';
import {Button, Form, Input} from 'antd';
import get from 'lodash/get';

export function CreateForm({ create }) {
	const layout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 18 },
	};
	return (
		<Formik
			initialValues={{
				name: null,
				data: null,
			}}
			onSubmit={(values, actions) => {
				create(values, actions);
			}}
		>
			{({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting }) => {
				return (
					<>
						<Form {...layout} onFinish={handleSubmit}>
							<Form.Item
								label="Имя"
								name="name"
								hasFeedback={get(errors, 'name', []).length > 0}
								validateStatus={get(errors, 'name', []).length > 0 ? 'error' : ''}
								help={
									get(errors, 'name', []).length > 0
										? errors.name && touched.name && errors.name
										: null
								}
							>
								<Input
									size="middle"
									type="text"
									name="name"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.name}
									placeholder={'Имя'}
									disabled={isSubmitting}
								/>
							</Form.Item>
							<Form.Item
								label="Данные"
								name="data"
								// hasFeedback={get(errors, 'data', []).length > 0}
								// validateStatus={get(errors, 'data', []).length > 0 ? 'error' : ''}
								// help={
								// 	get(errors, 'data', []).length > 0
								// 		? errors.data && touched.data && errors.data
								// 		: null
								// }
							>
								<Input.TextArea
									size="middle"
									type="text"
									name="data"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.data}
									placeholder={'Данные'}
									disabled={isSubmitting}
								/>
							</Form.Item>
							<Form.Item className="text-center">
								<Button type="primary" htmlType="submit">
									Создать
								</Button>
							</Form.Item>
						</Form>
					</>
				);
			}}
		</Formik>
	);
}

import React from 'react';
import {Formik} from 'formik';
import {Button, Form, Input} from 'antd';
import get from 'lodash/get';

export function UpdateForm({ attributes = {}, update }) {
	const layout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 18 },
	};
	return (
		<Formik
			initialValues={{
				...attributes,
			}}
			onSubmit={(values, actions) => {

				update(values, actions);
			}}
		>
			{({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting }) => {
				return (
					<>
						<Form {...layout} onFinish={handleSubmit}>
							<Form.Item
								label="Название"
								name="title"
								hasFeedback={get(errors, 'title', []).length > 0}
								validateStatus={get(errors, 'title', []).length > 0 ? 'error' : ''}
								help={
									get(errors, 'title', []).length > 0
										? errors.title && touched.title && errors.title
										: null
								}
							>
								<Input
									size="middle"
									type="text"
									name="title"
									onChange={handleChange}
									onBlur={handleBlur}
									defaultValue={values.title}
									value={values.title}
									placeholder={`Название`}
									disabled={isSubmitting}
								/>
							</Form.Item>
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
									defaultValue={values.name}
									placeholder={'Имя'}
									disabled={isSubmitting}
								/>
							</Form.Item>
							<Form.Item className="text-center">
								<Button type="primary" htmlType="submit">
									Изменить
								</Button>
							</Form.Item>
						</Form>
					</>
				);
			}}
		</Formik>
	);
}

import * as React from 'react';
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
									defaultValue={values.name}
									disabled={isSubmitting}
								/>
							</Form.Item>
							<Form.Item
								label="Type"
								name="type"
								hasFeedback={get(errors, 'type', []).length > 0}
								validateStatus={get(errors, 'type', []).length > 0 ? 'error' : ''}
								help={
									get(errors, 'type', []).length > 0
										? errors.type && touched.type && errors.type
										: null
								}
							>
								<Input
									size="middle"
									type="text"
									name="type"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.type}
									placeholder={'Type'}
									defaultValue={values.type}
									disabled={isSubmitting}
								/>
							</Form.Item>
							<Form.Item
								label="Description"
								name="description"
								hasFeedback={get(errors, 'description', []).length > 0}
								validateStatus={get(errors, 'description', []).length > 0 ? 'error' : ''}
								help={
									get(errors, 'description', []).length > 0
										? errors.description && touched.description && errors.description
										: null
								}
							>
								<Input
									size="middle"
									type="text"
									name="description"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.description}
									defaultValue={values.description}
									placeholder={'Description'}
									disabled={isSubmitting}
								/>
							</Form.Item>
							<Form.Item
								label="Rule name"
								name="rule_name"
								hasFeedback={get(errors, 'rule_name', []).length > 0}
								validateStatus={get(errors, 'rule_name', []).length > 0 ? 'error' : ''}
								help={
									get(errors, 'rule_name', []).length > 0
										? errors.rule_name && touched.rule_name && errors.rule_name
										: null
								}
							>
								<Input
									size="middle"
									type="text"
									name="rule_name"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.rule_name}
									defaultValue={values.rule_name}
									placeholder={'Rule name'}
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

import * as React from 'react';
import {Formik} from 'formik';
import {Button, Form, Select} from 'antd';
import get from 'lodash/get';
const { Option } = Select;
export function CreateForm({ create, auth_item_list }) {
	const layout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 18 },
	};
	return (
		<Formik
			initialValues={{
				parent: null,
				child: null,
			}}
			onSubmit={(values, actions) => {
				create(values, actions);
			}}
		>
			{({ handleSubmit, handleChange, handleBlur, setFieldValue, values, errors, touched, isSubmitting }) => {
				return (
					<>
						<Form {...layout} onFinish={handleSubmit}>
							<Form.Item
								name="parent"
								label="Parent"
								hasFeedback={get(errors, 'parent', []).length > 0}
								validateStatus={get(errors, 'parent', []).length > 0 ? 'error' : ''}
								help={
									get(errors, 'parent', []).length > 0
										? errors.parent && touched.parent && errors.parent
										: null
								}
							>
								<Select
									showSearch
									placeholder="Parent"
									defaultActiveFirstOption={false}
									showArrow={true}
									filterOption={true}
									notFoundContent={null}
									value={values.value}
									onChange={(value) => setFieldValue('parent', value)}
								>
									{auth_item_list &&
										auth_item_list.map((item) => (
											<Option value={get(item, 'name')}>{get(item, 'name')}</Option>
										))}
								</Select>
							</Form.Item>

							<Form.Item
								name="child"
								label="Child"
								hasFeedback={get(errors, 'child', []).length > 0}
								validateStatus={get(errors, 'child', []).length > 0 ? 'error' : ''}
								help={
									get(errors, 'child', []).length > 0
										? errors.child && touched.child && errors.child
										: null
								}
							>
								<Select
									showSearch
									placeholder="Child"
									defaultActiveFirstOption={false}
									showArrow={true}
									filterOption={true}
									notFoundContent={null}
									value={values.value}
									onChange={(value) => setFieldValue('child', value)}
								>
									{auth_item_list &&
										auth_item_list.map((item) => (
											<Option value={get(item, 'name')}>{get(item, 'name')}</Option>
										))}
								</Select>
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

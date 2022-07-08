import * as React from 'react';
import {useEffect} from 'react';
import {Formik} from 'formik';
import {Button, Checkbox, Form, Input, Radio, Select} from 'antd';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import {useDispatch, useSelector} from 'react-redux';
import Normalizer from '../../../../../services/normalizer';
import UserScheme from '../../../../../schema/User';
import ApiActions from '../../../../../services/api/Actions';
import Structure from '../../../../../schema/Structure';
import AuthItem from '../../../../../schema/AuthItem';
import SelectAsyncPaginate from "../../../components/AsyncSelect/AsyncSelect";

const { Option } = Select;
const { TextArea } = Input;

export function CreateForm({ create, transition_list_data }) {
	const layout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 18 },
	};
	const dispatch = useDispatch();

	const optionsTypes = [
		{ label: 'Пользовател', value: 'xbsoft\\auth\\models\\User' },
		{ label: 'Структура', value: 'xbsoft\\crm\\models\\Structure' },
		{ label: 'Права', value: 'xbsoft\\rbac\\models\\AuthItem' },
	];

	const entities = useSelector((state) => get(state, 'normalizer.entities'));

	const resultUserIsFetched = useSelector((state) =>
		get(state, 'normalizer.data.transition-permission-user-list.isFetched')
	);
	const resultUserList = useSelector((state) => get(state, 'normalizer.data.transition-permission-user-list.result'));
	const resultUserListData = Normalizer.Denormalize(resultUserList, { data: [UserScheme] }, entities);
	const resultUserData = get(resultUserListData, 'data', []);
	const getUsersData = () => {
		dispatch({
			type: ApiActions.GET_ALL.REQUEST,
			payload: {
				url: `/auth/user/`,
				config: {
					params: {
						'per-page': 100,
					},
				},
				scheme: { data: [UserScheme] },
				storeName: 'transition-permission-user-list',
				entityName: 'user',
			},
		});
	};

	const resultStructuresIsFetched = useSelector((state) =>
		get(state, 'normalizer.data.transition-permission-structures.isFetched')
	);
	const resultStructuresList = useSelector((state) =>
		get(state, 'normalizer.data.transition-permission-structures.result')
	);
	const resultStructuresListData = Normalizer.Denormalize(resultStructuresList, { data: [Structure] }, entities);
	const resultStructuresData = get(resultStructuresListData, 'data', []);
	const getStructuresData = () => {
		dispatch({
			type: ApiActions.GET_ALL.REQUEST,
			payload: {
				url: `/crm/structure/`,
				config: {
					params: {
						'per-page': 100,
					},
				},
				scheme: { data: [Structure] },
				storeName: 'transition-permission-structures',
				entityName: 'structure',
			},
		});
	};

	const resultAuthItemsIsFetched = useSelector((state) =>
		get(state, 'normalizer.data.transition-permission-auth-items.isFetched')
	);
	const resultAuthItemsList = useSelector((state) =>
		get(state, 'normalizer.data.transition-permission-auth-items.result')
	);
	const resultAuthItemsListData = Normalizer.Denormalize(resultAuthItemsList, { data: [AuthItem] }, entities);
	const resultAuthItemsData = get(resultAuthItemsListData, 'data', []);
	const getAuthItemsData = () => {
		dispatch({
			type: ApiActions.GET_ALL.REQUEST,
			payload: {
				url: `/rbac/auth-item/`,
				config: {
					params: {
						'per-page': 100,
					},
				},
				scheme: { data: [AuthItem] },
				storeName: 'transition-permission-auth-items',
				entityName: 'auth-item',
			},
		});
	};

	useEffect(() => {
		getStructuresData();
		getUsersData();
		getAuthItemsData();
	}, []);

	return (
		<Formik
			initialValues={{
				transition_id: null,
				permissionable_id: null,
				permissionable_type: 'xbsoft\\auth\\models\\User',
				from_permissionable_type: 'xbsoft\\auth\\models\\User',
				credit_product_id: null
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
								label="Кому"
								name="permissionable_type"
								hasFeedback={get(errors, 'permissionable_type', []).length > 0}
								validateStatus={get(errors, 'permissionable_type', []).length > 0 ? 'error' : ''}
								help={
									get(errors, 'permissionable_type', []).length > 0
										? errors.permissionable_type &&
										  touched.permissionable_type &&
										  errors.permissionable_type
										: null
								}
							>
								<Radio.Group
									options={optionsTypes}
									onChange={(e) => setFieldValue('permissionable_type', e.target.value)}
									value={values.permissionable_type}
									defaultValue={values.permissionable_type}
									optionType="button"
									buttonStyle="solid"
								/>
							</Form.Item>
							<Form.Item
								label="ID"
								name="permissionable_id"
								hasFeedback={get(errors, 'permissionable_id', []).length > 0}
								validateStatus={get(errors, 'permissionable_id', []).length > 0 ? 'error' : ''}
								help={
									get(errors, 'permissionable_id', []).length > 0
										? errors.permissionable_id &&
										  touched.permissionable_id &&
										  errors.permissionable_id
										: null
								}
							>
								{isEqual(get(values, 'permissionable_type'), 'xbsoft\\auth\\models\\User') && (
									<Select
										showSearch
										placeholder="User"
										defaultActiveFirstOption={false}
										showArrow={true}
										filterOption={true}
										notFoundContent={null}
										value={values.permissionable_id}
										onChange={(value) => setFieldValue('permissionable_id', value)}
									>
										{resultUserData &&
											resultUserData.map((user) => (
												<Option value={get(user, 'id')}>{get(user, 'phone')}</Option>
											))}
									</Select>
								)}
								{isEqual(get(values, 'permissionable_type'), 'xbsoft\\crm\\models\\Structure') && (
									<Select
										showSearch
										placeholder="Структура"
										defaultActiveFirstOption={false}
										showArrow={true}
										filterOption={true}
										notFoundContent={null}
										value={values.permissionable_id}
										onChange={(value) => setFieldValue('permissionable_id', value)}
									>
										{resultStructuresData &&
											resultStructuresData.map((structure) => (
												<Option value={get(structure, 'id')}>{get(structure, 'title')}</Option>
											))}
									</Select>
								)}
								{isEqual(get(values, 'permissionable_type'), 'xbsoft\\rbac\\models\\AuthItem') && (
									<Select
										showSearch
										placeholder="Права"
										defaultActiveFirstOption={false}
										showArrow={true}
										filterOption={true}
										notFoundContent={null}
										value={values.permissionable_id}
										onChange={(value) => setFieldValue('permissionable_id', value)}
									>
										{resultAuthItemsData &&
											resultAuthItemsData.map((authItem) => (
												<Option value={get(authItem, 'name')}>{get(authItem, 'name')}</Option>
											))}
									</Select>
								)}
							</Form.Item>

							<Form.Item
								label="От"
								name="from_permissionable_type"
								hasFeedback={get(errors, 'from_permissionable_type', []).length > 0}
								validateStatus={get(errors, 'from_permissionable_type', []).length > 0 ? 'error' : ''}
								help={
									get(errors, 'from_permissionable_type', []).length > 0
										? errors.from_permissionable_type &&
										touched.from_permissionable_type &&
										errors.from_permissionable_type
										: null
								}
							>
								<Radio.Group
									options={optionsTypes}
									onChange={(e) => setFieldValue('from_permissionable_type', e.target.value)}
									value={values.from_permissionable_type}
									defaultValue={values.from_permissionable_type}
									optionType="button"
									buttonStyle="solid"
								/>
							</Form.Item>

							<Form.Item
								label="От"
								name="from_permissionable_id"
								hasFeedback={get(errors, 'from_permissionable_id', []).length > 0}
								validateStatus={get(errors, 'from_permissionable_id', []).length > 0 ? 'error' : ''}
								help={
									get(errors, 'from_permissionable_id', []).length > 0
										? errors.from_permissionable_id &&
										touched.from_permissionable_id &&
										errors.permissionable_id
										: null
								}
							>
								{isEqual(get(values, 'from_permissionable_type'), 'xbsoft\\auth\\models\\User') && (
									<Select
										showSearch
										placeholder="User"
										defaultActiveFirstOption={false}
										showArrow={true}
										filterOption={true}
										notFoundContent={null}
										value={values.from_permissionable_id}
										onChange={(value) => setFieldValue('from_permissionable_id', value)}
									>
										{resultUserData &&
										resultUserData.map((user) => (
											<Option value={get(user, 'id')}>{get(user, 'phone')}</Option>
										))}
									</Select>
								)}
								{isEqual(get(values, 'from_permissionable_type'), 'xbsoft\\crm\\models\\Structure') && (
									<Select
										showSearch
										placeholder="Структура"
										defaultActiveFirstOption={false}
										showArrow={true}
										filterOption={true}
										notFoundContent={null}
										value={values.from_permissionable_id}
										onChange={(value) => setFieldValue('from_permissionable_id', value)}
									>
										{resultStructuresData &&
										resultStructuresData.map((structure) => (
											<Option value={get(structure, 'id')}>{get(structure, 'title')}</Option>
										))}
									</Select>
								)}
								{isEqual(get(values, 'from_permissionable_type'), 'xbsoft\\rbac\\models\\AuthItem') && (
									<Select
										showSearch
										placeholder="Права"
										defaultActiveFirstOption={false}
										showArrow={true}
										filterOption={true}
										notFoundContent={null}
										value={values.from_permissionable_id}
										onChange={(value) => setFieldValue('from_permissionable_id', value)}
									>
										{resultAuthItemsData &&
										resultAuthItemsData.map((authItem) => (
											<Option value={get(authItem, 'name')}>{get(authItem, 'name')}</Option>
										))}
									</Select>
								)}
							</Form.Item>

							<Form.Item
								name="transition_id"
								label="Переход"
								hasFeedback={get(errors, 'transition_id', []).length > 0}
								validateStatus={get(errors, 'transition_id', []).length > 0 ? 'error' : ''}
								help={
									get(errors, 'transition_id', []).length > 0
										? errors.transition_id && touched.transition_id && errors.transition_id
										: null
								}
							>
								<SelectAsyncPaginate
									url="/workflow/transition"
									placeholder="Переходы"
									onChange={(value) => setFieldValue('transition_id', value.id)}
								/>
							</Form.Item>
							<Form.Item
								label="Продукт"
								name="credit_product_id"
								hasFeedback={get(errors, 'credit_product_id', []).length > 0}
								validateStatus={get(errors, 'credit_product_id', []).length > 0 ? 'error' : ''}
								help={
									get(errors, 'credit_product_id', []).length > 0
										? errors.credit_product_id &&
										touched.credit_product_id &&
										errors.credit_product_id
										: null
								}
							>
								<SelectAsyncPaginate url="/credit/credit-product/" placeholder="Продукт" onChange={(value) => setFieldValue('credit_product_id', value.id)} />

							</Form.Item>

							<Form.Item
								label="Тип Продукт"
								name="credit_product_type_id"
								hasFeedback={get(errors, 'credit_product_type_id', []).length > 0}
								validateStatus={get(errors, 'credit_product_type_id', []).length > 0 ? 'error' : ''}
								help={
									get(errors, 'credit_product_type_id', []).length > 0
										? errors.credit_product_type_id &&
										touched.credit_product_type_id &&
										errors.credit_product_type_id
										: null
								}
							>
								<SelectAsyncPaginate url="/credit/credit-product-type/" placeholder="Продукт Тип" onChange={(value) => setFieldValue('credit_product_type_id', value.id)} />

							</Form.Item>

							<Form.Item
								label="Направление Продукт"
								name="credit_product_direction_id"
								hasFeedback={get(errors, 'credit_product_direction_id', []).length > 0}
								validateStatus={get(errors, 'credit_product_direction_id', []).length > 0 ? 'error' : ''}
								help={
									get(errors, 'credit_product_direction_id', []).length > 0
										? errors.credit_product_direction_id &&
										touched.credit_product_direction_id &&
										errors.credit_product_direction_id
										: null
								}
							>
								<SelectAsyncPaginate url="/credit/credit-product-direction/" placeholder="Продукт Направление" onChange={(value) => setFieldValue('credit_product_direction_id', value.id)} />

							</Form.Item>

							<Form.Item
								label="Условие выражение"
								name="expr"
								hasFeedback={get(errors, "expr", []).length > 0}
								validateStatus={get(errors, "expr", []).length > 0 ? "error" : ""}
								help={get(errors, "expr", []).length > 0 ? errors.expr && touched.expr && errors.expr : null}
							>
								<TextArea
									style={{
										width: '100%'
									}}
									onChange={(e) => setFieldValue('expr', e.target.value)}
									onBlur={handleBlur}
									value={values.expr}
									defaultValue={values.expr}
									disabled={isSubmitting}
								/>
							</Form.Item>

							<Form.Item
								label="Условие отображение"
								name="apply_expr"
								hasFeedback={get(errors, "apply_expr", []).length > 0}
								validateStatus={get(errors, "apply_expr", []).length > 0 ? "error" : ""}
								help={get(errors, "apply_expr", []).length > 0 ? errors.apply_expr && touched.apply_expr && errors.apply_expr : null}
							>
								<TextArea
									style={{
										width: '100%'
									}}
									onChange={(e) => setFieldValue('apply_expr', e.target.value)}
									onBlur={handleBlur}
									value={values.apply_expr}
									defaultValue={values.apply_expr}
									disabled={isSubmitting}
								/>
							</Form.Item>

							<Form.Item
								name="is_public"
								label="Публично"
								hasFeedback={get(errors, 'is_public', []).length > 0}
								validateStatus={get(errors, 'is_public', []).length > 0 ? 'error' : ''}
								help={
									get(errors, 'is_public', []).length > 0
										? errors.is_public && touched.is_public && errors.is_public
										: null
								}
							>
								<Checkbox
									onChange={handleChange}
									onBlur={handleBlur}
									checked={values.is_public}
									defaultChecked={values.is_public}
									disabled={isSubmitting}
								>
									Публично
								</Checkbox>
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

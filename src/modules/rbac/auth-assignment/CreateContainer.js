import * as React from 'react';
import {useEffect} from 'react';
import {CreateForm} from './CreateForm';
import {useDispatch, useSelector} from 'react-redux';
import {notification} from 'antd';
import get from 'lodash/get';
import Normalizer from '../../../services/normalizr';
import ApiActions from '../../../services/api/Actions';
import AuthItemScheme from '../../../schema/AuthItem';
import AuthAssignmentScheme from "../../../schema/AuthAssignment";
import UserScheme from '../../../schema/User';

export function CreateContainer() {
	const dispatch = useDispatch();
	const entities = useSelector((state) => get(state, 'normalize.entities'));
	const resultList = useSelector((state) => get(state, 'normalize.data.auth-item-list.result'));
	const resultListData = Normalizer.Denormalize(resultList, { data: [AuthItemScheme] }, entities);
	const resultData = get(resultListData, 'data', []);
	const resultUserList = useSelector((state) => get(state, 'normalize.data.auth-user-list.result'));
	const resultUserListData = Normalizer.Denormalize(resultUserList, { data: [UserScheme] }, entities);
	const resultUserData = get(resultUserListData, 'data', []);
	const create = (attributes, formMethods) => {
		const url = "/rbac/auth-assignment";
		const storeName ="auth-assignment-create";
		const entityName  = "authAssignment";
		const scheme = AuthAssignmentScheme;
		dispatch({
			type: ApiActions.OPERATION_ADD.REQUEST,
			payload: {
				url,
				attributes,
				formMethods,
				storeName,
				entityName,
				scheme,
				cb: {
					success: (nData, data) => {
						notification['success']({
							message: 'Успешно',
							description: 'Создано',
							placement: 'topRight',
						});
					},
					fail: (e) => {
						const data = get(e, 'response.data', []);
						data.map((item) => {
							notification['error']({
								message: 'Ошибка',
								description: item.message,
								placement: 'topRight',
							});
						});
					},
				},
			},
		});
	};

	const getAuthItemData = () => {
		dispatch({
			type: ApiActions.GET_ALL.REQUEST,
			payload: {
				url: `/rbac/auth-item`,
				config: {
					params: {
						'per-page': 100,
					},
				},
				scheme: { data: [AuthItemScheme] },
				storeName: 'auth-item-list',
				entityName: 'authItem',
			},
		});
	};

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
				storeName: 'auth-user-list',
				entityName: 'user',
			},
		});
	};

	useEffect(() => {
		getAuthItemData();
		getUsersData();
	}, []);

	return (
		<CreateForm create={create} auth_item_list={resultData} auth_user_list={resultUserData} />
	);
}

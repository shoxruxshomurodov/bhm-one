import * as React from 'react';
import {CreateForm} from './CreateForm';
import {useDispatch} from 'react-redux';
import actions from './../../../services/api/Actions';
import {notification} from 'antd';
import get from 'lodash/get';
import AuthRuleScheme from "../../../schema/AuthRule";
export function CreateContainer() {
	const dispatch = useDispatch();
	const create = (attributes, formMethods) => {
		const url = "/rbac/auth-rule";
	const	storeName =  "auth-rule-create";
	const	entityName = "authRule";
	const scheme = AuthRuleScheme
		dispatch({
			type: actions.OPERATION_ADD.REQUEST,
			payload: {
				url,
				storeName,
				entityName,
				scheme,
				attributes,
				formMethods,
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

	return (
		<CreateForm create={create} />
	);
}

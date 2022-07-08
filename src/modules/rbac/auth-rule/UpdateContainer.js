import * as React from 'react';
import {useEffect} from 'react';
import ApiActions from '../../../services/api/Actions';
import AuthRuleScheme from '../../../schema/AuthRule';
import {useDispatch, useSelector} from 'react-redux';
import get from 'lodash/get';
import Normalizer from '../../../services/normalizr';
import Loader from '../../../components/Loader';
import {UpdateForm} from './UpdateForm';
import {notification} from 'antd';
export function UpdateContainer({ id }) {
	const dispatch = useDispatch();
	const entities = useSelector((state) => get(state, 'normalize.entities'));
	const isFetchedOne = useSelector((state) => get(state, 'normalize.data.auth-rule-update-one.isFetched'));
	const resultOne = useSelector((state) => get(state, 'normalize.data.auth-rule-update-one.result'));
	const dataOne = Normalizer.Denormalize(resultOne, AuthRuleScheme, entities);

	const getData = () => {
		dispatch({
			type: ApiActions.GET_ONE.REQUEST,
			payload: {
				url: `/rbac/auth-rule/${id}`,
				scheme: AuthRuleScheme,
				storeName: 'auth-rule-update-one',
				entityName: 'authRule',
			},
		});
	};

	const update = (attributes, formMethods) => {
		const url = `/rbac/auth-rule/${id}`
		const scheme = AuthRuleScheme;
		const storeName = "auth-rule-update"
		const entityName = "authRule"
		dispatch({
			type: ApiActions.OPERATION_UPDATE.REQUEST,
			payload: {
				url,
				scheme,
				storeName,
				entityName,
				attributes,
				formMethods,
				cb: {
					success: (nData, data) => {
						notification['success']({
							message: 'Успешно',
							description: 'Изменено',
							placement: 'topLeft',
						});
					},
					fail: (e) => {
						const data = get(e, 'response.data', []);
						data.map((item) => {

							notification['error']({
								message: 'Ошибка',
								description: item.message,
								placement: 'topLeft',
							});
						});
					},
				},
			},
		});
	};

	useEffect(() => {
		getData();
	}, []);
	if (!isFetchedOne) {
		return <Loader />;
	}
	return (
		<UpdateForm
			attributes={{
				name: get(dataOne, 'name'),
				data: get(dataOne, 'data'),
			}}
			update={update}
		/>
	);
}

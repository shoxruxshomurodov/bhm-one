import * as React from 'react';
import {useEffect} from 'react';
import {CreateForm} from './CreateForm';
import {useDispatch, useSelector} from 'react-redux';
import {notification, Table} from 'antd';
import get from 'lodash/get';
import ApiActions from '../../../services/api/Actions';
import Normalizer from '../../../services/normalizr';
import WorkflowTransitionScheme from '../../../schema/WorkflowTransition';

export function CreateContainer({vars = []}) {
	const dispatch = useDispatch();
	const entities = useSelector((state) => get(state, 'normalize.entities'));
	const resultTransitionList = useSelector((state) =>
		get(state, 'normalize.data.workflow-transition-select.result')
	);
	const resultTransitionListData = Normalizer.Denormalize(
		resultTransitionList,
		{ data: [WorkflowTransitionScheme] },
		entities
	);
	const resultTransitionData = get(resultTransitionListData, 'data', []);

	const create = (attributes, formMethods) => {
		const storeName = "transition-permission-create";
		const entityName = "transitionPermission";
		const scheme = TransitionPermissionScheme
		dispatch({
			type: ApiActions.OPERATION_ADD.REQUEST,
			payload: {
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

	const getWorkflowTransitionData = () => {
		dispatch({
			type: ApiActions.GET_ALL.REQUEST,
			payload: {
				url: `/workflow/transition`,
				config: {
					params: {
						'per-page': 100,
					},
				},
				scheme: { data: [WorkflowTransitionScheme] },
				storeName: 'workflow-transition-select',
				entityName: 'workflowTransition',
			},
		});
	};

	useEffect(() => {
		getWorkflowTransitionData();
	}, []);

	return (
		<div>
			<CreateForm create={create} transition_list_data={resultTransitionData} />

			<Table
				columns={[
					{
						title: 'ID',
						dataIndex: 'id',
						key: 'id'
					},
					{
						title: 'title',
						dataIndex: 'title',
						key: 'title'
					},
					{
						title: 'value',
						dataIndex: 'value',
						key: 'value'
					},
					{
						title: 'notice',
						dataIndex: 'notice',
						key: 'notice'
					},
				]}
				dataSource={vars}
			/>
		</div>
	);
}

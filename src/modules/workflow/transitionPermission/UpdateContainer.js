import * as React from 'react';
import {useEffect} from 'react';
import ApiActions from '../../../../../services/api/Actions';
import WorkflowTransitionScheme from '../../../../../schema/WorkflowTransition';
import {useDispatch, useSelector} from 'react-redux';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import Normalizer from '../../../../../services/normalizer';
import Loader from '../../../../../components/Loader';
import {usePrevious} from 'react-use';
import {UpdateForm} from './UpdateForm';
import Actions from './../../../Actions';
import {notification} from 'antd';

export function UpdateContainer({ id }) {
	const prevId = usePrevious(id);
	const dispatch = useDispatch();
	const entities = useSelector((state) => get(state, 'normalizer.entities'));
	const isFetchedOne = useSelector((state) => get(state, 'normalizer.data.workflow-transition-update-one.isFetched'));
	const resultOne = useSelector((state) => get(state, 'normalizer.data.workflow-transition-update-one.result'));
	const dataOne = Normalizer.Denormalize(resultOne, WorkflowTransitionScheme, entities);
	const getData = () => {
		dispatch({
			type: ApiActions.GET_ONE.REQUEST,
			payload: {
				url: `/workflow/transition/${id}`,
				scheme: WorkflowTransitionScheme,
				storeName: 'workflow-transition-update-one',
				entityName: 'workflowTransition',
			},
		});
	};

	const update = (attributes, formMethods) => {
		dispatch({
			type: Actions.WORKFLOW_TRANSITION_UPDATE.REQUEST,
			payload: {
				id,
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

	useEffect(() => {
		if (!isEqual(prevId, id) && isFetchedOne) {
			getData();
		}
	});

	if (!isFetchedOne) {
		return <Loader />;
	}

	return (
		<div>
			<UpdateForm
				attributes={{
					title: dataOne.title,
					name: dataOne.name,
				}}
				update={update}
			/>
		</div>
	);
}

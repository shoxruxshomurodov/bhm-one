import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import 'reset-css';
import { request } from '../../../../../services/api';
import Column from './Column';
import { keyBy, get } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../../components/Loader/Loader';
import SavedSuccessAlert from '../../../../../components/SweetAlert/SavedSucces';
import actions from '../../../actions';
const Container = styled('div')`
	display: flex;
	background-color: ${(props) => (props.isDraggingOver ? '#639ee2' : 'inherit')};
`;
const LinkedEmployeesPage = () => {
	const dispatch = useDispatch();
	const [starter, setStarter] = useState();
	const [isFetched, setIsFetched] = useState(false);
	const [saved, isSaved] = useState(false);
	const saved_success = useSelector((state) => get(state, 'problem_credits.saved_success', false));
	const drawAttachEmployees = () => {
		return request
			.get('/problem-credit/employees/filial', {
				params: {
					include: 'section',
				},
			})
			.then((result) => {
				const { data } = result;
				const initialData = {
					tasks: keyBy(
						get(data, 'tasks').map((d) => {
							return {
								id: get(d, 'USER_ID'),
								content: (
									<div>
										<b>{get(d, 'FULL_NAME')}</b> <br />{' '}
										<small style={{ color: '#a3a3a3' }}>{get(d, 'section.DEP_NAME')}</small>
									</div>
								),
							};
						}),
						'id'
					),
					columns: {
						'column-1': {
							id: 'column-1',
							title: <b>Ходимлар</b>,
							taskIds: get(data, 'unchecked'),
						},
						'column-2': {
							id: 'column-2',
							title: <b>Бириктирилган ходимлар рўйхати</b>,
							taskIds: get(data, 'checked'),
						},
					},
					columnOrder: ['column-1', 'column-2'],
				};
				setStarter(initialData);
				setIsFetched(true);
			});
	};
	useEffect(() => {
		drawAttachEmployees();
	}, []);

	const onDragEnd = ({ destination, source, draggableId, type }) => {
		if (!destination) return;
		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		const start = starter.columns[source.droppableId];
		const end = starter.columns[destination.droppableId];

		if (type === 'column') {
			const newOrder = [...starter.columnOrder];
			newOrder.splice(source.index, 1);
			newOrder.splice(destination.index, 0, draggableId);

			setStarter({
				...starter,
				columnOrder: newOrder,
			});
			return;
		}

		if (start === end) {
			const column = starter.columns[source.droppableId];
			const taskIds = [...column.taskIds];
			taskIds.splice(source.index, 1);
			taskIds.splice(destination.index, 0, draggableId);
			const newColumn = {
				...column,
				taskIds,
			};
			setStarter({
				...starter,
				columns: {
					...starter.columns,
					[column.id]: newColumn,
				},
			});
			return;
		}

		const startTaskIds = [...start.taskIds];
		const endTaskIds = [...end.taskIds];

		startTaskIds.splice(source.index, 1);
		endTaskIds.splice(destination.index, 0, draggableId);

		const newStartColumn = {
			...start,
			taskIds: startTaskIds,
		};
		const endTaskColumn = {
			...end,
			taskIds: endTaskIds,
		};

		setStarter({
			...starter,
			columns: {
				...starter.columns,
				[start.id]: newStartColumn,
				[end.id]: endTaskColumn,
			},
		});
	};

	const sendEmployeesIds = () => {
		dispatch({
			type: actions.SEND_EMPLOYEES_IDS_IMPORT.REQUEST,
			payload: { ids: get(starter, 'columns.column-2.taskIds', []).join(',') },
		});
		setTimeout(() => {
			drawAttachEmployees();
		}, 2000);
		isSaved(true);
		setTimeout(() => {
			isSaved(false);
		}, 5000);
	};
	return (
		<>
			{isFetched ? (
				<div className="mb-4">
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="all-column" type="column" direction="horizontal">
							{(provided, snapshot) => (
								<Container
									isDraggingOver={snapshot.isDraggingOver}
									{...provided.droppableProps}
									ref={provided.innerRef}
								>
									{get(starter, 'columnOrder', []).map((columnId, index) => {
										const column = starter.columns[columnId];
										const tasks = get(column, 'taskIds', []).map((taskId) => starter.tasks[taskId]);
										return <Column index={index} key={column.id} column={column} tasks={tasks} />;
									})}
									{provided.placeholder}
								</Container>
							)}
						</Droppable>
					</DragDropContext>
					<button
						className="btn btn-primary"
						onClick={sendEmployeesIds}
						style={{ marginLeft: '8px' }}
						disabled={!isSaved}
					>
						Бириктириш
					</button>
				</div>
			) : (
				<Loader />
			)}
			{saved_success && saved && <SavedSuccessAlert />}
		</>
	);
};

export default LinkedEmployeesPage;

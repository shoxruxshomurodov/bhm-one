import React from 'react';
import styled from '@emotion/styled';
import { Draggable } from 'react-beautiful-dnd';
import { get } from 'lodash';

const Container = styled('div')`
	border: 1px solid lightgrey;
	margin-bottom: 8px;
	border-radius: 2px;
	padding: 8px;
	background: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;

const Task = ({ task, index }) => {
	return (
		<Draggable draggableId={get(task, 'id')} index={index} type="task">
			{(provided, snapshot) => (
				<Container
					ref={provided.innerRef}
					{...provided.dragHandleProps}
					{...provided.draggableProps}
					isDragging={snapshot.isDragging}
				>
					{get(task, 'content')}
				</Container>
			)}
		</Draggable>
	);
};

export default Task;

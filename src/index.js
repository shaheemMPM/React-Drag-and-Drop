import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Column from './Column';
import initialData from './initial-data';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
`;

const App = () => {
	const [data, setData] = useState(initialData);

	// const dragStartHandler = () => {
	// 	document.body.style.color = 'orange';
	// 	document.body.style.transition = 'background-color 0.2s ease';
	// };

	// const dragUpdateHandler = (update) => {
	// 	const { destination } = update;
	// 	const opacity = destination
	// 		? destination.index / Object.keys(data.tasks).length
	// 		: 0;
	// 	document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
	// };

	const dragEndHandler = (result) => {
		// document.body.style.color = 'inherit';
		// document.body.style.backgroundColor = 'inherit';

		const { source, destination, draggableId } = result;

		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		const startColumn = data.columns[source.droppableId];
		const finishColumn = data.columns[destination.droppableId];

		// Moving Item within a list
		if (startColumn === finishColumn) {
			const newTaskIds = Array.from(startColumn.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...startColumn,
				taskIds: newTaskIds,
			};

			const newData = {
				...data,
				columns: {
					...data.columns,
					[newColumn.id]: newColumn,
				},
			};

			setData(newData);
			return;
		}

		// Moving Item from one list to another
		const startTaskIds = Array.from(startColumn.taskIds);
		startTaskIds.splice(source.index, 1);
		const newStartColumn = {
			...startColumn,
			taskIds: startTaskIds,
		};

		const finishTaskIds = Array.from(finishColumn.taskIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinishColumn = {
			...finishColumn,
			taskIds: finishTaskIds,
		};

		const newData = {
			...data,
			columns: {
				...data.columns,
				[newStartColumn.id]: newStartColumn,
				[newFinishColumn.id]: newFinishColumn,
			},
		};
		setData(newData);
	};

	return (
		<DragDropContext
			// onDragStart={dragStartHandler}
			// onDragUpdate={dragUpdateHandler}
			onDragEnd={dragEndHandler}
		>
			<Container>
				{data.columnOrder.map((columnId) => {
					const column = data.columns[columnId];
					const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

					return <Column key={column.id} column={column} tasks={tasks} />;
				})}
			</Container>
		</DragDropContext>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

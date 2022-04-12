import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Column from './Column';
import initialData from './initial-data';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';

const App = () => {
	const [data, setData] = useState(initialData);

	const dragEndHandler = (result) => {
		const { source, destination, draggableId } = result;

		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		const column = data.columns[source.droppableId];
		const newTaskIds = Array.from(column.taskIds);
		newTaskIds.splice(source.index, 1);
		newTaskIds.splice(destination.index, 0, draggableId);

		const newColumn = {
			...column,
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
	};

	return (
		<DragDropContext onDragEnd={dragEndHandler}>
			{data.columnOrder.map((columnId) => {
				const column = data.columns[columnId];
				const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

				return <Column key={column.id} column={column} tasks={tasks} />;
			})}
		</DragDropContext>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

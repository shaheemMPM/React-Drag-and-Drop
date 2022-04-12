import React from 'react';
import ReactDOM from 'react-dom';
import Column from './Column';
import initialData from './initial-data';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';

const App = () => {
	// const [data, setData] = useState(initialData);
	const data = initialData;

	const dragEndHandler = (result) => {
		console.log('test: ', result);
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

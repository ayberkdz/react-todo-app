import { useEffect } from 'react';
import { useState } from 'react';

function App() {
	const [todos, setTodos] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [editedTodo, setEditedTodo] = useState({
		title: '',
		status: 'Pending',
		index: null,
	});

	/* The `useEffect` hook in the provided code is used to retrieve the `todos` data from the
    browser's local storage and set it as the initial state for the `todos` variable. */
	useEffect(() => {
		const storedTodos = localStorage.getItem('todos');
		if (storedTodos) {
			setTodos(JSON.parse(storedTodos));
		}
	}, []);

	/* The `useEffect` hook is used to perform side effects in a functional component. In this case,
      the `useEffect` hook is used to save the `todos` state to the browser's local storage whenever
      the `todos` state changes. */
	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	/**
	 * The openModal function sets the modalVisible state to true.
	 */
	const openModal = () => {
		setModalVisible(true);
	};

	/**
	 * The function closeModal sets the modal visibility to false and resets the edited todo to an empty
	 * state.
	 */
	const closeModal = () => {
		setModalVisible(false);
		setEditedTodo({ title: '', status: 'Pending', index: null });
	};

	/**
	 * The handleSubmit function updates the todos array with the editedTodo object and closes the modal.
	 */
	const handleSubmit = () => {
		if (editedTodo.index !== null) {
			const updatedTodos = [...todos];
			updatedTodos[editedTodo.index] = { ...editedTodo };
			setTodos(updatedTodos);
		} else {
			setTodos([...todos, editedTodo]);
		}
		closeModal();
	};

	/**
	 * The handleEdit function takes an index as a parameter, retrieves the corresponding todo from the
	 * todos array, sets the editedTodo state to the retrieved todo with the index, and sets the
	 * modalVisible state to true.
	 */
	const handleEdit = (index) => {
		const todoToEdit = todos[index];
		setEditedTodo({ ...todoToEdit, index });
		setModalVisible(true);
	};

	/**
	 * The handleDelete function removes an item from the todos array based on its index.
	 */
	const handleDelete = (index) => {
		const updatedTodos = todos.filter((_, i) => i !== index);
		setTodos(updatedTodos);
	};

	return (
		<div className="App">

			<div
				style={{
					position: 'relative',
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					gap: '10px',
				}}>
				<h1>To-Do Application</h1>
				<button
					style={{
						width: '100px',
						height: 'auto',
						padding: '2.5px',
						cursor: 'pointer',
					}}
					onClick={openModal}>
					Add
				</button>
			</div>

			{todos.map((todo, index) => (
				<div
					key={index}
					className="todo"
					style={{
						width: '100%',
						height: 'auto',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: '6px',
					}}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							textAlign: 'left',
						}}>
						<strong
							style={{
								fontSize: '34px',
								textDecoration:
									todo.status === 'Completed'
										? 'line-through'
										: 'none',
							}}>
							{todo.title}
						</strong>
						<strong style={{ fontSize: '24px' }}>
							{todo.status}
						</strong>
						<p style={{ fontSize: '12px' }}>
							Added: {new Date().toLocaleString()}
						</p>
					</div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							gap: '10px',
						}}>
						<button
							onClick={() => handleEdit(index)}
							style={{
								width: '100px',
								height: 'auto',
								padding: '2.5px',
								cursor: 'pointer',
								background: 'lightorange',
							}}>
							Düzenle
						</button>
						<button
							onClick={() => handleDelete(index)}
							style={{
								width: '100px',
								height: 'auto',
								padding: '2.5px',
								cursor: 'pointer',
								background: 'lightred',
							}}>
							Sil
						</button>
					</div>
				</div>
			))}

			{modalVisible && (
				<div
					className="modal"
					style={{
						width: '100%',
						height: '100vh',
						display: 'grid',
						position: 'fixed',
						top: '0px',
						background: '#fff',
					}}>
					<div className="modal-content">
						<span
							className="close"
							onClick={closeModal}>
							&times;
						</span>
						<h2>
							{editedTodo.index !== null
								? 'Editing tasks'
								: 'Add new task'}
						</h2>
						<form>
							<label>Title:</label>
							<input
								type="text"
								value={editedTodo.title}
								onChange={(e) =>
									setEditedTodo({
										...editedTodo,
										title: e.target.value,
									})
								}
							/>
							<label>Status:</label>
							<select
								value={editedTodo.status}
								onChange={(e) =>
									setEditedTodo({
										...editedTodo,
										status: e.target.value,
									})
								}>
								<option value="Pending">Pending</option>
								<option value="Completed">Completed</option>
							</select>
							<button
								type="button"
								onClick={handleSubmit}>
								{editedTodo.index !== null ? 'Edit' : 'Add'}
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;

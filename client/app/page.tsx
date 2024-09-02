"use client";
import ToDoListItem from "@/components/ToDoListItem";
import { TaskType } from "@/types/TaskType";
import { useEffect, useState } from "react";

export default function Home() {
	const [tasks, setTask] = useState<TaskType[]>([]);
	const [newTask, setNewTask] = useState<string>("");

	useEffect(() => {
		fetch("http://localhost:1000/list")
			.then((response) => {
				return response.json();
			})
			.then((data: TaskType[]) => {
				setTask(data);
			});
	}, []);

	const addTask = async () => {
		console.log("add task triggered");

		if (newTask === "") {
			return;
		}

		const response = await fetch("http://localhost:1000/list", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({ name: newTask, isCompleted: false }),
		});

		if (response.ok) {
			const addedTask = await response.json();
			const newTaskObj = {
				_id: addedTask.insertedId,
				name: newTask,
				isCompleted: false,
			};
			setTask([...tasks, newTaskObj]);
			setNewTask("");
		} else {
			console.error("Failed to add task");
		}
	};

	const renameTask = async (id: string, name: string) => {
		console.log("rename task triggered");

		const response = await fetch("http://localhost:1000/list/" + id, {
			method: "PATCH",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({ name: name, isCompleted: false }),
		});

		if (response.ok) {
		} else {
			console.error("Failed to add task");
		}
	};

	const deleteTask = async (id: string) => {
		const response = await fetch("http://localhost:1000/list/" + id, {
			method: "DELETE",
			headers: { "Content-type": "application/json" },
		});

		if (response.ok) {
			const deleteTask = await response.json();
			const isDeletedTask = (element: TaskType) => element._id === id;
			const indexOfDeletedTask = tasks.findIndex(isDeletedTask);
			const tasksCopy = [...tasks];
			tasksCopy.splice(indexOfDeletedTask, 1);
			console.log("task copy", tasksCopy);
			setTask([...tasksCopy]);
		} else {
			console.error("Failed to add task");
		}
	};

	return (
		<main className={"main" + " " + "text-center"}>
			<div className="bg-yellow-300 p-2">
				<h1 className="mb-6">To-Do List!</h1>
				<form
					className="mb-6 bg-white p-2 rounded-xl max-w-fit mx-auto"
					onSubmit={(e) => {
						e.preventDefault();
						addTask();
					}}
				>
					<input
						className="rounded-xl p-2"
						placeholder="Add a Task!"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
					/>
					<button className="bg-yellow-300 p-1 rounded-xl ml-3">Submit</button>
				</form>
			</div>

			<ol>
				{tasks.map((data) => (
					<ToDoListItem
						key={data._id}
						id={data._id}
						name={data.name}
						renameTask={renameTask}
						deleteTask={deleteTask}
					/>
				))}
			</ol>
		</main>
	);
}

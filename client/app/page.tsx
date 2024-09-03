"use client";
import ToDoListItem from "@/components/ToDoListItem";
import { TaskType } from "@/types/TaskType";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
	const [tasks, setTask] = useState<TaskType[]>([]);
	const [newTask, setNewTask] = useState<string>("");

	useEffect(() => {
		fetch(process.env.NEXT_PUBLIC_API_URL || "http://localhost:1000/list")
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

		const response = await fetch(
			process.env.NEXT_PUBLIC_API_URL || "http://localhost:1000/list",
			{
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ name: newTask, isCompleted: false }),
			}
		);

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

		const response = await fetch(
			process.env.NEXT_PUBLIC_API_URL + id || "http://localhost:1000/list" + id,
			{
				method: "PATCH",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ name: name, isCompleted: false }),
			}
		);

		if (response.ok) {
		} else {
			console.error("Failed to add task");
		}
	};

	const deleteTask = async (id: string) => {
		const response = await fetch(
			process.env.NEXT_PUBLIC_API_URL + id || "http://localhost:1000/list" + id,
			{
				method: "DELETE",
				headers: { "Content-type": "application/json" },
			}
		);

		if (response.ok) {
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
			<div className="flex flex-nowrap flex-col bg-yellow-300 p-4">
				<h1 className="text-5xl font-bold animate-bounce transition ease-in-out duration-100">
					<a href="https://www.linkedin.com/in/markquirante/" target="_blank">
						TaskVault
					</a>
				</h1>
				<form
					className="bg-white p-2 rounded-full max-w-fit mx-auto"
					onSubmit={(e) => {
						e.preventDefault();
						addTask();
					}}
				>
					<input
						className="rounded-full p-2"
						placeholder="Add a Task!"
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
					/>
					<button className="bg-yellow-300 hover:bg-green-500 p-3 rounded-full ml-2 text-m transition ease-in delay-150 hover:scale-110 duration-300">
						<Image
							src="/iconmonstr-plus-2.svg"
							alt="Plus image icon"
							width={14}
							height={14}
						></Image>
					</button>
				</form>
			</div>

			<ol className="flex flex-col flex-wrap md:max-h-[75vh] bg-white my-10 border-solid border-2 max-w-fit mx-auto p-4 rounded-2xl shadow-md shadow-zinc-400">
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

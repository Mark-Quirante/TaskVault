"use client";
import ToDoListItem from "@/components/ToDoListItem";
import { TaskType } from "@/types/TaskType";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
	const [tasks, setTask] = useState<TaskType[]>([]);
	useEffect(() => {
		fetch("http://localhost:1000/list")
			.then((response) => {
				return response.json();
			})
			.then((data: TaskType[]) => {
				setTask(data);
			});
	});
	return (
		<main>
			<h1>To-Do List!</h1>
			<input placeholder="Add a Task!"></input>
			<button id="Add">Add</button>
			<ol>
				{tasks.map((data, index) => (
					<ToDoListItem key={index} name={data.name} />
				))}
			</ol>
		</main>
	);
}

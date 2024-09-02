import { useState } from "react";

export default function ToDoListItem({
	id,
	name,
	renameTask,
	deleteTask,
}: Readonly<{
	name: string;
	id: string;
	renameTask: (id: string, name: string) => Promise<void>;
	deleteTask: (id: string) => Promise<void>;
}>) {
	const [changeTask, setChangeTask] = useState<string>(name);

	return (
		<li className="flex justify-center">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					renameTask(id, changeTask);
				}}
			>
				<input
					value={changeTask}
					onChange={(e) => {
						e.preventDefault();
						setChangeTask(e.target.value);
					}}
				></input>
			</form>
			<button
				onClick={() => {
					deleteTask(id);
				}}
			>
				✔️
			</button>
		</li>
	);
}

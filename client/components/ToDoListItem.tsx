import { useState } from "react";
import Image from "next/image";

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
		<li className="flex justify-center mb-1 mr-4 border-b-2 p-2">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					renameTask(id, changeTask);
				}}
			>
				<input
					className="focus-visible:outline-0"
					value={changeTask}
					onChange={(e) => {
						e.preventDefault();
						setChangeTask(e.target.value);
					}}
				></input>
			</form>
			<button
				className="ml-2"
				onClick={() => {
					deleteTask(id);
				}}
			>
				<Image
					className="transition ease-in-out delay-150 hover:scale-150 duration-300"
					src="/iconmonstr-check-mark-15.svg"
					alt="Checkmark Icon"
					width={24}
					height={24}
				></Image>
			</button>
		</li>
	);
}

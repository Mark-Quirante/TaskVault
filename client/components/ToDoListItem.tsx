export default function ToDoListItem({
	name,
}: Readonly<{
	name: string;
}>) {
	return (
		<li>
			<p>
				{name} <button>Complete</button>
				<button>Remove</button>
			</p>
		</li>
	);
}

const { useState } = require('react');

const data = [
	{ id: 1, title: '⾜球' },
	{ id: 2, title: '篮球' },
	{ id: 3, title: '橄榄球' },
];

function App() {
	const [formState, setFormState] = useState({
		username: '',
		password: '',
		agree: false,
		hobbies: [],
	});

	const [checkedState, setCheckedState] = React.useState(new Array(data.length).fill(false));

	const onChangeHandler = (event) => {
		setFormState({
			...formState,
			[event.target.name]: event.target.type === 'checkout' ? event.target.checked : event.target.value,
		});
	};

	const [checkedState, setCheckedState] = React.useState(new Array(data.length).fill(false));
	const hobbyChangeHandler = (index) => {
		const updatedCheckedState = checkedState.map((checked, i) => (i === index ? !checked : checked));
		setCheckedState(updatedCheckedState);
		const udpatedHobbies = updatedCheckedState.reduce((result, checked, index) => {
			if (checked) result.push(data[index].id);
			return result;
		}, []);
		setFormState({ ...formState, hobbies: udpatedHobbies });
	};

	return (
		<form onSubmit={onChangeHandler}>
			<label htmlFor="">
				<input type="text" name="" id="" value={formState.username} onChange={onChangeHandler} />
			</label>
			<label htmlFor="">
				<input type="password" name="" id="" value={formState.password} onChange={onChangeHandler} />
			</label>
			<label htmlFor=""></label>

			<div>
				{data.map((item, index) => (
					<p key={item.id}>
						<input type="checkbox" onChange={() => hobbyChangeHandler(index)} />
						{item.title}
					</p>
				))}
			</div>
		</form>
	);
}

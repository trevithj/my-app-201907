import React, {useState} from 'react';

//15 HOCs

class App extends React.Component {
	render() {
		console.log('render');
		return (
			<div>
				<Button text="ClickMe" />
				<Label text="TheLabel" />
				<hr />
				<ButtonHOC text="Another Click" />
				<LabelHOC text="HOC Label" />

			</div>
		);
	}
};

const Button = props => (
	<button onClick={props.doInc}>
		{props.text} - {props.count}
	</button>
);
const Label = props => (
	<h1 onMouseMove={props.doInc}>
		{props.text} - {props.count}
	</h1>
);

const HOC = InnerComponent => {
	const TheComp = props => {
		const [count, setCount] = useState(0);
		const inc = () => setCount(count+1);
		return <InnerComponent
			{...props}
			count={count}
			doInc={inc}
		/>
	};
	return TheComp;
};

const ButtonHOC = HOC(Button);
const LabelHOC = HOC(Label);

export default App;

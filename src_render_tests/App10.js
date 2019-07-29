import React from 'react';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			a: '',
			b: '',
		};
		this.refA = React.createRef();
		this.refB = React.createRef();
		this.update = this.update.bind(this);
	}

	update() {
		this.setState({
			a: this.refA.current.value,
			b: this.refB.current.value,
		});
	}

	render() {
		return (
			<div>
				<input
					ref={this.refA}
					type="text" onChange={this.update} />
				{this.state.a}
				<hr />
				<input
					ref={this.refB}
					type="text" onChange={this.update} />
				{this.state.b}
			</div>
		);
	}
};


//const App = () => <h1>Hello</h1>;

export default App;

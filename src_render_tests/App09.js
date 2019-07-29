import React from 'react';


class App extends React.Component {
	constructor() {
		super();
		this.state = {
			currentEvent: '----------',
		};
		this.update = this.update.bind(this);
	}

	update(e) {
		this.setState({
			currentEvent: e.type,
		});
	}

	render() {
		return (
			<div>
				<textarea
					onKeyPress={this.update}
					onCopy={this.update}
					onCut={this.update}
					onPaste={this.update}
					onFocus={this.update}
					onBlur={this.update}
					onDoubleClick={this.update}
					rows="10" cols="30"
				/>
				<h1>{this.state.currentEvent}</h1>
			</div>
		);
	}
};


//const App = () => <h1>Hello</h1>;

export default App;

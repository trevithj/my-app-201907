import React from 'react';
import ReactDOM from 'react-dom';

//11
class App extends React.Component {
	constructor() {
		super();
		this.state = {val: 0};
		this.update = this.update.bind(this);
	}

	update() {
		this.setState({val: this.state.val + 1});
	}
	//lifecycles
	componentWillMount() {
		console.log('componentWillMount');
		this.setState({val: 10});
	}
	componentDidMount() {
		console.log('componentDidMount');
		this.inc = setInterval(this.update, 500);
	}

	shouldComponentUpdate(nextProps, nextState) {
		const flag = nextState.val % 5 === 0;
		if (flag) return true;
		console.log('skip update');
		return false;
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(prevState.val);
	}

	componentWillUnmount() {
		console.log('componentWillUnmount');
		clearInterval(this.inc);
	}


	render() {
		console.log('render');
		return (
			<div>
				<button	onClick={this.update}>
				{this.state.val}
				</button>
			</div>
		);
	}
};

class Wrapper extends React.Component {

	mount() {
		ReactDOM.render(<App />, document.getElementById('x'));
	}
	unmount() {
		ReactDOM.unmountComponentAtNode(document.getElementById('x'));
	}

	render() {
		return (
			<div>
				<button onClick={this.mount.bind(this)}>Mount</button>
				<button onClick={this.unmount.bind(this)}>Unmount</button>
				<div id="x"></div>
			</div>
		);
	}
}

export default Wrapper;

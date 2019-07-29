import React from 'react';

/* Lessons 2 - 4
class App extends React.Component {
	render() {
		//Basic JSX syntax
		//return <h1>Hello, World</h1>;

		//JSX compiles to this:
		//return React.createElement('h1', null, 'Hello, React');

		//This is not allowed - must return a single element
		//return <h1>Hello, World</h1><b>xxx</b>;
		//Above the same as trying to return several functions at once.

		//Nesting sub-elements is OK:
		return (
			<div>
				<h1>Hello, World</h1>
				<b>Bold this</b>
			</div>
		);
	}
};
* */

// lesson 5 - 6
/*
class App extends React.Component {
	constructor() {
		super(); //this sets the `this` context to this class.
		this.state = { txt: 'This is the state txt' };
		this.update = this.update.bind(this);
	}

	update(e) {
		this.setState({txt: e.target.value});
	}

	render() {
		return (
			<div>
				<h1>{this.props.txt}</h1>
				<h2>{this.state.txt}</h2>
				<hr />
				<Widget update={this.update} />
				<Widget update={this.update} />
				<Widget update={this.update} />
			</div>
		);
	}
};
App.defaultProps = {
	txt: 'This is the default text'
};

const Widget = props => <input type="text" onChange={props.update} />
*/

class App extends React.Component {

	render() {
		return (
			<div>
				<Title text="Zeebee" />
				<Button>I <Heart/> React</Button>
			</div>
		);
	}
};

const Button = props => <button>{props.children}</button>;
const Heart = () => <span>&hearts;</span>;

//Custom propType validation
const Title = props => <h1>Title: {props.text}</h1>;
/*Title.propTypes = {
	text(props, name, component) {
		if(!props[name]) return new Error(`Missing ${name}`);
		if(props[name].length < 6) return new Error(`${name} too short`);
	}
};*/
Title.propTypes = {
	text: (props, name, component) => {
		if(!props[name]) return new Error(`Missing ${name}`);
		if(props[name].length < 6) return new Error(`${name} too short`);
	}
};




//const App = () => <h1>Hello</h1>;

export default App;

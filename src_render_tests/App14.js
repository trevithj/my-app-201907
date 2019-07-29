import React from 'react';
//import ReactDOM from 'react-dom';

//14
class App extends React.Component {
	constructor() {
		super();
		this.state = {items: [], filter: 'h'};
		this.update = this.update.bind(this);

		fetch('https://swapi.co/api/planets/?format=json')
		.then(resp => resp.json())
		.then(data => {
			this.setState({items: data.results});
		})

	}

	update(e) {
		this.setState({ filter: e.target.value });
	}

	//lifecycles
	componentDidMount() {
		console.log('componentDidMount');
	}


	render() {
		console.log('render');
		const { items, filter } = this.state;
		let list = items;
		if(filter) {
			list = items.filter(item => {
				return item.name.toLowerCase().includes(filter.toLowerCase());
			});
		}
		return (
			<div>
				<input type="text" onChange={this.update} />
				{list.map(item => <Planet key={item.name} data={item} />)}
			</div>
		);
	}
};


const Planet = props => {
	return (
		<h4>{props.data.name}</h4>
	);
}

export default App;

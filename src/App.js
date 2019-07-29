import React, {useRef, useEffect} from 'react';
import { useStore } from './store';
import { cancelTaxiDialogue } from './helpers/stateChartDef';
import * as Parser from './helpers/stateChartParser';

const App = () => {
	const [state, dispatch] = useStore();
	const taInput = useRef();
	const doTest = () => dispatch({test2: {
		date: new Date().getTime()
	}});
	const triples = state.data ? state.data.triples : [];
	//taInput.current.value = cancelTaxiDialogue;

	useEffect(() => {
		const txt = Parser.asTextArray(cancelTaxiDialogue);
		const triples = Parser.asTriplesArray(txt);
		dispatch({ data: {txt, triples}});
	}, [dispatch]);

	useEffect(() => {
		taInput.current.value = cancelTaxiDialogue;
	}, []);

  return (
    <div className="App">
      <div style={{position: 'relative'}}>
				<Col width="calc(50% - 40px)">
					<textarea ref={taInput} rows="30" style={{width: '95%'}} />
				</Col>
				<Col width="80px">
					<Process title="Do One" />
					<Process title="Do Two" selected />
					<Process title="Do Tri" />
					<hr />
					<button>Do one</button>
					<button>Do two</button>
					<button disabled>Do tri</button>
				</Col>
				<Col width="calc(50% - 40px)">
					<Pre data={triples} name="output"/>
				</Col>
			</div>
			<hr />
			<button onClick={doTest}>Test dispatch</button>
			<Pre data={state} name="State" />
			<hr />
			<Pre data={triples} name="Parser"/>
    </div>
  );
}

const Process = ({title, selected}) => {
	return <button style={{
		width: '100%',
		//borderWidth: 3,
		padding: 0,
	}} disabled={selected} >
		{title}
	</button>;
}

const Pre = React.memo(({data, name=''}) => {
	// console.log('rendering', name);
	return <pre>{JSON.stringify(data, null, 2)}</pre>;
});

const Col = props => {
	const { children, width, ...rest } = props;
	return (
		<div style={{
			verticalAlign: 'top',
			paddingLeft: '10',
			display: 'inline-block', width
		}} {...rest}>
			{props.children}
		</div>
	);
};

export default App;

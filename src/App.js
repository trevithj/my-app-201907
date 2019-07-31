import React, {useRef, useEffect} from 'react';
import { useStore } from './store';
import { cancelTaxiDialogue } from './helpers/stateChartDef';
import * as Parser from './helpers/stateChartParser';

const taStyle = {
	width: '98%', fontFamily: 'Courier new', fontSize: '12pt'
};

const App = () => {
  const [state, dispatch] = useStore();
  const taInput = useRef();
  const taOutput = useRef();
  const doTest = () => dispatch({test2: {
    date: new Date().getTime()
  }});
  const data = state.data || {};

  const handleTriplesClick = () => {
		const output = data.triples;
		data.output = JSON.stringify(output, null, 2);
		dispatch({format:'triples', data});
	};
  const handleStateMapClick = () => {
		const output = Parser.asStateMap(data.triples);
		data.output = JSON.stringify(output, null, 2);
		dispatch({format:'statemap', data});
	};
  const handleKumuJsonClick = () => {
		const output = Parser.asKumuJson(data.triples);
		data.output = JSON.stringify(output, null, 2);
		dispatch({format:'kumu', data});
	};

  useEffect(() => {
    const txt = Parser.asTextArray(cancelTaxiDialogue);
    const triples = Parser.asTriplesArray(txt);
    const data = { input: cancelTaxiDialogue, triples };
    data.output = JSON.stringify(triples, null, 2);
    dispatch({ data, format:'triples' });
  }, [dispatch]);

  useEffect(() => {
    taInput.current.value = data.input;
    taOutput.current.value = data.output;
  });

  return (
    <div className="App" role="main">
      <div style={{position: 'relative'}}>
        <Col width="calc(50% - 65px)" title="input">
          <textarea ref={taInput} rows="30"
						style={taStyle}
					/>
        </Col>
        <Col width="120px" title="options">
          <Process title="Triples list"
						onClick={handleTriplesClick}
						selected={state.format==='triples'}
          />
          <Process title="State map"
						onClick={handleStateMapClick}
						selected={state.format==='statemap'}
					/>
          <Process title="Kumu json"
						onClick={handleKumuJsonClick}
						selected={state.format==='kumu'}
					/>
        </Col>
        <Col width="calc(50% - 65px)" title="output">
					<textarea rows="30" style={taStyle}
						ref={taOutput}
						readOnly
					/>
        </Col>
      </div>
      <hr />
      <button onClick={doTest}>Test dispatch</button>
      <Pre data={state.test2} name="Test" />
      <Pre data={state.format} name="Format" raw />
    </div>
  );
}

const Process = ({title, onClick, selected}) => {
  return <button
		style={{
			width: '100%',
			//borderWidth: 3,
			padding: 0,
		}}
		disabled={selected}
		onClick={onClick}
  >
    {title}
  </button>;
}

const Pre = React.memo(({data, name='', raw=false}) => {
  // console.log('rendering', name);
  data = raw ? data : JSON.stringify(data, null, 2);
  return <pre>{data}</pre>;
});

const Col = props => {
  const { children, width, ...rest } = props;
  return (
    <div style={{
      verticalAlign: 'top',
      paddingLeft: '10',
      display: 'inline-block',
      border: 'solid thin silver',
      width
    }} {...rest}>
      {props.children}
    </div>
  );
};

export default App;

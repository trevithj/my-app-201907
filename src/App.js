import React, {useRef, useEffect} from 'react';
import { useStore } from './store';
import { cancelTaxiDialogue } from './helpers/stateChartDef';
import * as Parser from './helpers/stateChartParser';

const App = () => {
  const [state, dispatch] = useStore();
  const taInput = useRef();
  const taOutput = useRef();
  const doTest = () => dispatch({test2: {
    date: new Date().getTime()
  }});
  const data = state.data || {};

  useEffect(() => {
    const txt = Parser.asTextArray(cancelTaxiDialogue);
    const triples = Parser.asTriplesArray(txt);
    const data = { input: cancelTaxiDialogue, triples };
    data.output = JSON.stringify(triples, null, 2);
    dispatch({ data });
  }, [dispatch]);

  useEffect(() => {
    taInput.current.value = data.input;
    taOutput.current.value = data.output;
  }, [data]);

  return (
    <div className="App">
      <div style={{position: 'relative'}}>
        <Col width="calc(50% - 65px)">
          <textarea ref={taInput} rows="30" style={{width: '98%'}} />
        </Col>
        <Col width="120px">
          <Process title="Triples list" selected />
          <Process title="State chart" />
          <Process title="Kumu json" />
        </Col>
        <Col width="calc(50% - 65px)">
					<textarea rows="30" style={{width: '98%'}}
						ref={taOutput}
						readOnly
					/>
        </Col>
      </div>
      <hr />
      <button onClick={doTest}>Test dispatch</button>
      <Pre data={state} name="State" />
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
      display: 'inline-block',
      border: 'solid thin silver',
      width
    }} {...rest}>
      {props.children}
    </div>
  );
};

export default App;

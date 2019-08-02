//StateCharts
import React, {useRef, useEffect} from 'react';
import { useStore } from '../store';
import { cancelTaxiDialogue } from '../helpers/stateChartDef';
import * as Parser from './stateChartParser';

const taStyle = {
	width: '98%', fontFamily: 'Courier new', fontSize: '12pt'
};


const getHandleInputClick = (dispatch) => () => {
  dispatch({format:'input'});
};

const getHandleTriplesClick = (dispatch, data) => () => {
  const output = JSON.stringify(data.triples, null, 2);
  dispatch({format:'triples', data: {...data, output }});
};

const getHandleStateMapClick = (dispatch, data) => () => {
  const output = Parser.asStateMap(data.triples);
  data.output = JSON.stringify(output, null, 2);
  dispatch({format:'statemap', data});
};

const getHandleKumuJsonClick = (dispatch, data) => () => {
  const output = Parser.asKumuJson(data.triples);
  data.output = JSON.stringify(output, null, 2);
  dispatch({format:'kumu', data});
};


const StateCharts = () => {
  const [state, dispatch] = useStore();
  const taInput = useRef();
  const taOutput = useRef();
  const doTest = () => dispatch({test2: {
    date: new Date().getTime()
  }});
  const data = state.data || {};

  const handleInputClick = getHandleInputClick(dispatch);
  const handleTriplesClick = getHandleTriplesClick(dispatch, data);
  const handleStateMapClick = getHandleStateMapClick(dispatch, data);
  const handleKumuJsonClick = getHandleKumuJsonClick(dispatch, data);

  useEffect(() => {
    const txt = Parser.asTextArray(cancelTaxiDialogue);
    const triples = Parser.asTriplesArray(txt);
    const data = { input: cancelTaxiDialogue, triples };
    taInput.current.value = data.input;
    // data.output = JSON.stringify(triples, null, 2);
    // taOutput.current.value = data.output;
    dispatch({ data, format:'input' });
  }, [dispatch]);

  useEffect(() => {
    const theInput = taInput.current;
    const listener = () => {
      const data = {};
      data.input = theInput.value;
      const txt = Parser.asTextArray(data.input);
      data.triples = Parser.asTriplesArray(txt);
        dispatch({ data });
    };
    theInput.addEventListener('blur', listener);
    return () => {
      theInput.removeEventListener('blur', listener);
    };
  }, [dispatch]);

  useEffect(() => {
    taOutput.current.value = data.output;
  }, [data.output]);

  return (
    <div className="state-charts" title="main">
      <div style={{position: 'relative'}}>
        <Col width="120px" title="options">
          <Process title="Input"
						onClick={handleInputClick}
						selected={state.format==='input'}
          />
          <hr />
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
        <Col width="calc(100% - 120px)" show={state.format==='input'} title="input">
          <textarea ref={taInput} rows="30"
						style={taStyle}
					/>
        </Col>
        <Col width="calc(100% - 120px)" show={state.format!=='input'} title="output">
					<textarea rows="30" style={taStyle}
						ref={taOutput}
						readOnly
					/>
        </Col>
      </div>
      <hr />
      <button onClick={doTest}>Test dispatch</button>
      <Pre data={state.format} name="Format" raw />
      <Pre data={state.data} name="Data" />
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
  const { children, width, show=true, ...rest } = props;
  const display = show ? 'inline-block' : 'none';
  return (
    <div style={{
      verticalAlign: 'top',
      display,
      width
    }} {...rest}>
      {props.children}
    </div>
  );
};

export default StateCharts;

//StateCharts
import React, {useRef, useEffect} from 'react';
import { useStore } from '../store';
import { sample } from './stateChartDef';
import * as Parser from './stateChartParser';
import { Process, Pre, Col, H4 } from './components';

const taStyle = {
	width: '98%',
	fontFamily: 'Courier new',
	fontSize: '12pt',
	fontWeight: 600,
	color: 'white',
	backgroundColor: 'black',
	paddingLeft: '1em'
};

const menuStyle = {
	border: 'solid 1px blue',
	backgroundColor: '#eee',
	height: '90vh',
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

const getHandleXStateJsonClick = (dispatch, data) => () => {
  const output = Parser.asXStateJson(data.triples);
  data.output = JSON.stringify(output, null, 2);
  dispatch({format:'xstate', data});
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
  const handleXStateJsonClick = getHandleXStateJsonClick(dispatch, data);

  useEffect(() => {
    const txt = Parser.asTextArray(sample);
    const triples = Parser.asTriplesArray(txt);
    const data = { input: sample, triples };
    taInput.current.value = data.input;
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
        <Col width="160px">
					<div style={menuStyle} title="options">
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
						<Process title="XState json"
							onClick={handleXStateJsonClick}
							selected={state.format==='xstate'}
						/>
					</div>
        </Col>
        <Col width="calc(100% - 160px)" show={state.format==='input'} title="input">
					<H4>INPUT</H4>
          <textarea ref={taInput} rows="30"
						style={taStyle}
					/>
        </Col>
        <Col width="calc(100% - 160px)" show={state.format!=='input'} title="output">
					<H4>FORMAT: '{state.format}'</H4>
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

export default StateCharts;

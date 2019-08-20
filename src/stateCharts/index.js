//StateCharts
import React, { useRef, useEffect } from 'react';
import { useStore } from '../store';
import { sample } from './stateChartDef';
import * as Parser from './stateChartParser';
import { Pre, Col, H4 } from './components';
import LeftMenu from './leftMenu';

const taStyle = {
  width: '98%',
  fontFamily: 'Courier new',
  fontSize: '12pt',
  fontWeight: 600,
  color: 'white',
  backgroundColor: 'black',
  paddingLeft: '1em'
};

const StateCharts = () => {
  const [state, dispatch] = useStore();
  const taInput = useRef();
  const taOutput = useRef();
  const data = state.data || {};

  useEffect(() => {
    const triples = Parser.asTriplesArray(sample);
    const data = { input: sample, triples };
    taInput.current.value = data.input;
    dispatch({ data, format: 'input' });
  }, [dispatch]);

  useEffect(() => {
    const theInput = taInput.current;
    const listener = () => {
      const data = {};
      data.input = theInput.value;
      data.triples = Parser.asTriplesArray(data.input);
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
    <div className='state-charts' title='main'>
      <div style={{ position: 'relative' }}>
        <Col width='160px'>
          <LeftMenu />
        </Col>
        <Col
          width='calc(100% - 160px)'
          show={state.format === 'input'}
          title='input'
        >
          <H4>INPUT</H4>
          <textarea ref={taInput} rows='30' style={taStyle} />
        </Col>
        <Col
          width='calc(100% - 160px)'
          show={state.format !== 'input'}
          title='output'
        >
          <H4>FORMAT: '{state.format}'</H4>
          <textarea rows='30' style={taStyle} ref={taOutput} readOnly />
        </Col>
      </div>
      <hr />
      <Pre data={state.format} name='Format' raw />
      <Pre data={state.data} name='Data' />
    </div>
  );
};

export default StateCharts;

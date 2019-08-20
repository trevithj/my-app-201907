import React, { useRef, useEffect } from 'react';
import { process, example } from './process';

const wide = {
  width: 'calc(100% - 26px)',
  padding: '6px 12px',
  margin: 0,
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const col = {
  display: 'inline-block',
  marginBottom: '6px',
  verticalAlign: 'top'
};
const Col = props => {
  const { children, width } = props;
  return <div style={{ ...col, width }}>{children}</div>;
};

const label = {
  fontSize: '14pt',
  fontWeight: 'bold',
  padding: '6px'
};
const Label = ({ children }) => <div style={label}>{children}</div>;

const ConvertTxt2Json = () => {
  const elHeads = useRef();
  const elInput = useRef();
  const elDelim = useRef();
  const elFormat = useRef();
  const elOutput = useRef();

  useEffect(() => {
    elHeads.current.value = example[0];
    elInput.current.value = example[1];
  }, []);

  const handleClick = () => {
    const fm = { elHeads, elInput, elDelim, elFormat };
    try {
      const output = process(fm);
      elOutput.current.value = JSON.stringify(output, null, 2);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h3>Converts Delimited Text to JSON</h3>
      <div>
        <Col width='70%'>
          <input
            type='text'
            ref={elHeads}
            placeholder='Delimited list'
            style={wide}
          />
        </Col>
        <Col width='30%'>
          <Label>Field Names</Label>
        </Col>
      </div>

      <div>
        <Col width='70%'>
          <textarea ref={elInput} rows='8' cols='80' style={wide} />
        </Col>
        <Col width='30%'>
          <Label>Data Rows</Label>
        </Col>
      </div>

      <div>
        <Col width='70%'>
          <select ref={elDelim} defaultValue='\t'>
            <option value='\t'>Delim: tab</option>
            <option value='\s'>Delim: space</option>
            <option value=','>Delim: comma</option>
            <option value='|'>Delim: pipe</option>
          </select>

          <select ref={elFormat} defaultValue='A'>
            <option value='A'>Format: Array of JSON Objects</option>
            <option value='B'>Format: Single 'Table' Object</option>
          </select>

          <button onClick={handleClick}>Convert</button>
        </Col>
        <Col width='30%'>
          <Label>Options</Label>
        </Col>
      </div>

      <div>
        <Col width='70%'>
          <textarea ref={elOutput} rows='8' cols='80' style={wide} />
        </Col>
        <Col width='30%'>
          <Label>Output</Label>
        </Col>
      </div>
    </div>
  );
};

export default ConvertTxt2Json;

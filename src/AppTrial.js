import React, { useState, useRef, useEffect } from 'react';
import { useStore } from './store';

const useCounter = (init) => {
  const [count, setCount] = useState(0);
  const inc = () => setCount(count+1);
  const reset = () => setCount(0);
  return { count, inc, reset };
}


const App = () => {
  const ref = useRef('is set after first render...');
  const [value] = useState(Math.random());
	const counter = useCounter(0);
	const [state, dispatch] = useStore();

  console.log('rendering');
  useEffect(() => {
    ref.current = Math.random(); //doesn't trigger a render
    console.log('ref.current set: ', ref.current);
    setTimeout(() => {
      ref.current = Math.random();
      console.log('ref.current set again: ', ref.current);
    }, 2000);
	}, []); //init only
	
	const doTestLog = () => {
		const r = Math.random();
		console.log(r);
		dispatch({type:'LOG', msg: r});
		console.log('state',state); //no change yet...
	};

  return (
    <div className="App">
      <div style={{position: 'relative'}}>
        <button onClick={counter.inc}>{counter.count}</button>
        <p>state.value: {value}</p>
        <p>non-state val: {Math.random()}</p>
        <p>ref.current: {ref.current}</p>
			</div>
			<hr />
			<button onClick={doTestLog}>Test log</button>
			<pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default App;

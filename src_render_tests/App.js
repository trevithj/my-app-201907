import React, {useState, useRef} from 'react';

// Trials to see what does and doesn't trigger re-rendering
const x = {	value: Math.random() };

const doResetX = () => x.value = Math.random();

const useCounter = () => {
	const [count, setCount] = useState(0);
	const [value2] = useState(Math.random());
	return {
		inc: () => setCount(count+1),
		reset: () => setCount(0),
		count,
		value: Math.random(),
		value2,
	};
};

const useRefCounter = () => {
	const counter = useCounter();
	const ref = useRef();
	ref.current = counter;
	return ref;
};

const useXCounter = () => {
	x.counter = useCounter();
	return x;
};

const App = props => {
	console.log('render');
	const counter = useCounter();
	const refCounter = useRefCounter().current;
	useXCounter();
	const y = {	value: Math.random() };

	const doResetY = () => y.value = Math.random();
	const doResetC = () => {
		counter.value = Math.random();
		refCounter.value = Math.random();
		x.counter.value = Math.random();
	};
	return (
		<div>
			<h1>Testing</h1>
			<Div v1={x.value} v2={y.value} />
			<button onClick={doResetX}>Reset X</button>
			<button onClick={doResetY}>Reset Y</button>
			<hr />
			<Div v1={counter.value} v2={counter.value2} />
			<button onClick={counter.inc}>{counter.count}</button>
			<hr />
			<Div v1={refCounter.value} v2={refCounter.value2} />
			<button onClick={refCounter.inc}>{refCounter.count}</button>
			<hr />
			<Div v1={x.counter.value} v2={x.counter.value2} />
			<button onClick={x.counter.inc}>{x.counter.count}</button>
			<hr />
			<button onClick={doResetC}>Reset Counters</button>
			<p>
				Top two values: left is a module-level const, right is a render-function const.
				Both are objects with a randmonized `value` property. The reset buttons
				re-randomize the value props. Neither trigger a re-render.
			</p>
			<p>
				Next three rows show values from counters. Each button updates its
				matching counter, showing the count. The counters are state-based, so will
				trigger a re-render when updated. But: the values are randomized props
				on the counter object. Both are set when the updater is called. The left
				is set on the object, the right is initialized as a state value.
				Since setState isn't called on that value, it never changes.
			</p>
			<p>
				The three counters are created the same, but referenced slightly differently.
				The top one is a render-function const. The second is set as a `ref.current`.
				The third is a property of the original module-level const.
				The resetCounters button resets the first value on all counters.
				None trigger a re-render. If we reset the second value, we'd need a setValue
				function from the underlying state, and that would trigger a re-render.
			</p>
			<p>
				So what conclusion from all this?
			</p>
			<p>
				Well, re-rendering only happens for values that React monitors. The fact
				that the value is displayed is not sufficient. The value has to be either
				a prop to that component, or a local state property that is updated via
				the `setXYZ` call. These are both monitored. So why can't we get `x.value`
				to trigger a re-render when we pass it as a prop to a sub-component?
				Because the parent component isn't re-rendered.
			</p>
			<p>
				If we want a value to trigger a re-render, it must be ultimately some sort
				of state property. If we want a value to persist across re-renders, we can
				either make it a module-level value or we can pass it to a state property
				initialization. If we aren't going to change the value ever, use module-level
				const. Otherwise, use state property.
			</p>

		</div>
	);
};

const Div = props => (
	<div style={{position: 'relative', height: 30, width: 450}}>
		<div style={{position: 'absolute', left: 0, top: 0}}>
			{props.v1}
		</div>
		<div style={{position: 'absolute', right: 0, top: 0}}>
			{props.v2}
		</div>
	</div>
);

export default App;

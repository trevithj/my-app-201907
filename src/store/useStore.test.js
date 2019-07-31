import React from 'react';
import { StoreProvider, useStore } from './index';
import {render, fireEvent, cleanup} from '@testing-library/react'

const reducer = (state, newState) => {
	return {...state, ...newState};
};

const initState = {test: 123};

const Consumer = props => {
	const [state, dispatch] = useStore();
	const handleClick = () => {
		dispatch({test2: 456});
	};
	return (
		<div>
			<pre role="thePre">{JSON.stringify(state)}</pre>
			<button role="theBtn" onClick={handleClick}>test</button>
		</div>
	);
};

const Test = () => (
	<StoreProvider reducer={reducer} initialState={initState}>
		<Consumer />
	</StoreProvider>
);

describe('Store', () => {

	afterEach(cleanup);

	it('renders default state as expected', () => {
		const out = render(<Test />);
		const pre = out.queryByRole('thePre');
		expect(pre.innerHTML).toContain(JSON.stringify(initState));
	});

	it('handles dispatch as expected', () => {
		const out = render(<Test />);
		const pre = out.queryByRole('thePre');
		const btn = out.queryByRole('theBtn');
		expect(pre.innerHTML).toContain('"test":123');
		fireEvent.click(btn);
		//leaves other state props unchanged
		expect(pre.innerHTML).toContain('"test":123');
		//adds new ones
		expect(pre.innerHTML).toContain('"test2":456');
	});

});

it('should ', () => {

});

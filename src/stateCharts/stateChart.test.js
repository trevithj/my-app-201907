import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react'
import StateChart from './index';
import { StoreProvider } from '../store';

const reducer = (state, newState) => {
	return {...state, ...newState};
};

const initState = {data: {} };

const TestApp = () => (
	<StoreProvider reducer={reducer} initialState={initState}>
		<StateChart />
	</StoreProvider>
);

describe('StateChart', () => {

	afterEach(cleanup);

	it('renders default output', () => {
		const { queryByTitle } = render(<TestApp />);
		const input = queryByTitle('input');
    const output = queryByTitle('output');
    const options = queryByTitle("options");
    expect(options).toBeTruthy();
    expect(input.children[0].value).toContain('appReset -> Close');
    expect(output.children[0].value).toEqual('undefined');
    
    fireEvent.click(options.children[2]); //Triples list
    expect(output.children[0].value).toContain('"transition": "appReset"');
    
	});

});

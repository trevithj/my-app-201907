import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react'
import App from './App';
import { StoreProvider } from './store';

const reducer = (state, newState) => {
	return {...state, ...newState};
};

const initState = {data: {} };

const TestApp = () => (
	<StoreProvider reducer={reducer} initialState={initState}>
		<App />
	</StoreProvider>
);



describe('App', () => {

	afterEach(cleanup);

	it('renders default output', () => {
		const { queryByTitle } = render(<TestApp />);
		const input = queryByTitle('input');
		const output = queryByTitle('output');
		expect(input.children[0].value).toContain('appReset -> Close');
		expect(output.children[0].value).toContain('"transition": "appReset"');
	});

});

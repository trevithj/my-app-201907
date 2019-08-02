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
		const appMain = queryByTitle('app-main');
		expect(appMain).toBeTruthy();
	});

});

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StoreProvider } from './store';

const reducer = (state, newState) => {
	return {...state, ...newState};
};

const TestApp = () => (
	<StoreProvider reducer={reducer} initialState={{}}>
		<App />
	</StoreProvider>
);



describe('App', () => {
  const div = document.createElement('div');

	it('renders without error', () => {
		ReactDOM.render(<TestApp />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

});

//MAIN
import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from './store';
import App from './App';

const initialState = {test: 123, data: {} };
/*
const reducer = (state, action) => {
  console.log(state, action);
  const newState = {...state, actionType: action.type};
  switch(action.type) {
    case 'LOG': newState.msg = action.msg; return newState;
    default: return newState;
  }
};
*/
//Version that allows dispatch() to mimic setState()
const reducer = (state, newState) => {
	return {...state, ...newState};
};


ReactDOM.render((
    <StoreProvider reducer={reducer} initialState={initialState}>
      <App />
    </StoreProvider>
  ),
  document.getElementById('root')
);

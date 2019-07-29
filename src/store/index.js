import React, { createContext, useReducer, useContext } from 'react';
/*
Based on design described here:
https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c
*/

// export to allow access to store consumer...
export const StoreContext = createContext({});

// ...or use a custom hook - simpler
export const useStore = () => useContext(StoreContext);

export const StoreProvider = props => {
  const { reducer, initialState, children } = props;
  // const [state, dispatch] = useReducer(reducer, initialState);
  // store.state = state;
  // store.getState = () => state;
  // store.dispatch = dispatch;
  // store.doLog = msg => {
  //   console.log('doLog',msg);
  //   dispatch({type:'LOG', msg});
  // }

  return (
    // <StoreContext.Provider value={store}>
    <StoreContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StoreContext.Provider>
  )
};

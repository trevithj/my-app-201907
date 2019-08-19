import React, { useState} from 'react';
import StateCharts from './stateCharts';
import ConvertTxt2Json from './convertTxt2Json';

const link = { fontSize: '10pt', paddingRight: 10 };
const actv = { ...link, color: 'blue' };
const inactv = { ...link, color: '#ccc' };

const Link = ({active, title, onClick}) => { 
  return active ? (
    <span style={inactv}>{title}</span>
  ) : (
    <span style={actv} onClick={onClick}>{title}</span>
  );
};

const MenuBar = ({setView, view}) => {
  const getHandler = v => () => setView(v);
  return (
    <div style={{width: '100%', borderBottom: 'solid thin #ccc', paddingBottom: 5}}>
      <Link active={view===0} onClick={getHandler(0)} title="StateCharts"/>
      <Link active={view===1} onClick={getHandler(1)} title="ConvertTxt2Json"/>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState(0);
  return (
    <div className="App" title="app-main">
      <MenuBar setView={setView} view={view} />
      {view===0 && <StateCharts />}
      {view===1 && <ConvertTxt2Json />}
    </div>
  );
}

export default App;

//LeftMenu
import React from "react";
import { useStore } from "../store";
import * as Parser from "./stateChartParser";
import { Process } from "./components";

const menuStyle = {
  border: "solid 1px blue",
  backgroundColor: "#eee",
  height: "90vh"
};

const getHandleInputClick = dispatch => () => dispatch({ format: "input" });

const getHandleTriplesClick = (dispatch, data) => () => {
  const output = JSON.stringify(data.triples, null, 2);
  dispatch({ format: "triples", data: { ...data, output } });
};

const getHandleStateMapClick = (dispatch, data) => () => {
  const output = Parser.asStateMap(data.triples);
  data.output = JSON.stringify(output, null, 2);
  dispatch({ format: "statemap", data });
};

const getHandleKumuJsonClick = (dispatch, data) => () => {
  const output = Parser.asKumuJson(data.triples);
  data.output = JSON.stringify(output, null, 2);
  dispatch({ format: "kumu", data });
};

const getHandleXStateJsonClick = (dispatch, data) => () => {
  const output = Parser.asXStateJson(data.triples);
  data.output = JSON.stringify(output, null, 2);
  dispatch({ format: "xstate", data });
};

const LeftMenu = () => {
  const [state, dispatch] = useStore();
  const data = state.data || {};

  const handleInputClick = getHandleInputClick(dispatch);
  const handleTriplesClick = getHandleTriplesClick(dispatch, data);
  const handleStateMapClick = getHandleStateMapClick(dispatch, data);
  const handleKumuJsonClick = getHandleKumuJsonClick(dispatch, data);
  const handleXStateJsonClick = getHandleXStateJsonClick(dispatch, data);

  return (
    <div style={menuStyle} title="options">
      <Process
        title="Input"
        onClick={handleInputClick}
        selected={state.format === "input"}
      />
      <hr />
      <Process
        title="Triples list"
        onClick={handleTriplesClick}
        selected={state.format === "triples"}
      />
      <Process
        title="State map"
        onClick={handleStateMapClick}
        selected={state.format === "statemap"}
      />
      <Process
        title="Kumu json"
        onClick={handleKumuJsonClick}
        selected={state.format === "kumu"}
      />
      <Process
        title="XState json"
        onClick={handleXStateJsonClick}
        selected={state.format === "xstate"}
      />
    </div>
  );
};

export default LeftMenu;

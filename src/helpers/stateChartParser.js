/*
Read in a text-based state-chart spec, and return a set of triples.
Each triple consists of: {stateFedby, stateFedto, transition }
*/
//import { cancelTaxiDialogue } from './stateChartDef';
const { cancelTaxiDialogue } = require('./stateChartDef');

export const asTextArray = defn => {
  return defn.split('\n')
  .filter((line = '') => {
    return line.trim(); //false if line === ''
  })
  .map(line => line.trimRight()); //keep left indent for human-readability.
}

const makeTriple = (source, transition, target) => ({source, transition, target});


export const asTriplesArray = aTxt => {
  const triples = [];
  let currentState;
  aTxt = (typeof aTxt === 'string') ? asTextArray(aTxt) : aTxt;
  aTxt.forEach(line => {
    const [txt1, txt2, txt3] = line.split('->');
    if (txt3) {
      const triple = makeTriple(txt1.trim(), txt2.trim(),txt3.trim());
      currentState = triple.source;
      triples.push(triple);
    } else if (txt2) {
			const triple = makeTriple(currentState, txt1.trim(), txt2.trim());
      triples.push(triple);
    } else {
      currentState = txt1.trim();
    }
  });
  return triples;
}


export const asStateMap = triples => {
  const map = {};
  triples.forEach(triple => {
    const { source, target, transition } = triple;
    const sourceStateMap = addStateToMapIfNeeded(source, map);
    addTransitionToStateMap(transition, target, sourceStateMap);
    addStateToMapIfNeeded(target, map);
  });
  return map;
}

const addStateToMapIfNeeded = (stateName, map) => {
  stateName = stateName.trim();
  if(!map.hasOwnProperty(stateName)) {
    map[stateName] = {};
  }
  return map[stateName];
}

const addTransitionToStateMap = (txtnName, stateName, stateMap = {}) => {
  txtnName = txtnName.trim();
  stateName = stateName.trim();
  stateMap[txtnName] = stateName; //overwrite without checking
  return stateMap;
}

const txt = asTextArray(cancelTaxiDialogue);
const triples = asTriplesArray(txt);
const map = asStateMap(triples);
//parsed results
export default {
  txt,
  triples,
  map
};

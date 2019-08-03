import * as SCP from './stateChartParser';
import { sample } from './stateChartDef';

const { asTextArray, asTriplesArray, asStateMap, asKumuJson, asXStateJson } = SCP;

describe('asTextArray', () => {
  const testDef = `Line One\n   \nLine Two\ntrailing-spaces   \n  indented`;
  it('should return simple array of values', () => {
    const txt = asTextArray(testDef);
    expect(txt.length).toBe(4) //ignore blank line
    expect(txt[2]).toEqual('trailing-spaces'); //trims trailing spaces
  });
});

describe('asTriplesArray', () => {
  it('should return all valid triples', () => {
    const aTxt = [
      'state1',
      ' txtnA -> state2',
      'txtn B->state3',
      'state2',
      'txtnc -> state1',
    ];
    const triples = asTriplesArray(aTxt);
    expect(triples.length).toBe(3); //three transitions
    triples.forEach(triple => {
      expect(triple).toEqual(expect.objectContaining({
        source: expect.any(String),
        transition: expect.any(String),
        target: expect.any(String),
      }))
    })
    expect(triples).toContainEqual({
      source: 'state1',
      transition: 'txtn B',
      target: 'state3'
    });
  });

  it('should handle single-line defns', () => {
    const aTxt = [
      'state1 -> txtnA -> state2',
      'state1->txtn B->state3',
      'state2 -> txtnc -> state1',
    ];
    const triples = asTriplesArray(aTxt);
    expect(triples.length).toBe(3); //three transitions
    triples.forEach(triple => {
      expect(triple).toEqual(expect.objectContaining({
        source: expect.any(String),
        transition: expect.any(String),
        target: expect.any(String),
      }))
    })
    expect(triples).toContainEqual({
      source: 'state1',
      transition: 'txtn B',
      target: 'state3'
    });
  });

  it('should handle text-string input', () => {
    const txt = `
			state1 -> txtnA -> state2
      state1->txtn B->state3
      state2 -> txtnc -> state1
    `;
    const triples = asTriplesArray(txt);
    expect(triples.length).toBe(3); //three transitions
    triples.forEach(triple => {
      expect(triple).toEqual(expect.objectContaining({
        source: expect.any(String),
        transition: expect.any(String),
        target: expect.any(String),
      }))
    })
    expect(triples).toContainEqual({
      source: 'state1',
      transition: 'txtn B',
      target: 'state3'
    });
  });

});

describe('asStateMap', () => {
  const makeTriple = (source, transition, target) => ({ source, target, transition});
  const triples = [
    makeTriple('state1', 'txtnA', 'state2'),
    makeTriple('state1', 'txtn B', 'state3'),
  ];
  it('should return complete stateChart map', () => {
    const map = asStateMap(triples);
    const states = Object.keys(map);
    expect(states).toEqual(['state1', 'state2', 'state3']);
    expect(map.state1).toEqual({txtnA: 'state2', 'txtn B': 'state3'});
  });
});

describe('asKumuJson', () => {
  const makeTriple = (source, transition, target) => ({ source, target, transition});

	it('should parse into expected format', () => {
		const triples = [
			makeTriple('state1', 'txtnA', 'state2'),
			makeTriple('state1', 'txtn B', 'state3'),
			makeTriple('state2', 'txtnC', 'state3'),
		];
		const json = asKumuJson(triples);
		expect(json.elements.length).toBe(3);
		expect(json.elements.map(node => node.label)).toEqual([
			'state1', 'state2', 'state3'
		]);
		expect(json.elements.map(node => node.type)).toEqual([
			'root', 'node', 'leaf'
		]);

		expect(json.connections.map(link => link.from)).toEqual([
			'state1', 'state1', 'state2'
		]);
		expect(json.connections.map(link => link.to)).toEqual([
			'state2', 'state3', 'state3'
		]);
		expect(json.connections.map(link => link.label)).toEqual([
			'txtnA', 'txtn B', 'txtnC'
		]);
	});

});
/* Kumu json
{
  "elements": [
    {"label": "A"},
    {"label": "B"}
  ],
  "connections": [
    {"from": "A", "to": "B"}
  ]
}
 *
 */

describe('asXStateJson', () => {
	const triples = asTriplesArray(sample);

	it('should parse into expected format', () => {
		const json = asXStateJson(triples);
		expect(json.initial).toEqual(triples[0].source);
		expect(json.states).toBeTruthy();
		const states = Object.keys(json.states);
		expect(states).toContainEqual(json.initial);
	});

	it('should contain state objects in expected format', () => {
		const json = asXStateJson(triples);
		const states = Object.keys(json.states);
		expect(states).toContainEqual('Closing');
		const state = json.states.Closing;
		expect(state.on).toEqual(expect.objectContaining({
			sensorClosed: "DoorClosed",
			userDoOpen: "Opening"
		}));
	});

	it('should handle empty triples array', () => {
		const json = asXStateJson([]);
		expect(json.states).toEqual({});
		expect(json.initial).toEqual(false);
	});
});
/*
{
  "states": {
    "DoorOpened": {
      "on": {
        "userDoClose": "Closing"
      }
    },
    "Closing": {
      "on": {
        "sensorClosed": "DoorClosed",
        "userDoOpen": "Opening"
      }
    },
    "DoorClosed": {
      "on": {
        "userDoOpen": "Opening"
      }
    },
    "Opening": {
      "on": {
        "sensorOpened": "DoorOpened",
        "userDoClose": "Closing"
      }
    }
  },
  "initial": "DoorOpened"
}

*/

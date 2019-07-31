import { asTextArray, asTriplesArray, asStateMap } from './stateChartParser';

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

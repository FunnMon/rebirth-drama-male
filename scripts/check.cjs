const assert = require('node:assert/strict');
const D = require('../story.js');
const expected = { plan: 'mastermind', bond: 'ensemble', free: 'freedom', flex: 'bankrupt', comeback: 'comeback', dark: 'tyrant', unfinished: 'ongoing' };
for (const [route, ending] of Object.entries(expected)) {
  const answers = D.examples[route];
  assert.equal(answers.length, D.episodes.length);
  assert.equal(D.calculate(answers).id, ending, route);
}
assert.match(D.scene(4, [3, 2, 0, 0]).text, /小满早被你送走/);
assert.match(D.scene(4, [1, 2, 0, 0]).text, /现在还在三楼/);
const noBait = [...D.examples.comeback];
noBait[7] = 2;
assert.equal(D.calculate(noBait).id, 'bankrupt');
console.log('Seven ending routes and consequential branches passed.');

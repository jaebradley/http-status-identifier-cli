'use es6';

import chai from 'chai';

import StatusTableCreator from '../../src/services/StatusTableCreator';

const expect = chai.expect;

describe('Status table creator', () => {
  const status = {
    definition: {
      name: 'jae',
      code: 'baebae',
      description: 'bae jadley',
    },
  };

  it('creates title', () => {
    const expected = 'jae (baebae)';
    expect(StatusTableCreator.createStatusTitle(status)).to.eql(expected);
  });

  it('create row without supplementary information', () => {
    const expected = ['jae (baebae)', 'bae jadley'];
    expect(StatusTableCreator.createRowWithoutSupplementaryInformation(status)).to.eql(expected);
  });
});

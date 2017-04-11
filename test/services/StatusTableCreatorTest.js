'use es6';

import chai from 'chai';
import Table from 'cli-table2';

import StatusTableCreator from '../../src/services/StatusTableCreator';

const expect = chai.expect;

describe('Status table creator', () => {
  const tableCreator = new StatusTableCreator();
  const status = {
    definition: {
      name: 'jae',
      code: 'baebae',
      description: 'bae jadley',
      supplementaryInformation: 'the baest of them all',
    },
  };

  it('creates title', () => {
    const expected = 'jae (baebae)';
    expect(StatusTableCreator.createStatusTitle(status)).to.eql(expected);
  });

  it('creates row without supplementary information', () => {
    const expected = ['jae (baebae)', 'bae jadley'];
    expect(StatusTableCreator.createRowWithStatusMeaning(status)).to.eql(expected);
  });

  it('creates row with supplementary information', () => {
    const expected = [
      'Status: jae (baebae)\nMeaning: bae jadley',
      'the baest of them all',
    ];
    expect(StatusTableCreator.createRowWithFullInformation(status)).to.eql(expected);
  });

  describe('create initial table', () => {
    it('creates initial full information table', () => {
      const properties = {
        wordWrap: tableCreator.wordWrap,
        colWidths: [
          tableCreator.columnWidth,
          tableCreator.longColumnWidth,
        ],
      };
      const expected = new Table(properties);
      expect(tableCreator.createInitialTable(true)).to.eql(expected);
    });

    it('creates initial not full information table', () => {
      const properties = {
        wordWrap: tableCreator.wordWrap,
        colWidths: [
          tableCreator.columnWidth,
          tableCreator.columnWidth,
        ],
      };
      const expected = new Table(properties);
      expect(tableCreator.createInitialTable(false)).to.eql(expected);
    });
  });
});

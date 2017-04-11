'use es6';

import chai from 'chai';
import sinon from 'sinon';

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

  it('tests constructor parameters', () => {
    expect(tableCreator.hAlign).to.equal('center');
    expect(tableCreator.columnWidth).to.equal(30);
    expect(tableCreator.longColumnWidth).to.equal(60);
    expect(tableCreator.wordWrap).to.equal(true);
  });

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

  describe('create table', () => {
    it('creates table with full information', () => {
      const statuses = [
        status,
        status,
        status,
      ];
      const row = [
        'Status: jae (baebae)\nMeaning: bae jadley',
        'the baest of them all',
      ];
      const expected = [
        row,
        row,
        row,
      ].toString();
      const initialTableCreation = sinon.stub(tableCreator, 'createInitialTable').returns([]);
      expect(tableCreator.create(statuses, true)).to.eql(expected);
      initialTableCreation.restore();
    });

    it('creates table with full information', () => {
      const statuses = [
        status,
        status,
        status,
      ];
      const row = ['jae (baebae)', 'bae jadley'];
      const expected = [
        row,
        row,
        row,
      ].toString();
      const initialTableCreation = sinon.stub(tableCreator, 'createInitialTable').returns([]);
      expect(tableCreator.create(statuses, false)).to.eql(expected);
      initialTableCreation.restore();
    });
  });
});

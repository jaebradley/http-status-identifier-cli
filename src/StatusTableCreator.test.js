import Table from 'cli-table3';

import StatusTableCreator from './StatusTableCreator';

describe('Status table creator', () => {
  const tableCreator = new StatusTableCreator();
  const status = {
    name: 'jae',
    code: 'baebae',
    description: 'bae jadley',
    supplementaryInformation: 'the baest of them all',
  };

  it('tests constructor parameters', () => {
    expect(tableCreator.hAlign).toEqual('center');
    expect(tableCreator.columnWidth).toEqual(30);
    expect(tableCreator.longColumnWidth).toEqual(60);
    expect(tableCreator.wordWrap).toEqual(true);
  });

  it('creates title', () => {
    const expected = 'jae (baebae)';
    expect(StatusTableCreator.createStatusTitle(status)).toEqual(expected);
  });

  it('creates row without supplementary information', () => {
    const expected = ['jae (baebae)', 'bae jadley'];
    expect(StatusTableCreator.createRowWithStatusMeaning(status)).toEqual(expected);
  });

  it('creates row with supplementary information', () => {
    const expected = [
      'Status: jae (baebae)\nMeaning: bae jadley',
      'the baest of them all',
    ];
    expect(StatusTableCreator.createRowWithFullInformation(status)).toEqual(expected);
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
      expect(tableCreator.createInitialTable(true)).toEqual(expected);
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
      expect(tableCreator.createInitialTable(false)).toEqual(expected);
    });
  });
});

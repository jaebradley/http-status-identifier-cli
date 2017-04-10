'use es6';

import Table from 'cli-table2';

export default class StatusTableCreator {
  constructor() {
    this.hAlign = 'center';
    this.columnWidth = 30;
    this.longColumnWidth = 100;
    this.wordWrap = true;
  }

  create(statuses, hasSupplementaryInformation) {
    const table = this.createInitialTable(hasSupplementaryInformation);

    statuses.forEach((status) => {
      if (hasSupplementaryInformation) {
        table.push(StatusTableCreator.addSupplementaryInformationRow(status));
      } else {
        table.push(StatusTableCreator.addRowWithoutSupplementaryInformation(status));
      }
    });

    return table.toString();
  }

  createInitialTable(hasSupplementaryInformation) {
    const properties = { wordWrap: this.wordWrap };
    if (hasSupplementaryInformation) {
      properties.colWidths = [
        this.columnWidth,
        this.longColumnWidth,
      ];
      return new Table(properties);
    }

    properties.colWidths = [
      this.columnWidth,
      this.columnWidth,
    ];

    return new Table(properties);
  }

  static addSupplementaryInformationRow(status) {
    return [
      `Status: ${StatusTableCreator.createTitle(status)}\nMeaning: ${status.definition.description}`,
      status.definition.supplementaryInformation,
    ];
  }

  static addRowWithoutSupplementaryInformation(status) {
    return [StatusTableCreator.createTitle(status), status.definition.description];
  }

  static createTitle(status) {
    return `${status.definition.name} (${status.definition.code})`;
  }
}

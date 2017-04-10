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
        table.push(StatusTableCreator.createSupplementaryInformationRow(status));
      } else {
        table.push(StatusTableCreator.createRowWithoutSupplementaryInformation(status));
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
    } else {
      properties.colWidths = [
        this.columnWidth,
        this.columnWidth,
      ];
    }

    return new Table(properties);
  }

  static createSupplementaryInformationRow(status) {
    return [
      `Status: ${StatusTableCreator.createStatusTitle(status)}\nMeaning: ${status.definition.description}`,
      status.definition.supplementaryInformation,
    ];
  }

  static createRowWithoutSupplementaryInformation(status) {
    return [StatusTableCreator.createStatusTitle(status), status.definition.description];
  }

  static createStatusTitle(status) {
    return `${status.definition.name} (${status.definition.code})`;
  }
}

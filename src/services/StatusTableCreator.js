'use es6';

import Table from 'cli-table2';

export default class StatusTableCreator {
  constructor() {
    this.hAlign = 'center';
    this.columnWidth = 30;
    this.longColumnWidth = 100;
    this.wordWrap = true;
  }

  create(statuses, showFullInformation) {
    const table = this.createInitialTable(showFullInformation);

    statuses.forEach((status) => {
      if (showFullInformation) {
        table.push(StatusTableCreator.createRowWithFullInformation(status));
      } else {
        table.push(StatusTableCreator.createRowWithStatusMeaning(status));
      }
    });

    return table.toString();
  }

  createInitialTable(showFullInformation) {
    const properties = { wordWrap: this.wordWrap };
    if (showFullInformation) {
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

  static createRowWithFullInformation(status) {
    return [
      `Status: ${StatusTableCreator.createStatusTitle(status)}\nMeaning: ${status.definition.description}`,
      status.definition.supplementaryInformation,
    ];
  }

  static createRowWithStatusMeaning(status) {
    return [
      StatusTableCreator.createStatusTitle(status),
      status.definition.description,
    ];
  }

  static createStatusTitle(status) {
    return `${status.definition.name} (${status.definition.code})`;
  }
}

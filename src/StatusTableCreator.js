import Table from 'cli-table3';

export default class StatusTableCreator {
  constructor() {
    this.hAlign = 'center';
    this.columnWidth = 30;
    this.longColumnWidth = 60;
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

  static createRowWithFullInformation({
    name,
    code,
    description,
    supplementaryInformation,
  }) {
    return [
      `Status: ${StatusTableCreator.createStatusTitle({ name, code })}\nMeaning: ${description}`,
      supplementaryInformation,
    ];
  }

  static createRowWithStatusMeaning(status) {
    return [
      StatusTableCreator.createStatusTitle(status),
      status.description,
    ];
  }

  static createStatusTitle({ name, code }) {
    return `${name} (${code})`;
  }
}

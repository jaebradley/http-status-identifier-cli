/* eslint array-callback-return: 0 */

'use es6';

import { HttpStatusIdentifier } from 'http-status-identifier';

import StatusTableCreator from '../services/StatusTableCreator';

export default class CommandExecutor {
  constructor() {
    this.identifier = new HttpStatusIdentifier();
    this.tableCreator = new StatusTableCreator();
  }

  execute(statusIdentifiers, showFullInformation) {
    const statuses = statusIdentifiers.map((statusIdentifier) => {
      this.identifier.identify(statusIdentifier);
    });
    return Promise.all(statuses).then((values) => {
      try {
        return this.tableCreator.create(values, showFullInformation);
      } catch (Error) {
        return `Unable to find HTTP statuses for: ${statusIdentifiers} due to ${Error}`;
      }
    });
  }
}

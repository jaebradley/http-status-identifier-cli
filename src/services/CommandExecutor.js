'use es6';

import { HttpStatusIdentifier } from 'http-status-identifier';

import StatusTableCreator from '../services/StatusTableCreator';

export default class CommandExecutor {
  constructor() {
    this.identifier = new HttpStatusIdentifier();
    this.tableCreator = new StatusTableCreator();
  }

  execute(statusIdentifiers, hasSupplementaryInformation) {
    const statuses = statusIdentifiers.map((statusIdentifier) => {
      this.identifier.identify(statusIdentifier);
    });
    return Promise.all(statuses).then((values) => {
      try {
        console.log(this.tableCreator.create(values, hasSupplementaryInformation));
      } catch (Error) {
        console.log(`Unable to find HTTP statuses for: ${statusIdentifiers} due to error: ${Error}`);
      }
    });
  }
}

/* eslint array-callback-return: 0 */
/* eslint arrow-body-style: 0 */

'use es6';

import { HttpStatusIdentifier } from 'http-status-identifier';
import open from 'open';

import StatusTableCreator from '../services/StatusTableCreator';

export default class CommandExecutor {
  constructor() {
    this.identifier = new HttpStatusIdentifier();
    this.tableCreator = new StatusTableCreator();
  }

  execute(statusIdentifiers, showFullInformation, openDocumentation) {
    const statuses = statusIdentifiers.map((statusIdentifier) => {
      return this.identifier.identify(statusIdentifier);
    });

    return Promise.all(statuses).then((values) => {
      if (openDocumentation) {
        values.forEach((value) => {
          open(value.definition.documentationUrl);
        });
      }

      try {
        return this.tableCreator.create(values, showFullInformation);
      } catch (Error) {
        return `Unable to find HTTP statuses for: ${statusIdentifiers} due to ${Error}`;
      }
    });
  }
}

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
    this.browserPageOpener = open;
  }

  execute(statusIdentifiers, showFullInformation, openDocumentation) {
    const statuses = statusIdentifiers.map((statusIdentifier) => {
      return this.identifier.identify(statusIdentifier);
    });

    return Promise.all(statuses).then((values) => {
      if (openDocumentation) {
        values.forEach((value) => {
          this.browserPageOpener(value.definition.documentationUrl);
        });
      }

      return values;
    }).then((values) => {
      // eslint-disable-next-line no-console
      console.log(this.tableCreator.create(values, showFullInformation));
    // eslint-disable-next-line no-console
    }).catch(Error => console.error(`Unable to find HTTP statuses for: ${statusIdentifiers}. Reason: ${Error.reason}`));
  }
}

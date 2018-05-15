import { HttpStatusIdentifier } from 'http-status-identifier';
import open from 'open';

import StatusTableCreator from './StatusTableCreator';

const identifyStatuses = ({ statusIdentifiers, options }) => {
  const {
    showFullInformation,
    openDocumentation,
  } = options;
  const identifier = new HttpStatusIdentifier();
  const statuses = statusIdentifiers.map(statusIdentifer => identifier.identify(statusIdentifer));

  const tableCreator = new StatusTableCreator();
  console.log(tableCreator.create(statuses, showFullInformation));

  if (openDocumentation) {
    statuses.forEach((status => open(status.definition.documentationUrl)));
  }
};

export default identifyStatuses;

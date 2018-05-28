import { identifyStatus } from 'http-status-identifier';
import open from 'open';

import StatusTableCreator from './StatusTableCreator';

const identifyStatuses = ({ statusIdentifiers, options }) => {
  const {
    showFullInformation,
    openDocumentation,
  } = options;
  const statuses = statusIdentifiers.map(statusIdentifer => identifyStatus(statusIdentifer));

  const tableCreator = new StatusTableCreator();
  console.log(tableCreator.create(statuses, showFullInformation));

  if (openDocumentation) {
    statuses.forEach((status => open(status.documentationUrl)));
  }
};

export default identifyStatuses;

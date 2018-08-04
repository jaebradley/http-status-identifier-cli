import {
  identifyStatus,
  HttpStatusFamily,
} from 'http-status-identifier';
import open from 'open';

import StatusTableCreator from './StatusTableCreator';

const NUMERICAL_FAMILIES = Object.freeze({
  '1XX': HttpStatusFamily.INFORMATIONAL,
  '2XX': HttpStatusFamily.SUCCESS,
  '3XX': HttpStatusFamily.REDIRECTION,
  '4XX': HttpStatusFamily.CLIENT_ERROR,
  '5XX': HttpStatusFamily.SERVER_ERROR,
});

const identifyStatuses = ({ statusIdentifiers, options }) => {
  const {
    showFullInformation,
    openDocumentation,
  } = options;
  const statuses = [];

  statusIdentifiers.forEach((statusIdentifer) => {
    try {
      const status = identifyStatus(statusIdentifer);
      if (status) {
        statuses.push(status);
      }
    } catch (statusError) {
      // unable to identify status
      // let's try to identify families
      try {
        const formattedStatusIdentifier = statusIdentifer.toUpperCase();
        const family = HttpStatusFamily[formattedStatusIdentifier]
          || NUMERICAL_FAMILIES[formattedStatusIdentifier];
        if (family && family.statuses) {
          family.statuses.forEach(status => statuses.push(status));
        }
      } catch (statusFamilyError) {
        // unable to identify family
      }
    }
  });

  const tableCreator = new StatusTableCreator();
  console.log(tableCreator.create(statuses, showFullInformation));

  if (openDocumentation) {
    statuses.forEach((status => open(status.documentationUrl)));
  }
};

export default identifyStatuses;

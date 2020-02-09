import {
  identifyStatus,
  HttpStatusFamily,
} from 'http-status-identifier';

const NUMERICAL_FAMILIES = Object.freeze({
  '1XX': HttpStatusFamily.INFORMATIONAL,
  '2XX': HttpStatusFamily.SUCCESS,
  '3XX': HttpStatusFamily.REDIRECTION,
  '4XX': HttpStatusFamily.CLIENT_ERROR,
  '5XX': HttpStatusFamily.SERVER_ERROR,
});

const identifyStatuses = (statusIdentifiers) => {
  const statuses = [];

  statusIdentifiers.forEach((statusIdentifer) => {
    try {
      const formattedStatusIdentifier = statusIdentifer.toUpperCase();
      const status = identifyStatus(formattedStatusIdentifier);
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
          family.statuses.forEach((status) => statuses.push(status));
        }
      } catch (statusFamilyError) {
        // unable to identify statuses or families
        // not much we can do here
        // instead of erroring, let's just "swallow" this inability to identify the statuses
        // so we can output values for remaining values
      }
    }
  });
  return statuses;
};

export default identifyStatuses;

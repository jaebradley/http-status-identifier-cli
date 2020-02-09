import open from 'open';

import identifyStatuses from './identifyStatuses';
import StatusTableCreator from './StatusTableCreator';

const cli = ({ statusIdentifiers, options }) => {
  const statuses = identifyStatuses(statusIdentifiers);

  const {
    showFullInformation,
    openDocumentation,
  } = options;

  // eslint-disable-next-line no-console
  console.log(new StatusTableCreator().create(statuses, showFullInformation));

  if (openDocumentation) {
    statuses.forEach(((status) => open(status.documentationUrl)));
  }
};

export default cli;

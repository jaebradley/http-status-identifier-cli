#!/usr/bin/env node

import program from 'commander';

import pkg from '../../package.json';
import CommandExecutor from '../services/CommandExecutor';

const executor = new CommandExecutor();

program.version(pkg.version)
       .option('-f, --fullInformation', 'Supply full information')
       .option('-d, --documentation', 'Open documentation in browser')
       .arguments('[statusIdentifiers...]')
       .action((statusIdentifiers) => {
         executor.execute(statusIdentifiers, program.fullInformation, program.documentation)
         .then(table => console.log(table)) // eslint-disable-line no-console
         .catch(Error => console.log(`Unable to find HTTP statuses for: ${statusIdentifiers}. Reason: ${Error.reason}`)); // eslint-disable-line no-console
       })
       .parse(process.argv);

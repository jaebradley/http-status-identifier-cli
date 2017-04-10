#!/usr/bin/env node

import program from 'commander';

import pkg from '../../package.json';
import CommandExecutor from '../services/CommandExecutor';

const executor = new CommandExecutor();

program.version(pkg.version)
       .option('-s, --supplementaryInformation', 'Has supplementary information')
       .option('-d, --documentation', 'Get documentation')
       .arguments('[statusIdentifiers...]')
       .action((statusIdentifiers) => {
         executor.execute(statusIdentifiers, program.supplementaryInformation);
       })
       .parse(process.argv);

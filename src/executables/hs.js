#!/usr/bin/env node

import program from 'commander';

import pkg from '../../package.json';
import CommandExecutor from '../services/CommandExecutor';

const executor = new CommandExecutor();

program.version(pkg.version)
       .option('-f, --fullInformation', 'Supply full information')
       .option('-d, --documentation', 'Open documentation in browser')
       .arguments('[statusIdentifiers...]')
       // eslint-disable-next-line max-len
       .action(statusIdentifiers => executor.execute(statusIdentifiers, program.fullInformation, program.documentation))
       .parse(process.argv);

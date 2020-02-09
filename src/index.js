#!/usr/bin/env node

import program from 'commander';

import pkg from '../package.json';
import cli from './cli';

program.version(pkg.version)
  .option('-f, --fullInformation', 'Supply full information')
  .option('-d, --documentation', 'Open documentation in browser')
  .arguments('[statusIdentifiers...]')
  .action((statusIdentifiers) => cli({
    statusIdentifiers,
    options: {
      showFullInformation: program.fullInformation,
      openDocumentation: program.documentation,
    },
  }))
  .parse(process.argv);

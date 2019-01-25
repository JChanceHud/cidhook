#!/usr/bin/env node

const cidhook = require('.');
const yargs = require('yargs');

yargs
  .command('pin <cid>', 'pin an item', _yargs =>
    _yargs
      .positional('cid', {
        describe: 'the content id to be pinned'
      }),
    argv => cidhook.pin(argv.server, argv.cid))
  .command(
    'unpin <cid>', 'unpin an item', _yargs =>
      _yargs
        .positional('cid', {
          describe: 'the content id to be unpinned'
        }),
    argv => cidhook.unpin(argv.server, argv.cid))
  .option('server', {
    alias: 's',
    default: 'http://localhost:3000'
  })
  .demandCommand(1, 'You need a command to operate')
  .argv

  // console.log(`cid ${cid} successfully updated: (${method || 'pin'})`);

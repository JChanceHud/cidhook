#!/usr/bin/env node

const cidhook = require('.');
const yargs = require('yargs');

yargs
  .command('pin <cid>', 'pin an item', _yargs =>
    _yargs
      .positional('cid', {
        describe: 'the content id to be pinned'
      }),
    async argv => {
      await cidhook.pin(argv.server, argv.cid);
      console.log(`cid ${argv.cid} successfully updated: (pin)`);
    })
  .command(
    'unpin <cid>', 'unpin an item', _yargs =>
      _yargs
        .positional('cid', {
          describe: 'the content id to be unpinned'
        }),
    async argv => {
      await cidhook.unpin(argv.server, argv.cid);
      console.log(`cid ${argv.cid} successfully updated: (unpin)`);
    })
  .option('server', {
    alias: 's',
    default: 'http://localhost:3000'
  })
  .demandCommand(1, 'You need a command to operate')
  .argv

  // console.log(`cid ${cid} successfully updated: (${method || 'pin'})`);

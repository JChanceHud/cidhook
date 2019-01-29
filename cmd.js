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
      console.log(`Pinning cid: ${argv.cid} on ${argv.server}`);
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
      console.log(`Unpinning cid: ${argv.cid} on ${argv.server}`);
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

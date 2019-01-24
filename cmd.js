#!/usr/bin/env node

const cidhook = require('.');

require('yargs')
  .command('pin <server> <cid>', 'pin an item', yargs =>
    yargs
      .positional('cid', {
        describe: 'the content id to be pinned'
      })
      .positional('server', {
        describe: 'the cidhookd server url, example: http://localhost:3000'
      }),
    argv => cidhook.pin(argv.server, argv.cid))
  .command(
    'unpin <server> <cid>', 'unpin an item', yargs =>
      yargs
        .positional('cid', {
          describe: 'the content id to be unpinned'
        })
        .positional('server', {
          describe: 'the cidhookd server url, example: http://localhost:3000'
        }),
    argv => cidhook.unpin(argv.server, argv.cid))
  .argv

  // console.log(`cid ${cid} successfully updated: (${method || 'pin'})`);

#!/usr/bin/env node

const cidhook = require('.');
const [ _, __, domain, cid, method ] = process.argv;

const { CIDHOOK_SECRET } = process.env;

if (process.argv.length < 3) {
  console.log('\nUsage: cidhook <url> <cid> [pin|unpin]\n');
  process.exit(0);
}

Promise.resolve()
  .then(() => {
    if (!method || method === 'pin') {
      return cidhook.pin(domain, cid);
    } else if (method === 'unpin') {
      return cidhook.unpin(domain, cid);
    } else {
      console.log(`Invalid command specified ${method}`);
      process.exit(1);
    }
  })
  .then(() => {
    console.log(`cid ${cid} successfully updated: (${method || 'pin'})`);
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

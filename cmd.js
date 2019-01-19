#!/usr/bin/env node

const cidhook = require('.');
const [ _, __, _domain, cid, _method ] = process.argv;

const { CIDHOOK_SECRET } = process.env;

if (process.argv.length < 3) {
  console.log('\nUsage: cidhook <url> <cid> [pin|unpin]\n');
  process.exit(0);
}

const domain = _domain.indexOf('http') === 0 ? _domain : `https://${_domain}`;

Promise.resolve()
  .then(() => {
    if (!_method || _method === 'pin') {
      return cidhook.pin(domain, cid);
    } else if (_method === 'unpin') {
      return cidhook.unpin(domain, cid);
    } else {
      console.log(`Invalid command specified ${_method}`);
      process.exit(1);
    }
  })
  .then(() => {
    console.log(`cid ${cid} successfully updated (${_method})`);
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

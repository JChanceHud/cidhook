const fetch = require('node-fetch');
const isIPFS = require('is-ipfs');

function assertArgs(domain, cid) {
  return Promise.resolve()
    .then(() => {
      if (isIPFS.multihash(cid)) return;
      throw new Error(`Non-multihash cid supplied: ${cid}`);
    });
}

function pin(domain, cid) {
  return assertArgs(domain, cid)
    .then(() => fetch(`${domain}/${cid}`, {
      method: 'POST',
      headers: {
        'Authorization': process.env.CIDHOOK_SECRET
      }
    }))
    .then(res => {
      if (res.status === 204) return;
      throw new Error(`Non-204 response received: ${res.status}`);
    });
}

function unpin(domain, cid) {
  return assertArgs(domain, cid)
    .then(() => fetch(`${domain}/${cid}`, {
      method: 'DELETE',
      headers: {
        'Authorization': process.env.CIDHOOK_SECRET
      }
    }))
    .then(res => {
      if (res.status === 204) return;
      throw new Error(`Non-204 response received: ${res.status}`);
    });
}

module.exports = { pin, unpin };

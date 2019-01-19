const fetch = require('node-fetch');
const isIPFS = require('is-ipfs');

function parseArgs(_domain, cid) {
  return Promise.resolve()
    .then(() => {
      if (!isIPFS.multihash(cid)) {
        throw new Error(`Non-multihash cid supplied: ${cid}`);
      }
      const domain = _domain.indexOf('http') === 0 ? _domain : `https://${_domain}`
      return { cid, domain };
    });
}

function pin(_domain, _cid) {
  return parseArgs(_domain, _cid)
    .then(({ domain, cid }) => fetch(`${domain}/${cid}`, {
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

function unpin(_domain, _cid) {
  return parseArgs(_domain, _cid)
    .then(({ domain, cid}) => fetch(`${domain}/${cid}`, {
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

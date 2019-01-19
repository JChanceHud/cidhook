const fetch = require('node-fetch');
const isIPFS = require('is-ipfs');

async function parseArgs(_domain, cid, options = {}) {
  // Make sure the header options are merged with defaults
  options.headers = Object.assign({
    'Authorization': process.env.CIDHOOK_SECRET
  }, options.headers);
  // Make sure cid is a multihash
  if (!isIPFS.multihash(cid)) {
    throw new Error(`Non-multihash cid supplied: ${cid}`);
  }
  // Prepend https
  const domain = _domain.indexOf('http') === 0 ? _domain : `https://${_domain}`
  return { cid, domain };
}

async function pin(_domain, _cid, _options = {}) {
  const { domain, cid, options } = await parseArgs(_domain, _cid, _options);
  const response = await fetch(`${domain}/${cid}`, Object.assign({
    method: 'POST'
  }, _options));
  if (response.status !== 204) {
    throw new Error(`Non-204 response received: ${response.status}`);
  }
  return response;
}

async function unpin(_domain, _cid, _options = {}) {
  const { domain, cid, options } = await parseArgs(_domain, _cid, _options);
  const response = await fetch(`${domain}/${cid}`, Object.assign({
    method: 'DELETE'
  }, options));
  if (response.status !== 204) {
    throw new Error(`Non-204 response received: ${response.status}`);
  }
  return response;
}

module.exports = { pin, unpin };

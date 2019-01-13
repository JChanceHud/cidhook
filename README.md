# cidhook ![](https://img.shields.io/npm/v/cidhook.svg)

A tool for easily pinning IPFS cids from ephemeral environments (like CI, local machine, etc). Interacts with a [cidhookd](https://github.com/jchancehud/cidhookd) server.

## Usage

The `cidhook` command can be used to interact with remote `cidhook` instances.

`cidhook <url> <cid> [pin|unpin]`

The CLI is a thin wrapper for making the actual http request.

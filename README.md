EOSIO p2p network monitor
=========================

## Installation

```
apt install -y curl
curl -sL https://deb.nodesource.com/setup_13.x | bash -
apt install -y nodejs


git clone https://github.com/eos-amsterdam-rnd/eosio_net_monitor.git /opt/eosio_net_monitor
cd /opt/eosio_net_monitor
npm install -g

```


## Usage

The tool is accessing a `nodeos` instance which has `plugin =
eosio::net_api_plugin` enabled. WARNING: this plugin exposes functions
that allow to disable p2p peers, so it must not be exposed to public
internet.

Important output fields:

* `me -> block_time_delta` shows how far the node's own head block is
  behind the host clock.

* `peers -> /peername/ -> connected` indicates if the p2p connection
  is in use.

* `peers -> /peername/ -> last_handshake_seconds_ago` shows when the
  latest handshake message has been received. The longer the period,
  the more stable the remote node is.



```
$ check_eosio_net_connections --url=http://127.0.0.1:8888
{
  me: {
    head_block_num: 94973898,
    block_time_delta: -0.985,
    host_time: 1576338318985
  },
  peers: {
    'fn001.eossv.org:445': {
      connected: true,
      last_handshake_head_block_num: 94959399,
      last_handshake_blocks_ago: 14499,
      last_handshake_seconds_ago: 7291.760654052734
    },
    'p2p-mainnet.eosgravity.com:8001': { connected: false },
    'eth2.tokenika.io:9876': { connected: false },
    'peer2.eoshuobipool.com:18181': { connected: false },
    'node0.eos.fish:6789': { connected: false },
    'peer.main.alohaeos.com:9876': {
      connected: true,
      last_handshake_head_block_num: 94960494,
      last_handshake_blocks_ago: 13404,
      last_handshake_seconds_ago: 6741.830676025391
    },
    'mainnet.eoslaomao.com:443': { connected: false },
    'br.eosrio.io:9876': { connected: false },
    'mainnet.eosamsterdam.net:9876': { connected: false }
  }
}

```


# Copyright and License

Copyright (c) 2019 EOS Amsterdam.

This work is distributed under MIT License.

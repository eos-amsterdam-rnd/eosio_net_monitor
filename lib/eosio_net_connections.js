const fetch = require('node-fetch');

let exportFunctions = {};

exportFunctions.check_connections = (url, callback) => {
    let ret = {};

    fetch(url + '/v1/chain/get_info')
        .then(res => res.json())
        .then((info) => {
            let now = +new Date();
            let me_block_time = +Date.parse(info['head_block_time']);
            let me_head_block = info['head_block_num'];
            
            ret['me'] = {};
            ret['me']['head_block_num'] = me_head_block;
            ret['me']['block_time_delta'] = (me_block_time - now)/1e3;
            ret['me']['host_time'] = now;
            
            fetch(url + '/v1/net/connections')
                .then(res => res.json())
                .then((conns) => {

                    ret['peers'] = {};
                    for(let con in conns) {
                        let peer = conns[con];
                        let retpeer = {};
                        let head_block = peer['last_handshake']['head_num'];
                        if( head_block > 0 ) {
                            retpeer['connected'] = true;
                            retpeer['last_handshake_head_block_num'] = head_block;
                            retpeer['last_handshake_blocks_ago'] = me_head_block - head_block;

                            let peertime = peer['last_handshake']['time']/1e3;
                            if( peertime/now > 100 ) { // some nodeos versions return nanoseconds
                                peertime /= 1e3;
                            }
                            retpeer['last_handshake_seconds_ago'] = (now - peertime)/1e3;
                            retpeer['agent'] = peer['last_handshake']['agent'];
                        }
                        else {
                            retpeer['connected'] = false;
                        }

                        ret['peers'][peer.peer] = retpeer;
                    }
                    callback(ret);
                });
        });
};



module.exports = exportFunctions;

const crypto = require('crypto');

class BlockChain {
  constructor () {

  }

  sha256Hash (value, showLog = false) {
    const hash = crypto
    .createHash('sha256')
    .update(String(value))
    .digest('hex');

    if (showLog) {
      console.log(`[info] 数据是 ${value} hash值是 ${hash}`);
    }
    return hash;
  }

  mineDemo (data, difficulty = 5) {
    let nonce = 0;
    let start = Date.now();
    let hash = this.sha256Hash(String(data) + nonce);
    while (hash.substring(0, difficulty) !== '0'.repeat(difficulty)) {
      nonce += 1;
      hash = this.sha256Hash(String(data) + nonce);
    }
    let end = Date.now();
    let time = ((end - start) / 1000).toFixed(2);
    return { nonce, time, hash };
  }
}

module.exports = BlockChain;
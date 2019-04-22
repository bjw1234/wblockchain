const fs = require('fs');
const path = require('path');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
let keyPair = ec.genKeyPair();

const keys = genKeys();

function genKeys () {
  const fileName = path.join(__dirname, '../bjw_wallet.json');
  try {
    let res = JSON.parse(fs.readFileSync(fileName));
    if (res.prv && res.pub && getPub(res.prv) === res.pub) {
      keyPair = ec.keyFromPrivate(res.prv);
      return res;
    } else { // 秘钥错误
      console.error('invalid json!');
    }
  } catch (err) {
    let res = {
      prv: keyPair.getPrivate('hex').toString(),
      pub: keyPair.getPublic('hex').toString()
    };
    fs.writeFileSync(fileName, JSON.stringify(res));
    return res;
  }
}

function getPub (prv) {
  return ec.keyFromPrivate(prv).getPublic('hex').toString();
}

// 私钥加密
function signMsg (msg, prv = keys.prv) {
  console.log(JSON.stringify(arguments, null, 2));
  let keyPairTemp = ec.keyFromPrivate(prv);
  let binaryMsg = Buffer.from(msg);
  let signature = keyPairTemp.sign(binaryMsg);
  let derSign = signature.toDER();
  return Buffer.from(derSign).toString('hex');
}

// 公钥验证
function verifyMsg (msg, sign, pub = keys.pub) {
  const keyPairTemp = ec.keyFromPublic(pub, 'hex');
  let binaryMsg = Buffer.from(msg);
  return keyPairTemp.verify(binaryMsg, sign);
}

function sign ({ from, to, amount, timestamp }) {
  return signMsg(`${timestamp}-${amount}-${from}-${to}`);
}

function verify ({ from, to, amount, timestamp, sign }) {
  return verifyMsg(`${timestamp}-${amount}-${from}-${to}`, sign, from);
}

module.exports = {
  keys, sign, verify, signMsg, verifyMsg, getPub
};
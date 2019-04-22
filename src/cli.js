const WBlockChain = require('./blockchain');
const { formatData } = require('./util');
const key = require('./keys');
const bc = new WBlockChain();

function cli (vorpal) {
  vorpal
  .use(hashCommand)
  .use(signMsgCommand)
  .use(verifyMsgCommand)
  .use(getPubCommand)
  .use(mineDemoCommand)
  .use(prvCommand)
  .use(pubCommand)
  .use(welcome)
  .delimiter('app$').show();
}

function welcome (vorpal) {
  vorpal.log('Welcome to WBlockChain!');
  vorpal.exec('help');
}

function hashCommand (vorpal) {
  vorpal
  .command('hash <value>', '[测试] 计算sha256哈希 <信息>')
  .action(function(args, callback) {
    let hash = bc.sha256Hash(args.value);
    formatData(vorpal, {
      value: args.value,
      hash
    });
    callback();
  });
}

function signMsgCommand (vorpal) {
  vorpal
  .command('sign <msg> [prv]', '[测试] 私钥加密 获取签名 <信息>')
  .action(function(args, callback) {
    let sign = key.signMsg(args.msg, args.prv);
    formatData(vorpal, {
      msg: args.msg,
      prv: args.prv,
      sign
    });
    callback();
  });
}

function verifyMsgCommand (vorpal) {
  vorpal
  .command('verify <msg> <sign> [pub]', '[测试] 使用签名 校验信息 <信息> <签名> [公钥]')
  .action(function(args, callback) {
    let bool = key.verifyMsg(args.msg, args.sign, args.pub);
    formatData(vorpal, {
      msg: args.msg,
      sign: args.sign,
      pub: args.pub,
      bool
    });
    callback();
  });
}

function getPubCommand (vorpal) {
  vorpal
  .command('getpub <prv>', '[测试] 根据私钥计算公钥 <私钥>')
  .action(function(args, callback) {
    let pub = key.getPub(args.prv);
    formatData(vorpal, {
      prv: args.prv,
      pub
    });
    callback();
  });
}

function mineDemoCommand (vorpal) {
  vorpal
  .command('mine <data> <diff>', '[测试] 挖矿 <信息> <困难程度>')
  .action(function(args, callback) {
    let data = bc.mineDemo(args.data, args.diff);
    formatData(vorpal, { ...data });
    callback();
  });
}

function prvCommand (vorpal) {
  vorpal
  .command('prv', '获取本地私钥')
  .action(function(args, callback) {
    let prv = key.keys.prv;
    formatData(vorpal, { prv });
    callback();
  });
}

function pubCommand (vorpal) {
  vorpal
  .command('pub', '获取本地公钥')
  .action(function(args, callback) {
    let pub = key.keys.pub;
    formatData(vorpal, { pub });
    callback();
  });
}

module.exports = cli;
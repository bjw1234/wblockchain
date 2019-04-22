# start

time：2019/4/12

# vorpal 

Vorpal是Node的第一个构建交互式CLI应用程序的框架。

也就是说，我们可以通过这个工具构建基于NodeJS的命令行工具。

Install `vorpal` into your project:

```
$ npm install vorpal --save
```

Create a `.js` file and add the following:

```javascript
const vorpal = require('vorpal')();
 
vorpal
  .command('foo', '输出 "bar".')
  .action(function(args, callback) {
    this.log('bar');
    callback();
  });
 
vorpal
  .delimiter('myapp$')
  .show();
```

这里有两个注意点：

**注意点1：** 导入的时候`require('vorpal')()`注意后面的括号，需要执行才可以。

**注意点2：** `action`的回调不要用箭头函数，否则内部的`this`无法指向`vorpal`实例。

除此之外，我们还可以传入参数：

```js
const Vorpal = require('vorpal')();

Vorpal
	// 可以链式调用多个命令
    .use(showCommand)
    .delimiter('app$')
    .show();

function showCommand (vorpal) {
  vorpal
      .command('foo <name> [age]', '简单测试')
      .action(function(args, callback) {
        this.log('bar');
        this.log(`name = ${args.name}`);
        this.log(`age = ${args.age}`);
        callback();
        // vorpal.ui.cancel();
      });
}
```

**required argument：** 必须的参数用尖括号`<name>`表示。

**optional argument：** 可选参数用方括号`[age]`表示。

# tty-table

Display your data in a table using a terminal, browser, or browser console.

原本是打算使用`cli-table`的，但是其不支持换行显示，且内容超出会有样式问题，所以改用`tty-table`来实现终端表格的显示。

**[Terminal](https://github.com/tecfu/tty-table/blob/HEAD/docs/terminal.md)**

```bash
$ npm install tty-table -S
```

具体使用：

```js
const Table = require('tty-table');

// 定义表头
let header = [
  { value: 'item', headerColor: 'cyan', color: 'white', width: 30 },
  { value: 'price', headerColor: 'cyan', color: 'black', width: 15 },
  { value: 'organic', headerColor: 'cyan', color: 'green', width: 30 }
];

// 使用数组表示每行显示的内容
let rows1 = [
  ['hamburger', 2.50, 'no'],
  ['el jefe\'s special cream sauce', 0.10, 'yes'],
  ['two tacos, rice and beans topped with cheddar cheese', 9.80, 'no'],
  ['apple slices', 1.00, 'yes'],
  ['ham sandwich', 1.50, 'no'],
  ['macaroni, ham and peruvian mozzarella', 3.75, 'no']
];

// 使用对象显示每行的内容
let rows2 = [{
    item: 'hamburger',
    price: 2.50,
    organic: 'no'
  }, {
    item: 'el jefe\'s special cream sauce',
    price: 0.10,
    organic: 'yes'
  },{
    item: 'two tacos, rice and beans topped with cheddar cheese',
    price: 9.80,
    organic: 'no'
  }, {
    item: 'apple slices',
    price: 1.00,
    organic: 'yes'
  }, {
    item: 'ham sandwich',
    price: 1.50,
    organic: 'no'
  }, {
    item: 'macaroni, ham and peruvian mozzarella',
    price: 3.75,
    organic: 'no'
  }
];

// 配置项，默认是换行显示
let options = {
  truncate: '...'
};

// 水平的表格
let t = new Table(header, rows2, options);
let str = t.render();
```

最终显示的结果：

[![ALpdCd.md.png](https://s2.ax1x.com/2019/04/13/ALpdCd.md.png)](https://imgchr.com/i/ALpdCd)

除此之外还有诸多配置项，具体可以查看：

<https://www.npmjs.com/package/tty-table#tableheader-rows-options>

# stringify

语法：

> JSON.stringify(value[, replacer [, space]])

**参数：**

- `value`

  将要序列化成 一个JSON 字符串的值。

- `replacer` 可选

  如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理。

- `space` 可选

  指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格，如果该参数没有提供（或者为null）将没有空格。

# sha256

```js
const crypto = require('crypto');

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
}
```

# elliptic

一种简单的椭圆曲线加密的JavaScript实现。

```js
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
let keyPair = ec.genKeyPair();

// 获取其共有和私有key
keyPair.getPrivate('hex').toString();
keyPair.getPublic('hex').toString();
// 根据私有key拿到keyPair
keyPair = ec.keyFromPrivate('私有key.');
```

对数据进行签名：

```js
// 私钥加密
function signMsg (msg, prv = keys.prv) {
  let keyPairTemp = ec.keyFromPrivate(prv);
  let binaryMsg = Buffer.from(msg);
  let signature = keyPairTemp.sign(binaryMsg);
  let derSign = signature.toDER();
  return Buffer.from(derSign).toString('hex');
}

// 公钥验证
function verifyMsg (msg, sign, pub) {
  const keyPairTemp = ec.keyFromPublic(pub, 'hex');
  let binaryMsg = Buffer.from(msg);
  return keyPairTemp.verify(binaryMsg, sign);
}
```




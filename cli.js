const Vorpal = require('vorpal')();
const Table = require('tty-table');

let header = [
  { value: 'item', headerColor: 'cyan', color: 'white', width: 30 },
  { value: 'price', headerColor: 'cyan', color: 'yellow', width: 15 },
  { value: 'boolean', headerColor: 'cyan', color: 'green', width: 30 }
];

let rows = [
  ['hamburger', 2.50, 'no'],
  ['el jefe\'s special cream sauce', 0.10, 'yes'],
  ['two tacos, rice and beans topped with cheddar cheese', 9.80, 'no'],
  ['apple slices', 1.00, 'yes'],
  ['ham sandwich', 1.50, 'no'],
  ['macaroni, ham and peruvian mozzarella', 3.75, 'no']
];

// 水平的表格
let HorizontalTable = new Table(header, rows);

// 垂直的表格
// let verticalTable = new Table();
//
// verticalTable.push(
// { 'Some key': 'Some value' },
// { 'Another key': 'Another value' }
// );
//
// // 连表
// let corssTable = new Table({
//   head: ['', 'head1', 'head2']
// });
//
// corssTable.push(
// { 'left1': ['value1', 'value2'] },
// { 'left2': ['value3', 'value4'] }
// );

Vorpal
.use(showCommand)
.use(tableCommand)
.delimiter('app$').show();

function tableCommand (vorpal) {
  vorpal.command('table', 'table展示').alias('t').action(function(args, callback) {
    this.log(HorizontalTable.render());
    callback();
  });
}

function showCommand (vorpal) {
  vorpal.command('foo <name> [age]', '简单测试').action(function(args, callback) {
    this.log('bar');
    this.log(`name = ${args.name}`);
    this.log(`age = ${args.age}`);
    callback();
    vorpal.ui.cancel();
  });
}



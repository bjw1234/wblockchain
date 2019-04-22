const TtyTable = require('tty-table');

function formatData (vorpal, data) {
  console.log(JSON.stringify(data, null, 2));
  if (!data) return null;
  if (!Array.isArray(data)) {
    data = [data];
  }
  let first = data[0];
  if (Object.prototype.toString.call(first).slice(8, -1) !== 'Object')
    return null;
  let header = Object.keys(first).map((value) => {
    // 防止sign/pub过长导致表格显示不正常
    return (value === 'sign' || value === 'pub') ? {
      value,
      headerColor: 'cyan',
      color: 'white',
      width: 50
    } : {
      value,
      headerColor: 'cyan',
      color: 'white'
    };
  });
  let table = new TtyTable(header, data);
  // 输出表格
  vorpal.log(table.render());
}

module.exports = {
  formatData
};
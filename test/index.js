const crawler = require('../index');
const moment = require('moment');

crawler({
  moduleType: '',
  isHtml: false,
  dateAfter: 1505790249000
}).then((value) => {
  console.log(value.map((obj) => {
    return Object.assign(obj, {
      date: moment(obj.moment).format('YYYY-MM-DD HH:mm:ss')
    })
  }));
}).catch((err) => {
  console.log(err);
});
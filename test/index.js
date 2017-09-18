const crawler = require('../index');
const moment = require('moment');

crawler({
  moduleType: '',
  isHtml: false,
  dateAfter: moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD').valueOf()
}).then((value) => {
  console.log(value.map((obj) => {
    return Object.assign(obj, {
      date: moment(obj.moment).format('YYYY-MM-DD HH:mm:ss')
    })
  }));
}).catch((err) => {
  console.log(err);
});
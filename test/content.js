const crawler = require('../content');
const moment = require('moment');

crawler('http://hznews.hangzhou.com.cn/chengshi/content/2017-09/17/content_6659767.htm').then((value) => {
    console.log(Object.assign(value, {
        date: moment(value.moment).format('YYYY-MM-DD HH:mm:ss')
    }));
}).catch((err) => {
    console.log(err);
});
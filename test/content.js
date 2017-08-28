const crawler = require('../content');
const moment = require('moment');

crawler('http://hznews.hangzhou.com.cn/chengshi/content/2017-08/28/content_6639153.htm').then((value) => {
    console.log(value);
}).catch((err) => {
    console.log(err);
});
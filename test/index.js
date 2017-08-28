const crawler = require('../index');
const moment = require('moment');

crawler({
    moduleType: 'shehui',
    dateAfter: moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD').valueOf()
}).then((value) => {
    console.log(value);
}).catch((err)=>{
    console.log(err);
});
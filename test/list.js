const crawler = require('../list');
const moment = require('moment');

crawler({
    dateAfter: moment('2017-08-28 00:00:00', 'YYYY-MM-DD  HH:mm:ss').valueOf()
}).then((value) => {
    console.log(value);
}).catch((err)=>{
    console.log(err);
});

// co(function* () {
//     var result = yield crawler();
//     return result;
// }).then(function (value) {
//     console.log(value);
// }, function (err) {
//     console.error(err.stack);
// });

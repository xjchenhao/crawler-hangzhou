const crawler = require('../index');

const co = require('co');
const _ = require('underscore');

crawler({
    moduleType: 'jingji'
}).then((value) => {
    console.log(_.isArray(value));
    console.log(value.length > 0);
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

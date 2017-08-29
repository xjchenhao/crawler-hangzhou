const assert = require('power-assert');
const mocha = require('mocha');
const coMocha = require('co-mocha');
const moment = require('moment');
coMocha(mocha);

const crawler = require('../index');
const _ = require('underscore');


describe('test/index.test.js，获取新闻内容', () => {

    it('404', function*() {
        yield crawler({
            moduleType: 'aaa'
        }).then((value) => {
            assert(false, '错误的类型，不可能进来');
        }).catch((err) => {
            assert(err === '404', err);
        });
    });

    it('获取一天内"文体"类的新闻内容', function*() {
        yield crawler({
            moduleType: 'wenti',
            dateAfter: moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD').valueOf()
        }).then((value) => {
            assert(value.length > 0);
        }).catch((err) => {
            assert(false, err);
        });
    });

    it('获取一天内"所有"的新闻内容', function*() {
        yield crawler({
            moduleType: '',
            dateAfter: moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD').valueOf()
        }).then((value) => {
            assert(value.length > 0);
        }).catch((err) => {
            assert(false, err);
        });
    });
});
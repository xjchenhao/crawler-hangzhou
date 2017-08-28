const assert = require('power-assert');
const mocha = require('mocha');
const coMocha = require('co-mocha');
coMocha(mocha);

const crawler = require('../list');
const _ = require('underscore');


describe('test/showcase.test.js，获取新闻列表', () => {

    it('默认值', function*() {
        yield crawler().then((value) => {
            assert(value.length > 0, `获取到${value.length}条数据`);
        }).catch((err) => {
            assert(false, err);
        });
    });

    it('获取"经济"类型的数据', function*() {
        yield crawler({
            moduleType: 'jingjis'
        }).then((value) => {
            assert(value.length > 0, `获取到${value.length}条数据`);
        }).catch((err) => {
            assert(false, err);
        });
    });

    it('某个时间之前的数据', function*() {
        yield crawler({
            dateAfter: new Date().valueOf() - 86400000
        }).then((value) => {
            assert(value.length > 0, `获取到${value.length}条数据`);
        }).catch((err) => {
            assert(false, err);
        });
    });
});
const assert = require('power-assert');
const mocha = require('mocha');
const coMocha = require('co-mocha');
const moment = require('moment');
coMocha(mocha);

const crawler = require('../list');
const _ = require('underscore');


describe('test/list.test.js，获取新闻列表', () => {

    it('404', function*() {
        yield crawler({
            moduleType: 'aaa'
        }).then((value) => {
            assert(false, '错误的类型，不可能进来');
        }).catch((err) => {
            assert(err === '404错误', err);
        });
    });

    it('获取所有的"经济"板块新闻列表', function*() {
        yield crawler({
            moduleType: 'jingji'
        }).then((value) => {
            assert(value.length > 0);
        }).catch((err) => {
            assert(false, err);
        });
    });

    it('获取一天内的"城市"板块新闻列表', function*() {
        yield crawler({
            moduleType: 'chengshi',
            dateAfter: moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD').valueOf()
        }).then((value) => {
            assert(value.length > 0);
        }).catch((err) => {
            assert(false, err);
        });
    });

    it('获取一天内的"社会"板块新闻列表', function*() {
        yield crawler({
            moduleType: 'shehui',
            dateAfter: moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD').valueOf()
        }).then((value) => {
            assert(value.length > 0);
        }).catch((err) => {
            assert(false, err);
        });
    });

    it('获取一天内的"文体"板块新闻列表', function*() {
        yield crawler({
            moduleType: 'wenti',
            dateAfter: moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD').valueOf()
        }).then((value) => {
            assert(value.length > 0);
        }).catch((err) => {
            assert(false, err);
        });
    });

    it('获取一天内的"科教"板块新闻列表', function*() {
        yield crawler({
            moduleType: 'kejiao',
            dateAfter: moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD').valueOf()
        }).then((value) => {
            assert(value.length > 0);
        }).catch((err) => {
            assert(false, err);
        });
    });
});
const assert = require('power-assert');
const mocha = require('mocha');
const coMocha = require('co-mocha');
coMocha(mocha);

const crawler = require('../content');
const _ = require('underscore');


describe('test/showcase.test.js，获取新闻内容', () => {

    it('设置指定链接', function*() {      //http://hznews.hangzhou.com.cn/chengshi/content/2017-08/28/content_6639153.htm
        yield crawler('http://hznews.hangzhou.com.cn/chengshi/content/2017-08/28/content_6639153.htm').then((value) => {
            assert(true);
        }).catch((err) => {
            assert(false, err);
        });
    });

    it('失效的网址', function*() {      //http://hznews.hangzhou.com.cn/chengshi/content/2017-08/28/content_6639153.htm
        yield crawler('http://hznews.hangzhou.com.cn/chengshi/content/2017-08/28/content_663915003.htm').then((value) => {
            assert(false, '错误的网址，不可能进来');
        }).catch((err) => {
            assert(err === '404错误');
        });
    });
});
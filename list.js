'use strict';

const Crawler = require('crawler');
const co = require('co');
const _ = require('underscore');
const moment = require('moment');

_.str = require('underscore.string');

let c = new Crawler({
    maxConnections: 10
});

module.exports = function (opts) {

    // 设置参数
    opts = Object.assign({
        moduleType: '',
        dateAfter: 0,
    }, opts);

    return new Promise(function (resolve, reject) {
        let newsList = [];  //新闻内容的列表

        if (!opts.moduleType) {
            reject('moduleType是必填项');
            return false;
        }

        c.queue([{
            uri: `http://hznews.hangzhou.com.cn/${opts.moduleType}/index.htm`,
            jQuery: true,

            callback: function (error, res, done) {
                if (error) {
                    console.log(error);
                    return false;
                }

                let $ = res.$;

                if ($('title').text() === '404错误信息') {
                    reject('404', `http://hznews.hangzhou.com.cn/${opts.moduleType}/index.htm`);
                    return false;
                }

                let totalPage = Number($('#displaypagenum a').eq($('#displaypagenum a').length - 3).text());    // 有多少页的新闻列表
                let isResolve = totalPage - 1;  // 异步请求时，当状态码为0时，触发回调。

                if ($('.hzwNews_L_link').length === 0) {
                    reject('获取不到页码');
                }

                // 收集第一页的新闻超链接
                $('.hzwNews_L_link').each(function () {
                    let timeStr = _.str.trim(this.nextSibling.nodeValue);

                    if (!opts.dateAfter) {
                        newsList.push($(this).attr('href'));
                    } else {
                        if (moment(timeStr, 'YYYY-MM-DD  HH:mm').valueOf() > opts.dateAfter) {
                            newsList.push($(this).attr('href'));
                        }
                    }

                });

                // 收集其它新闻列表页的超链接
                for (let i = 1; i < totalPage; i++) {

                    c.queue([{
                        uri: `http://hznews.hangzhou.com.cn/chengshi/index_${i}.htm`,
                        jQuery: true,

                        callback: function (error, res, done) {
                            if (error) {
                                console.log(error);
                                return false;
                            }

                            let $ = res.$;

                            $('.hzwNews_L_link').each(function () {
                                let timeStr = _.str.trim(this.nextSibling.nodeValue);

                                if (!opts.dateAfter) {
                                    newsList.push($(this).attr('href'));
                                } else {
                                    if (moment(timeStr, 'YYYY-MM-DD  HH:mm').valueOf() > opts.dateAfter) {
                                        newsList.push($(this).attr('href'));
                                    }
                                }
                            });

                            isResolve--;
                            if (!isResolve) {
                                resolve(newsList);
                            }

                            done();
                        }
                    }]);
                }
                done();
            }
        }]);
    });
};
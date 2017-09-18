'use strict';

const Crawler = require('crawler');
const co = require('co');
const _ = require('underscore');
const moment = require('moment');

const url = require('url');

_.str = require('underscore.string');

let c = new Crawler({
    maxConnections: 10
});

let newsContent = function (newsUrl, isHtml = false) {

    return new Promise(function (resolve, reject) {
        c.queue([{
            uri: newsUrl,
            jQuery: true,

            callback: function (error, res, done) {
                if (error) {
                    console.log(error);
                    return false;
                }

                let $ = res.$;

                if ($('title').text() === '404错误信息') {
                    reject('404', newsUrl);
                    return false;
                }

                // try {

                let $sourceAndDate = $('.hzwRP_lname05').parent().next().next().next().find('td');

                let resultObj = {
                    title: $('.hzwRP_lname05').text(),
                    content: '',
                    date: moment($sourceAndDate[0].firstChild.data, 'YYYY-MM-DD HH:mm:ss  ').valueOf(),
                    source_name: $sourceAndDate.find('a').text(),
                    source_href: $sourceAndDate.find('a').attr('href'),
                    img_list: []
                };

                // 获得图片列表
                {
                    $('.hzwRP_lname06 img').each(function () {
                        resultObj.img_list.push(url.resolve(newsUrl, $(this).attr('src')));
                    });
                }

                // 获得完整的内容（因为可能存在分页）
                {
                    let $displaypagenum = $('#displaypagenum');
                    let $hzwRP_lname06 = $('.hzwRP_lname06');

                    // 存在分页，且只在第一页进行循环查询（防止死循环）
                    if ($displaypagenum.length && $displaypagenum.find('.current').text() === '1') {

                        let $a = $displaypagenum.find('a');
                        let total = $displaypagenum.find('a').length - 1;
                        let counter = 0;

                        let callback = function () {
                            counter++;

                            if (counter === total) {
                                resolve(resultObj);
                            }
                        };

                        for (let i = 0, l = $a.length; i < l - 1; i++) {
                            newsContent(url.resolve(newsUrl, $a.eq(0).attr('href')), isHtml).then((newsContent) => {
                                resultObj.content += newsContent.content;

                                callback();
                            }).catch((err, msg) => {
                                if (err === '404') {
                                    callback();
                                    return false;
                                }

                                reject(err, msg);
                            });
                        }

                    } else {
                        resultObj.content = isHtml ? $hzwRP_lname06.html() : $hzwRP_lname06.text();

                        resolve(resultObj);
                    }
                }

                // resolve({
                //     title: $('.hzwRP_lname05').text(),
                //     content: isHtml ? $('.hzwRP_lname06').html() : $('.hzwRP_lname06').text(),
                //     date: moment($sourceAndDate[0].firstChild.data, 'YYYY-MM-DD HH:mm:ss  ').valueOf(),
                //     source_name: $sourceAndDate.find('a').text(),
                //     source_href: $sourceAndDate.find('a').attr('href'),
                //     img_list: imgList
                // });
                // } catch (err) {
                //     reject('dom元素有调整:' + newsUrl);
                // }

                done();
            }
        }]);
    });
};

module.exports = newsContent;
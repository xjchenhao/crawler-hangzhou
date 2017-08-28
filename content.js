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

let newsContent = function (newsUrl) {

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
                    reject('404错误');
                    return false;
                }

                try {

                    let $sourceAndDate = $('.hzwRP_lname05').parent().next().next().next().find('td');

                    let test = $('.hzwRP_lname06 img').eq(0);

                    resolve({
                        title: $('.hzwRP_lname05').text(),
                        content: $('.hzwRP_lname06').text(),
                        date: moment($sourceAndDate[0].firstChild.data, 'YYYY-MM-DD HH:mm:ss  ').format('YYYY-MM-DD HH:mm:ss'),
                        source_name: $sourceAndDate.find('a').text(),
                        source_href: $sourceAndDate.find('a').attr('href'),
                        cover_picture: test.length ? url.resolve(newsUrl, test.attr('src')) : '',
                    });
                } catch (err) {
                    reject('dom元素有调整:' + newsUrl);
                }

                done();
            }
        }]);
    });
};

module.exports = newsContent;
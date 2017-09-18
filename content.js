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

let newsContent = function(newsUrl, isHtml = false) {

  return new Promise(function(resolve, reject) {
    c.queue([{
      uri: newsUrl,
      jQuery: true,

      callback: function(error, res, done) {
        if (error) {
          console.log(error);
          return false;
        }

        let $ = res.$;

        if ($('title').text() === '404错误信息') {
          reject('404', newsUrl);
          return false;
        }

        try {

          let $sourceAndDate = $('.hzwRP_lname05').parent().next().next().next().find('td');

          let imgList = [];
          $('.hzwRP_lname06 img').each(function() {
            imgList.push(url.resolve(newsUrl, $(this).attr('src')));
          });

          resolve({
            title: $('.hzwRP_lname05').text(),
            content: isHtml ? $('.hzwRP_lname06').html() : $('.hzwRP_lname06').text(),
            date: moment($sourceAndDate[0].firstChild.data, 'YYYY-MM-DD HH:mm:ss  ').valueOf(),
            source_name: $sourceAndDate.find('a').text(),
            source_href: $sourceAndDate.find('a').attr('href'),
            img_list: imgList
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
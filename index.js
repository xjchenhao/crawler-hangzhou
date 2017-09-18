'use strict';

const crawlerList = require('./list');
const crawlerContent = require('./content');
const co = require('co');

let crawler = function (opts) {
    return new Promise(function (resolve, reject) {

        crawlerList(opts).then((value) => {

            let newsContentMapList = [];
            let total = value.length;
            let counter = 0;
            let callback=function(){
                counter++;

                if (counter === total) {
                    resolve(newsContentMapList);
                }
            };

            value.forEach((newsUrl) => {

                crawlerContent(newsUrl,opts.isHtml).then((newsContent) => {
                    newsContentMapList.push(newsContent);

                    callback();
                }).catch((err, msg) => {
                    if (err === '404') {
                        callback();
                        return false;
                    }

                    reject(err, msg);
                });
            })
        }).catch((err) => {
            reject(err);
        });
    })
};

let arrConcat = function (arr, type) {
    return this.concat(arr.map((obj) => {
        return Object.assign(obj, {
            type: type
        })
    }));
};

module.exports = function (opts) {
    if (opts.moduleType) {
        return crawler(opts);
    } else {
        let arr = [];
        return co(function *() {
            yield crawler(Object.assign(opts,{
              moduleType: 'jingji',
            })).then((value) => {
                arr = arrConcat.call(arr, value, 'jingji');
            });

            yield crawler(Object.assign(opts,{
              moduleType: 'chengshi',
            })).then((value) => {
                arr = arrConcat.call(arr, value, 'chengshi');
            });

            yield crawler(Object.assign(opts,{
              moduleType: 'shehui',
            })).then((value) => {
                arr = arrConcat.call(arr, value, 'shehui');
            });

            yield crawler(Object.assign(opts,{
              moduleType: 'wenti',
            })).then((value) => {
                arr = arrConcat.call(arr, value, 'wenti');
            });

            yield crawler(Object.assign(opts,{
              moduleType: 'kejiao',
            })).then((value) => {
                arr = arrConcat.call(arr, value, 'kejiao');
            });

            return arr;
        }).catch(function (err) {
            console.log(err);
        });

    }
};
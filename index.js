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

            value.forEach((newsUrl) => {

                crawlerContent(newsUrl).then((newsContent) => {
                    newsContentMapList.push(newsContent);

                    counter++;
                    if (counter === total) {
                        resolve(newsContentMapList);
                    }
                }).catch((err) => {
                    reject(err);
                });
            })
        }).catch((err) => {
            reject(err);
        });
    })
};

let arrConcat = function (arr, type) {
    return arr.concat(arr.map((obj) => {
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
            yield crawler({
                moduleType: 'jingji',
                dateAfter: opts.dateAfter
            }).then((value) => {
                arr = arrConcat(value, 'jingji');
            });

            yield crawler({
                moduleType: 'chengshi',
                dateAfter: opts.dateAfter
            }).then((value) => {
                arr = arrConcat(value, 'chengshi');
            });

            yield crawler({
                moduleType: 'shehui',
                dateAfter: opts.dateAfter
            }).then((value) => {
                arr = arrConcat(value, 'shehui');
            });

            yield crawler({
                moduleType: 'wenti',
                dateAfter: opts.dateAfter
            }).then((value) => {
                arr = arrConcat(value, 'wenti');
            });

            yield crawler({
                moduleType: 'kejiao',
                dateAfter: opts.dateAfter
            }).then((value) => {
                arr = arrConcat(value, 'kejiao');
            });

            return arr;
        }).catch(function (err) {
            console.log(err);
        });

    }
};
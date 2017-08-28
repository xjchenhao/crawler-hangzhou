'use strict';

const crawlerList = require('./list');
const crawlerContent = require('./content');

module.exports = function (opts) {

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
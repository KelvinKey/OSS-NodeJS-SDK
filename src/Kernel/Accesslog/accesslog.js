'use strict'

const oss = require('ali-oss');
const config = require('/oss-nodejs-sdk/config');

const client = new oss(config);


const Log = {

    /**开启 Bucket 日志
     * @param $src
     * @param $log
     */
    putBucketLogging: async ($src, $log) => {
        try {
            console.log(await client.putBucketLogging($src, $log));
        } catch (err) {
            console.log(err);
        }
    },

    /**查看 Bucket 日志
     * @param $src
     */
    getBucketLogging: async $src => {
        try {
            console.log(await client.getBucketLogging($src));
        } catch (err) {
            console.log(err);
        }
    },

    /**关闭 Bucket 日志
    * @param $src
    */
    deleteBucketLogging: async $src => {
        try {
            console.log(await client.deleteBucketLogging($src));
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = Log;
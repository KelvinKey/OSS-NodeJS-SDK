'use strict';

const oss = require('ali-oss');
const config = require('/oss-nodejs-sdk/config');
const fs = require('fs');

const client = new oss(config);


const Oss = {

    /**OSS服务中下载所需文件到本地临时文件
     * @param string $src 
     * @param string $file
     */
    get: async ($src, $file) => {
        try {
            console.log(await client.get($src, $file));
        } catch (err) {
            console.log(err);
        }
    },

    /**OSS服务中下载所需文件到本地内存
     * @param strict $src
     */
    getBuffer: async $src => {
        try {
            console.log((await client.get($src)).content);
        } catch (err) {
            console.log(err);
        }
    },

    /**OSS服务中流式下载所需文件
     * @param string $src 
     * @param string $file
     */
    getStream: async ($src, $file) => {
        try {
            let result = await client.getStream($src);
            console.log(result)
            let writeStream = fs.createWriteStream($file);
            console.log(writeStream)
            result.stream.pipe(writeStream);
        } catch (err) {
            console.log(err);
        }
    },

    /**HTTP 下载
     * @param $src
     * @param $params
     */
    signatureUrl: async ($src, $params = {}) => {
        try {
            console.log(await client.signatureUrl($src, $params));
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = Oss;

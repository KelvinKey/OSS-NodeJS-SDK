'use strict'

const oss = require('ali-oss');
const config = require('/oss-nodejs-sdk/config');

const client = new oss(config);


const Oss = {

    /**判断文件是否存在
     * @param string $src
     */
    getFile: async $src => {
        await client.get($src).then(res => {
            console.log(res.res.status == 200 ? "Ok" : "No");
        }).catch((e) => {
            console.log(e.code == 'NoSuchKey' ? "NoSuchKeyError:The specified key does not exist" : e);
        })
    },

    /**列举指定Bucket下的所有文件
     * @param params = {prefix: '',marker: ''}
     */
    list: async (params = {}) => {
        try {
            console.log(await client.list(params));

        } catch (err) {
            console.log(err);
        }
    },

    /**列举指定目录下的文件和子目录
     * @param string $src
     */
    // listDir: async $src => {
    //     try {
    //         (await client.list({
    //             prefix: $src,
    //             delimiter: '/'
    //         })).prefixes.forEach(subDir => {
    //             console.log('SubDir: %s', subDir);
    //         })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

}

module.exports = Oss;

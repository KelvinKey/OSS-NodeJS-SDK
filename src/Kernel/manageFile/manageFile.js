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
    listDir: async $src => {
        try {
            let result = await client.list({
                prefix: $src,
                delimiter: '/'
            });

            result.prefixes && result.prefixes.forEach(subDir => {
                console.log('SubDir: %s', subDir);
            });
            result.objects && result.objects.forEach(obj => {
                console.log('Object: %s', obj.name);
            });
        } catch (err) {
            console.log(err);
        }
    },

    /**拷贝文件
     * @param string $toSrc
     * @param string $fromSrc
     */
    copy: async ($toSrc, $fromSrc, $params = {}) => {
        try {
            console.log(await client.copy($toSrc, $fromSrc, Object.keys($params).length > 0 ? { meta: $params } : {}))
        } catch (err) {
            console.log(err);
        }
    },

    /**删除单个文件
     * @param $src
     */
    delete: async $src => {
        try {
            console.log(await client.delete($src));
        } catch (err) {
            console.log(err);
        }
    },

    /**批量删除文件
     * @param $params
     * @param $quiet
     */
    deleteMulti: async ($params = [], $quiet = false) => {
        try {
            console.log(await client.deleteMulti($params, $quiet ? { quiet: $quiet } : {}))
        } catch (err) {
            console.log(err);
        }
    },

    /**解冻归档文件
     * @param  $src
     */
    restore: async $src => {
        await client.restore($src).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err);
        })
    }
}

module.exports = Oss;

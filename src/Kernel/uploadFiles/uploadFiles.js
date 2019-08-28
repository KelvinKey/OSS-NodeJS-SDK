'use strict';

const oss = require('ali-oss');
const config = require('/oss-nodejs-sdk/config');
const fs = require('fs');

const client = new oss(config);

const Oss = {

    /** put
     * @param string $src
     * @param string $file
     */
    put: async ($src, $file) => {
        try {
            console.log(await client.put($src, $file));
        } catch (err) {
            console.log(err);
        }
    },

    /** putBuffer 
     * @param string $src
     * @param string $content
     */
    putBuffer: async ($src, $content) => {
        try {
            console.log(await client.put($src, new Buffer($content)));
        } catch (err) {
            console.log(err);
        }
    },

    /**append upload 
     * @param string $src
     * @param string $file
     */
    append: async ($src, $file) => {
        try {
            console.log(await client.append($src, $file));
        } catch (err) {
            console.log(err);
        }
    },

    /** Stream upload 
     * @param string $src
     * @param string $file
     * @param bool $chunked
     */
    putStream: async ($src, $file, $chunked = false) => {
        try {
            console.log(await client.putStream($src, fs.createReadStream($file), $chunked ? { contentLength: fs.statSync($file).size } : {}));
        } catch (err) {
            console.log(err);
        }
    },

    /** multipartUpload  
     * @param string $src
     * @param string $file
     */
    multipartUpload: async ($src, $file) => {
        try {
            console.log(await client.multipartUpload($src, $file, {
                progress: async bar => { console.log('-------------' + parseInt(bar * 100) + '%') }
            }));

            console.log(await client.head($src));

        }
        catch (err) {
            err.code === 'ConnectionTimeoutError' ? console.log("Woops,超时啦!") : console.log(err);
        }
    },

    /** resumeUpload  
     * @param string $src
     * @param string $file
     * @param int $parallel
     */
    resumeUpload: async ($src, $file, $parallel = 2) => {
        try {
            console.log(await client.multipartUpload($src, $file, {
                parallel: $parallel,
                checkpoint: Oss.point,
                progress: async (bar, checkpoint, res) => {
                    Oss.point = checkpoint;
                    console.log('-------------' + parseInt(bar * 100) + '%')
                }
            }));
        } catch (err) {
            console.log(err);
        }
    },
    /**记录断点*/
    point: null,

    /**上传文件到指定目录
     * @param string $src
     * @param string $file
     */
    multipartUpload: async ($src, $file) => {
        await client.multipartUpload('base-dir/' + $src, $file, {
            progress: async pro => {
                console.log('Progress: %s', pro);
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

}

module.exports = Oss;

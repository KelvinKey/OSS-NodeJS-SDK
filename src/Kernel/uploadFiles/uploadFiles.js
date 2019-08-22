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
            return await client.put($src, $file);
        } catch (err) {
            return err;
        }
    },

    /** putBuffer 
     * @param string $src
     * @param string $content
     */
    putBuffer: async ($src, $content) => {
        try {
            return await client.put($src, new Buffer($content));
        } catch (err) {
            return err;
        }
    },

    /**append upload 
     * @param string $src
     * @param string $file
     */
    append: async ($src, $file) => {
        try {
            return await client.append($src, $file);
        } catch (err) {
            return err;
        }
    },

    /** Stream upload 
     * @param string $src
     * @param string $file
     * @param bool $chunked
     */
    putStream: async ($src, $file, $chunked = false) => {
        try {
            console.log( await client.putStream($src, fs.createReadStream($file), $chunked ? { contentLength: fs.statSync($file).size } : {}))
        } catch (err) {
            console.log( err);
        }
    }

}


Oss.putStream('/uploadFiles', 'uploadFiles.js', false);
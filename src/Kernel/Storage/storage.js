'use strict';

const oss = require('ali-oss');
const config = require('/oss-nodejs-sdk/config');

const client = new oss(config);

const Oss = {

    /** putBucket
     *  @param string $name
     */
    putBucket: async $name => {
        try {
            console.log(await client.putBucket($name));
        } catch (err) {
            console.log(err);
        }
    },
    /** listBuckets
     *  @param string $prefix
     */
    listBuckets: async ($prefix = '') => {
        try {
            console.log(await client.listBuckets($prefix.trim() !== "" ? { prefix: $prefix } : {}));
        } catch (err) {
            console.log(err);
        }
    },

    /** deleteBucket
     *  @param string $name
     */
    deleteBucket: async $name => {
        try {
            console.log(await client.deleteBucket($name));
        } catch (err) {
            console.log(err);
        }
    },

    /** getBucketACL
     *  @param string $name
     */
    putBucketACL: async $name => {
        try {
            console.log(await client.putBucketACL($name));

        } catch (err) {
            console.log(err);
        }
    },

    /** getBucketACL
     *  @param string $name
     */
    putBucketACL: async ($name, $acl = 'private') => {
        try {
            console.log(await client.putBucketACL($name, $acl));
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = Oss;

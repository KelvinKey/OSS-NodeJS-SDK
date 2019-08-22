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
            return await client.putBucket($name);
        } catch (err) {
            return err;
        }
    },
    /** listBuckets
     *  @param string $prefix
     */
    listBuckets: async ($prefix = '') => {
        try {
            return await client.listBuckets($prefix.trim() !== "" ? { prefix: $prefix } : {});
        } catch (err) {
            return err;
        }
    },

    /** deleteBucket
     *  @param string $name
     */
    deleteBucket: async $name => {
        try {
            return await client.deleteBucket($name);
        } catch (err) {
            return err;
        }
    },

    /** getBucketACL
     *  @param string $name
     */
    putBucketACL: async $name => {
        try {
            return await client.putBucketACL($name);

        } catch (err) {
            return err;
        }
    },

    /** getBucketACL
     *  @param string $name
     */
    putBucketACL: async ($name, $acl = 'private') => {
        try {
            return await client.putBucketACL($name, $acl);
        } catch (err) {
            return err;
        }
    }

}

module.exports = Oss;

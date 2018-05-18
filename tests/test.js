'use strict';

var test = require('tape').test;
var sinon = require('sinon');
var index = require('../index.js');
var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});

test("calls callback with deserialized data", function (assert) {
    assert.plan(3);

    let event = {
        path: '/lightsail',
        httpMethod: 'GET',
        headers: {
            connection: 'upgrade',
            host: 'localhost',
            'x-real-ip': '127.0.0.1',
            'x-forwarded-for': '127.0.0.1',
            'x-forwarded-proto': 'http',
            'content-length': '0',
            'user-agent': 'insomnia/5.16.2',
            'content-type': 'application/x-www-form-urlencoded',
            accept: '*/*'
        },
        queryStringParameters: {
            action: 'start'
        },
        body: ''
    };

    const createContext = (cb) => {
        return { succeed: data => cb(data) };
    };

    index.handler(event, createContext(result => {
        assert.same(result.statusCode, 200);
        assert.same(result.body, '{"data":[]}');
        assert.true(result);
    }));
});

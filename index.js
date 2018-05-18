'use strict';

const AWS = require('aws-sdk');
const axios = require('axios');
const qs =    require('querystring');

const startLightsailServer = (name, cb) => {

    let lightsail = new AWS.Lightsail();

    let params = {
        instanceName: name
    };

    lightsail.startInstance(params, function(err, data) {
        if (err) {
            console.log(err);
            cb(err, []);
        } else {

            let results = {
                id: data.operations[0].id,
                CurrentState: 'running'
            };

            cb(null, results);
        }
    });
};

const stopLightsailServer = (name, cb) => {

    let lightsail = new AWS.Lightsail();

    let params = {
        instanceName: name
    };

    lightsail.stopInstance(params, function(err, data) {
        if (err) {
            console.log(err);
            cb(err, []);
        } else {

            let results = {
                id: data.operations[0].id,
                CurrentState: 'stopping',
            };

            cb(null, results);
        }
    });
};

const statusLightsailServer = (name, cb) => {

    let lightsail = new AWS.Lightsail();

    let params = {
        instanceName: name
    };

    lightsail.getInstanceState(params, function(err, data) {
        if (err) {
            console.log(err);
            cb(err, []);
        } else {

            let results = {
                CurrentState: data.state.name
            };

            cb(null, results);
        }
    });
};


const buildResponse = (err, results, cb) => {
    let response = {
        statusCode: 500,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({error: 'internal_error ' , data: err})
    };

    if (!err) {
        response.statusCode = 200;
        response.body = JSON.stringify({data: results});
    }

    cb(response);
};

exports.handler = (event, context) => {
    if (!event.queryStringParameters) {
        buildResponse(null, [], context.succeed);
    } else if (event.queryStringParameters.hasOwnProperty('action') &&
        event.queryStringParameters.hasOwnProperty('reference') &&
        event.queryStringParameters.action === 'start'
    ) {

        let instanceName = event.queryStringParameters.reference;
        startLightsailServer(
            instanceName,
            (err, results) => {
                buildResponse(err, results, context.succeed);
            }
        );

    } else if (event.queryStringParameters.hasOwnProperty('action') &&
        event.queryStringParameters.hasOwnProperty('reference') &&
        event.queryStringParameters.action === 'stop'
    ) {

        let instanceName = event.queryStringParameters.reference;
        stopLightsailServer(
            instanceName,
            (err, results) => {
                buildResponse(err, results, context.succeed);
            }
        );

    } else if (
        event.queryStringParameters.hasOwnProperty('action') &&
        event.queryStringParameters.hasOwnProperty('reference') &&
        event.queryStringParameters.action === 'status'
    ) {

        let instanceName = event.queryStringParameters.reference;
        statusLightsailServer(
            instanceName,
            (err, results) => {
                buildResponse(err, results, context.succeed);
            }
        );

    } else {
        buildResponse(null, [], context.succeed);
    }
};

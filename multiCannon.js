'use strict'

const autocannon = require('autocannon');
let http = require('http');
let https = require('https');

module.exports = async function loadTest(ArrayTarget, auth, isHttps) {
    http = isHttps == 'https' ? https : http;
    let Cookie;
    let GPromise;
    
    for (let i = 0, counterTests = 1; i < ArrayTarget.length; i++) {
        await new Promise(resolve => {
            const req = http.request(ArrayTarget[0].url, {
                method: 'POST',
                auth: auth
            }, (res) => {
                // console.log(`STATUS: ${res.statusCode}`);
                // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
                // console.log('Coockie: ' + res.headers['set-cookie']);
                Cookie = res.headers['set-cookie'];
                res.on('end', () => {
                    console.log('No more data in response.');
                });
                resolve();
            });
            req.end();
        });
        ArrayTarget[i].headers = { cookie: Cookie };
        let instance = autocannon(typeof ArrayTarget[i] == 'object' ? ArrayTarget[i] : { url: ArrayTarget[i] }, (err, result) => { })
        instance.on('start', () => {
            console.log('start load test # ' + counterTests);
            console.log('cookie: ' + Cookie);
        })

        instance.on('done', () => {
            console.log('done load test # ' + counterTests);
            console.log('Result:')
            GPromise();
        });

        await new Promise(resolve => {
            GPromise = resolve;
            autocannon.track(instance, {
                renderProgressBar: true,
                renderResultsTable: true
            });
        });
        counterTests++
    }
}

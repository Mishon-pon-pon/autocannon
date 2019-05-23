'use strict'

const autocannon = require('autocannon');
let http = require('http');
let https = require('https');

module.exports = async function loadTest(ArrayTarget, auth) {
    let Cookie;
    let GPromise;
    for (let i = 0, counterTests = 1; i < ArrayTarget.length; i++) {
        let xhttp = ArrayTarget[i].url.substr(0, 5) == 'https' ? https : http;
        await new Promise(resolve => {
            const req = xhttp.request(ArrayTarget[i].url, {
                method: 'POST',
                auth: auth
            }, (res) => {
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

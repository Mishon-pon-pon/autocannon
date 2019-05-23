## Install

```
npm i multicannon
```

## Usage

```
multicannon = require('multicannon');
```

## API

### multicannon(opts, auth, protocol)

Start multicannon against the given target.

* `opts`: Array of configuration options for the multicannon instance. This can have the following attributes. _REQUIRED_.
    * `url`: The given target. Can be http or https. _REQUIRED_.
    * `socketPath`: A path to a Unix Domain Socket or a Windows Named Pipe. A `url` is still required in order to send the correct Host header and path. _OPTIONAL_.
    * `connections`: The number of concurrent connections. _OPTIONAL_ default: `10`.
    * `duration`: The number of seconds to run the multicannon. Can be a [timestring](https://www.npmjs.com/package/timestring). _OPTIONAL_ default: `10`.
    * `amount`: A `Number` stating the amount of requests to make before ending the test. This overrides duration and takes precedence, so the test won't end until the amount of requests needed to be completed are completed. _OPTIONAL_.
    * `timeout`: The number of seconds to wait for a response before . _OPTIONAL_ default: `10`.
    * `pipelining`: The number of [pipelined requests](https://en.wikipedia.org/wiki/HTTP_pipelining) for each connection. Will cause the `Client` API to throw when greater than 1. _OPTIONAL_ default: `1`.
    * `bailout`: The threshold of the number of errors when making the requests to the server before this instance bail's out. This instance will take all existing results so far and aggregate them into the results. If none passed here, the instance will ignore errors and never bail out. _OPTIONAL_ default: `undefined`.
    * `method`: The http method to use. _OPTIONAL_ `default: 'GET'`.
    * `title`: A `String` to be added to the results for identification. _OPTIONAL_ default: `undefined`.
    * `body`: A `String` or a `Buffer` containing the body of the request. Insert one or more randomly generated IDs into the body by including `[<id>]` where the randomly generated ID should be inserted (Must also set idReplacement to true). This can be useful in soak testing POST endpoints where one or more fields must be unique. Leave undefined for an empty body. _OPTIONAL_ default: `undefined`.
    * `headers`: An `Object` containing the headers of the request. _OPTIONAL_ default: `{}`.
    * `setupClient`: A `Function` which will be passed the `Client` object for each connection to be made. This can be used to customise each individual connection headers and body using the API shown below. The changes you make to the client in this function will take precedence over the default `body` and `headers` you pass in here. There is an example of this in the samples folder. _OPTIONAL_ default: `function noop () {}`.
    * `maxConnectionRequests`: A `Number` stating the max requests to make per connection. `amount` takes precedence if both are set. _OPTIONAL_
    * `maxOverallRequests`: A `Number` stating the max requests to make overall. Can't be less than `connections`. `maxConnectionRequests` takes precedence if both are set. _OPTIONAL_
    * `connectionRate`: A `Number` stating the rate of requests to make per second from each individual connection. No rate limiting by default. _OPTIONAL_
    * `overallRate`: A `Number` stating the rate of requests to make per second from all connections. `connectionRate` takes precedence if both are set. No rate limiting by default. _OPTIONAL_
    * `reconnectRate`: A `Number` which makes the individual connections disconnect and reconnect to the server whenever it has sent that number of requests. _OPTIONAL_
    * `requests`: An `Array` of `Object`s which represents the sequence of requests to make while benchmarking. Can be used in conjunction with the `body`, `headers` and `method` params above. The `Object`s in this array can have `body`, `headers`, `method`, or `path` attributes, which overwrite those that are passed in this `opts` object. Therefore, the ones in this (`opts`) object take precedence and should be viewed as defaults. Check the samples folder for an example of how this might be used. _OPTIONAL_.
    * `idReplacement`: A `Boolean` which enables the replacement of `[<id>]` tags within the request body with a randomly generated ID, allowing for unique fields to be sent with requests. Check out [an example of programmatic usage](./samples/using-id-replacement.js) can be found in the samples. _OPTIONAL_ default: `false`
    * `forever`: A `Boolean` which allows you to setup an instance of multicannon that restarts indefinitely after emiting results with the `done` event. Useful for efficiently restarting your instance. To stop running forever, you must cause a `SIGINT` or call the `.stop()` function on your instance. _OPTIONAL_ default: `false`
    * `servername`: A `String` identifying the server name for the SNI (Server Name Indication) TLS extension. _OPTIONAL_ default: `undefined`.
    * `excludeErrorStats`: A `Boolean` which allows you to disable tracking non 2xx code responses in latency and bytes per second calculations. _OPTIONAL_ default: `false`.
* `auth`: authorization 'login:pass'
* `protocol`: 'http' or 'https'


Example that just prints the table of results on completion:

```js
const multicannon = require('multicannon');

const URLArr = [
    {
        url: 'http://localhost:3000/login',
        connections: 10,
        duration: 10
    },
    {
        url: 'http://localhost:3000/,
        connections: 10,
        duration: 10
    }
]



multicannon(URLArr, 'login:pass', 'http');
```

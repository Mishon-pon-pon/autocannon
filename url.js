const LoadTest = require('./multiCannon');

const URLArr = [
    {
        url: 'https://github.com/mcollina/autocannon',
        connections: 15,
        duration: 1
    },
    {
        url: 'http://localhost:20319/category/exist',
        connections: 15,
        duration: 10
    }
    ,{
        url: 'http://localhost:20319/sum/category/12',
        connections: 15,
        duration: 10
    }
]



LoadTest(URLArr, 'terem848@gmail.com:Kfpfymz@1887');
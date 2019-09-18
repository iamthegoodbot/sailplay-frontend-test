const http = require('http');
const limits = require('./search_limits.json');
const users = require('./users.json');

const app = http.createServer((req,res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");

    req.on('error', err => {
        console.error(err);
        // Handle error...
        res.statusCode = 400;
        res.end('400: Bad Request');
        return;
    });

    res.on('error', err => {
        console.error(err);
    });

    if(req.url === "/limits" && req.method === "GET") {
        res.end(JSON.stringify(limits));
    }
    if (req.url === '/users' && req.method === 'GET') {
        res.end(JSON.stringify(users));
    }
});
app.listen(3001);
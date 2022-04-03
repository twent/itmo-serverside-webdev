import { Server } from 'http';
import fs from 'fs';

// CORS headers
const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
};

Server((req, res) => {
    //res.writeHead(200, {'Content-Length': 3}); - write status code and headers
    //res.write('\u0002\u0001\u0021'); - unicode binary write
    //res.write(Buffer.from([1, 2, 33])); - binary write from buffer
    
    if (req.url === '/ru') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8', ...CORS });
        res.write('<h1>Да</h1>\n');
        res.end(JSON.stringify(req.headers));
    } else if (req.url === '/index.html') {
        fs.readFile('index.html', function (err, html) {
            if (err) {
                throw err; 
            }
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8', ...CORS });
            res.end(html);
        });       
    } else if (req.url === '/download') {
        res.writeHead(200, {'Content-Disposition': 'attachment; filename="File.txt"'});
        res.end('File\n');
    } else {
        res.end('OK\n');
    }
}).listen(8080);
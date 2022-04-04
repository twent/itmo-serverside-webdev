import { Server } from 'http';
import fs from 'fs';

// CORS headers
const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
};

Server((req, res) => {
    
    if (req.url === '/ru') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8', ...CORS });
        res.write('<h1>Да</h1>\n');
        res.write(JSON.stringify(req.headers));
    } else if (req.url === '/index.html') {
        fs.readFile('index.html', function (err, html) {
            if (err) {
                throw err; 
            }
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8', ...CORS });
            res.write(html);
        });       
    } else if (req.url === '/download') {
        res.writeHead(200, {'Content-Disposition': 'attachment; filename="File.txt"'});
        res.write('File\n');
    } else if (req.url.startsWith('/timer')) {
        const secs = req.url.substring(1 + req.url.indexOf('?'));
        return setTimeout(() => res.end(`<h1>Miliseconds: ${secs}ms</h1>\n`), secs);
    } else if (req.url.startsWith('/blocking')) {
        const secs = req.url.substring(1 + req.url.indexOf('?'));
        // blocking thread code
        ((y = 10000, x = Date.now()) => { while (Date.now() - x < y) ;})();
        return setTimeout(() => res.end(`<h1>Miliseconds: ${secs}ms</h1>\n`), secs);
    } else {
        res.write('OK\n');
    }

    res.end();

}).listen(8080);
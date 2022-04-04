import { Server } from 'http';
import finalhandler from 'finalhandler';
import { createReadStream as createRS } from 'fs';
import serveStatic from 'serve-static';

// use current directory
var serve = serveStatic('.');

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
        // reading file using read stream
        return createRS('index.html').pipe(res);
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
        return serve(req, res, finalhandler(req, res))
    }

    res.end();

}).listen(8080);
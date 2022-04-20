import { Server } from 'http';
import finalhandler from 'finalhandler';
import path from 'path';
import { createReadStream as createRS } from 'fs';
import serveStatic from 'serve-static';

// __DIRNAME
const __dirname = path.resolve();

// use current directory
var serve = serveStatic('.');

// CORS headers
const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
};

// HttpServer PORT
const PORT = process.env.PORT || 8000;

const server = Server((req, res) => {
    
    if (req.url.startsWith('/ru')) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8', ...CORS });
        res.write('<h1>Да</h1>\n');
        res.write(JSON.stringify(req.headers));
    } else if (req.url.startsWith('/index.html') || req.url === '/') {
        // reading file using read stream
        return createRS(path.join(__dirname, 'public', 'index.html')).pipe(res);
    } else if (req.url.startsWith('/download')) {
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

});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
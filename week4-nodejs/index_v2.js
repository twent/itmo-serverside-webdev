import { Server } from 'http';
import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();

// CORS headers
const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers'
};

// HttpServer PORT
const PORT = process.env.PORT || 8000;

const server = Server((req, res) => {
    
    if (req.url === '/ru') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8', ...CORS });
        res.write('<h1>Да</h1>\n');
        res.write(JSON.stringify(req.headers));
    } else if (req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), function (err, html) {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8', ...CORS });
            res.end(html);
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
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8', ...CORS });
        res.write('Not Found\n');
    }

    res.end();

});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
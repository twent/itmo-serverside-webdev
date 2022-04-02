import { Server } from 'http';

Server((req, res) => {
    res.end('OK\n');
}).listen(8080);
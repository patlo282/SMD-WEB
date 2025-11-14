import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import server from './qr.js';
import code from './pair.js';
import { EventEmitter } from 'events';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __path = process.cwd();

const app = express();
const PORT = process.env.PORT || 8000;

EventEmitter.defaultMaxListeners = 500;

app.use('/server', server);
app.use('/code', code);

app.use('/pair', async (req, res, next) => {
    res.sendFile(__path + '/pair.html');
});

app.use('/qr', async (req, res, next) => {
    res.sendFile(__path + '/qr.html');
});

app.use('/', async (req, res, next) => {
    res.sendFile(__path + '/main.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`
Don't Forgot To Give Star

 Server running on http://localhost:` + PORT);
});

export default app;

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import router from './routes/routes';

const app = express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use('/api/v1/', router);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

export default app;

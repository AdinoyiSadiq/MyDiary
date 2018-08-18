import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import router from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/api/v1/', router);

// app.use((err, req, res) => {
//   res.status(422).send({ error: err });
// });

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);

export default app;

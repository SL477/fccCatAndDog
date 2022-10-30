import express, { Request, Response, NextFunction } from 'express';
import * as tf from '@tensorflow/tfjs-node';
import predict from './predict';

const app = express();
const port = process.env.PORT || 3001;;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/main.js', (req: Request, res: Response) => {
    res.sendFile(process.cwd() + '/client/main.js');
});

app.get('/style.css', (req: Request, res: Response) => {
    res.sendFile(process.cwd() + '/views/style.css');
});

app.get('/summary', async (req: Request, res: Response) => {
    // './jsmodel/model.json'
    const model = await tf.loadLayersModel(tf.io.fileSystem('./jsmodel/model.json'));
    model.summary();
    res.send('Look at the server');
});

app.post('/predict', async (req: Request, res: Response) => {
    try {
        // console.log('req', req.body.pic);
        const p = await predict(req.body.pic);
        res.json(p);
    }
    catch (e) {
        console.log('post predict', e);
        res.json({'classification': 'error', 'error': true, 'cat': 0, 'dog': 0});
    }
});

// 404 Not Found Middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function(req: Request, res: Response, next: NextFunction) {
    res.status(404)
        .type('text')
        .send('Not Found');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
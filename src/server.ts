import express, { Request, Response } from 'express';
import { io, loadLayersModel } from '@tensorflow/tfjs-node';
import predict from './predict';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Return the home page
 */
app.get('/', (req: Request, res: Response) => {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/main.js', (req: Request, res: Response) => {
    res.sendFile(process.cwd() + '/client/main.js');
});

app.get('/style.css', (req: Request, res: Response) => {
    res.sendFile(process.cwd() + '/views/style.css');
});

/**
 * Get the model summary
 */
app.get('/summary', async (req: Request, res: Response) => {
    // './jsmodel/model.json'
    const model = await loadLayersModel(io.fileSystem('./jsmodel/model.json'));
    let summary = '';
    model.summary(undefined, undefined, (x: string) => (summary += '<br>' + x));
    res.send('Summary: ' + summary);
});

/**
 * Get the predictions
 */
app.post('/predict', async (req: Request, res: Response) => {
    try {
        const p = await predict(req.body.pic);
        res.json(p);
    } catch (e) {
        console.log('post predict', e);
        res.json({ classification: 'error', error: true, cat: 0, dog: 0 });
    }
});

// 404 Not Found Middleware
app.use(function (req: Request, res: Response) {
    res.status(404).type('text').send('Not Found');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

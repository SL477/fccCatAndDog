import express from 'express';
import { modelLoader } from './modelHelper.js';
import predict from './predict.js';
import path from 'path';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// return the static files
app.use(express.static(path.join(process.cwd(), 'views')));

let model;

async function initModel() {
  try {
    model = await modelLoader();
  }
  catch (err) {
    console.error('Failed to load Tensorflow model:', err);
    process.exit(1);
  }
}

/**
 * Get the model summary
 */
app.get('/summary', async (req, res) => {
  // const model = await loadLayersModel(io.fileSystem('./jsmodel/model.json'));
  let summary = '';
  model.summary(undefined, undefined, (x) => (summary += '<br>' + x));
  res.send('Summary: ' + summary);
});

/**
 * Get the predictions
 */
app.post('/predict', async (req, res) => {
  try {
    res.json(await predict(req.body.pic, model));
  }
  catch (e) {
    console.log('post predict', e);
    res.json({ classification: 'error', error: true, cat: 0, dog: 0 });
  }
});

// 404 Not Found Middleware
app.use(function (req, res) {
  res.status(404).type('text').send('Not Found');
});

app.use((err, req, res) => {
  console.error('[✖] Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

initModel().then(() => app.listen(port, () => console.log(`Listening on port ${port}`)));

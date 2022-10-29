import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req: any, res: { sendFile: (arg0: string) => void; }) => {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/main.js', (req: any, res: any) => {
    res.sendFile(process.cwd() + '/views/main.js');
});

app.get('/style.css', (req: any, res: any) => {
    res.sendFile(process.cwd() + '/views/style.css');
});

// 404 Not Found Middleware
app.use(function(req: any, res: any, next: any) {
    res.status(404)
        .type('text')
        .send('Not Found');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
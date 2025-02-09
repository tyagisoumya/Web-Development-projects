import express from 'express';
import path from 'path';
import multer from 'multer';
import { mergePdfs } from './merge.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });
const port = 4000;

app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'));
});

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
    console.log(req.files);

    if (req.files.length < 2) {
        return res.status(400).send('Please upload at least two PDFs.');
    }

    const pdf1 = path.join(__dirname, req.files[0].path);
    const pdf2 = path.join(__dirname, req.files[1].path);

    await mergePdfs(pdf1, pdf2);

    res.redirect('/static/merged.pdf');
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});

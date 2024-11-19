import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import errorHandler from './middleware/ErrorMiddleware.js';
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import bodyParser from 'body-parser';
    
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler)


app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/public/images/:fileName', (req, res) => {
  const { fileName } = req.params
  console.log(fileName)
  res.sendFile(path.join(__dirname, 'public/images', fileName));
});


export default app
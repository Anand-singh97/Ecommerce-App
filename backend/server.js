const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const addProductRouter = require('./routes/productHandler');
require('dotenv').config({ path: './.env' });

const PORT = 4000;
const app = express();
app.use(express.json());
app.use(cors());

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Methods as an array of strings
    })
);

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({storage:storage})

//Endpoint for Images
app.use('/images', express.static(path.join(__dirname, '/upload/images')));
app.post('/upload', upload.single('product'), (req, res)=>{
    res.json({success:1,
        Image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    })     
});

app.use('/product', addProductRouter);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});
mongoose.connection.on('error', (error) => {
    console.error(error);
});


const server = http.createServer(app);

async function startServer() {
    await mongoose.connect(process.env.MONGO_URL);
    server.listen(PORT, () => {
        console.log(`Listening on ${PORT}...`);
    });
}

startServer();

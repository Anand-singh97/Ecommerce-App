const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary');
const addProductRouter = require('./routes/productHandler');
const userRoute = require('./routes/userHandler');
require('dotenv').config({ path: './.env' });

const PORT = 4000;
const app = express();

app.use(express.json());

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET
});

app.use(
    cors({
      origin: ['http://localhost:3001', 'http://localhost:3000'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Methods as an array of strings
    })
);

app.use('/product', addProductRouter);
app.use('/user', userRoute);
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

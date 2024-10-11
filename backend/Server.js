//Path: your-app-name\backend\Server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

//From chatgpt. Might want to remove later. This is for debugging.
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    console.log('Request body:', req.body);  // Log request body to check if data is received
    next();
});


app.use(express.json());

//This block is different form the video. (I am using a newer version og the framework)
const uri = process.env.ATLAS_URI;  // Fetch the MongoDB connection URI from the .env file, which contains the credentials and host information for the database.
mongoose.connect(uri)  // Connect to the MongoDB database using the URI without deprecated options like useNewUrlParser.
    .then(() => console.log('MongoDB connection established successfully'))  // If the connection is successful, log a confirmation message.
    .catch(err => console.log('MongoDB connection error:', err));  // If there's an error during the connection, catch it and log the error message.


const connection = mongoose.connection;
connection.once('open', () => {
    console.log(`Server is running on port: ${port}`);
});


const albumsRouter = require('./routes/albums');
const usersRouter = require('./routes/users');

app.use('/albums', albumsRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
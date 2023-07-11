const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const CONNECTION_URL = 'mongodb+srv://Ragul:dN6mgVfqQtty6Glw@cluster0.0eh4p.mongodb.net/?retryWrites=true&w=majority';

const PORT = 5000 || process.env.PORT;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => app.listen(PORT, () => console.log(`PORT is running on ${PORT}`))).catch((error) => console.log(error.message))

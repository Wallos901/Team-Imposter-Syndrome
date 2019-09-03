const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
    .catch(err => console.log(err));
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully.");
});

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const statusRouter = require('./routes/status');
const user_statusRouter = require('./routes/user_status');
const wordRouter = require('./routes/words');

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
app.use('/status', statusRouter);
app.use('/user_status', user_statusRouter);
app.use('/words', wordRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
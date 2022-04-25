const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session');

const dishRouter = require('./routes/dish');
const userRouter = require('./routes/user');
const commentRouter = require('./routes/comment')


const mongoose = require('mongoose');
const mongoEndpoint = process.env.FUEN_CS5610
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:52428800}));

const cors = require('cors');
const auth_middleware = require('./routes/middleware/auth_middleware');

app.use(cors({
    origin: '*',
}));

app.use(session({secret: "FUEN_SECRET",
    store: MongoStore.create({ mongoUrl: mongoEndpoint }),
}));


app.use('/api/dish', dishRouter);
app.use('/api/user', userRouter);
app.use('/api/comment', commentRouter);


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Starting server');
});
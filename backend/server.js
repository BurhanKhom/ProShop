const express = require('express')
const app = express();
const dotenv = require('dotenv');
const dbConnector = require('./config/dbConnector');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const productsRouter = require('./routes/productsRoute');
const userRouter = require('./routes/usersRoute');
const orderRouter = require('./routes/ordersRoute');
const configRouter = require('./routes/config');
const path = require('path');

app.use(express.json())

app.use('/api/products', productsRouter);
app.use('/api/user/', userRouter);
app.use('/api/order/', orderRouter);
app.use('/api/config/', configRouter);

dotenv.config();

dbConnector.connectToDb();

app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
    console.log('***************', __dirname);
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile((path.resolve(__dirname, 'frontend', 'build', 'index.html')));
    })
} else {
    app.get('/', (req, res) => {
        res.send('Server is up and running!');
    });
}


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Listening in ${process.env.NODE_ENV} mode on port ${PORT}...`);
});
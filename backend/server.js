const app = require('express')();
const dotenv = require('dotenv');
const dbConnector = require('./config/dbConnector');
const { notFound, errorHandler} = require('./middlewares/errorMiddleware');
const productsRouter = require('./routes/productsRoute');


app.use('/api/products', productsRouter);

app.use(notFound);
app.use(errorHandler);


dotenv.config();

dbConnector.connectToDb();

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Listening in ${process.env.NODE_ENV} mode on port ${PORT}...`);
});
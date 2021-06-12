const app = require('express')();
const dotenv = require('dotenv');
const products = require('./products');
const dbConnector = require('./config/dbConnector');

const productsRouter = require('./routes/productsRoute');

app.use('/api/products', productsRouter);

dotenv.config();

dbConnector.connectToDb();

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Listening in ${process.env.NODE_ENV} mode on port ${PORT}...`);
});
const app = require('express')();
const dotenv = require('dotenv');
const products = require('./products')

dotenv.config();

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});


app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/product/:id', (req, res) => {
    res.json(products.find( product =>
        req.params.id === product._id
    ));
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Listening in ${process.env.NODE_ENV} mode on port ${PORT}...`);
});
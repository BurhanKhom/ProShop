const app = require('express')();
const products = require('./products')

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

app.listen(5000, () => {
    console.log('Listening on port 5000...');
});
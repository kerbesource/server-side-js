import express from 'express';

const app = express();
const port = 3000;

function isAuthorized(req, res, next) {
    const auth = req.headers.authorization;
    if (auth === 'secret') {
        next();
    } else {
        res.status(401);
        res.send('Unauthorized');
    }
}

app.get('/', (req, res) => res.send('OK'));

app.get('/products', (req, res) => {
    const products = [
        { id: 1, name: 'product1' },
        { id: 2, name: 'product2' },
        { id: 3, name: 'product3' }
    ];
    res.json(products);
});

app.get('/users', isAuthorized, (req, res) => {
    const users = [
        { id: 1, name: 'User Userson' }
    ];
    res.json(users);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
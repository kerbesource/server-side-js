import express from 'express';
import bodyParser from 'body-parser';

const app = express()
const port = 3000

app.use(bodyParser.json());

let products = [];

// app.get('/products', (req, res) => {
//   res.json(products);
// })

// app.post('/products', function (req, res) {
//   const newProduct = { ...req.body, id: products.length + 1 }
//   products = [ ...products, newProduct]
//   res.json(newProduct);
// });

// app.put('/products', function (req, res) {
//   let updatedProduct;
//   products = products.map(p => {
//     if (p.id === req.body.id) {
//       updatedProduct = { ...p, ...req.body };
//       return updatedProduct;
//     }
//     return p;
//   })
//   res.json(updatedProduct);
// });

// app.delete('/products/:id', function (req, res) {
//   const deletedProduct = products.find(p => p.id === +req.params.id);
//   products = products.filter(p => p.id !== +req.params.id);
//   res.json(deletedProduct);
// });

app.route('/products')
  .get((req, res) => {
    res.json(products);
  })
  .post((req, res) => {
    const newProduct = { ...req.body, id: products.length + 1 }
    products = [ ...products, newProduct]
    res.json(newProduct);
  })
  .put((req, res) => {
    let updatedProduct;
    products = products.map(p => {
      if (p.id === req.body.id) {
        updatedProduct = { ...p, ...req.body };
        return updatedProduct;
      }
      return p;
    })
    res.json(updatedProduct);
  })
  .delete((req, res) => {
    const deletedProduct = products.find(p => p.id === +req.params.id);
    products = products.filter(p => p.id !== +req.params.id);
    res.json(deletedProduct);
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
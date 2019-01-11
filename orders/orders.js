const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
mongoose.connect("mongodb://rooot:root123@ds153974.mlab.com:53974/ordersservice", ()=>{console.log("Order DB is connected...")});
app.use(bodyParser.json());

require('./Order');
const Order = mongoose.model('Order');

app.get('/', (req, res)=>{
    res.send('This is orderservice');
});

app.post('/order', (req, res)=>{
    const newOrder = {
        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    };
    console.log(newOrder);
    const order = new Order(newOrder);
    order.save().then(()=>{
       res.send('order created');
    }).catch(err => {
        if (err) throw err;
    });
    console.log(JSON.stringify(order));
    // if (!order) { res.send('New order Cannot created!') }
    // res.send('New order Created Successfully');
});

app.get('/orders', (req, res)=>{
    Order.find().then(order => {
        res.json(order);
    }).catch(err => {
        if (err) throw err;
    });
});

app.get('/order/:id', (req, res)=>{
    Order.findById(req.params.id).then(order => {
        if (order) {
            res.json(order);
        }else {
            res.sendStatus(404);
        }
    }).catch(err => {
        if (err) throw err;
    });
});

app.delete('/order/:id', (req, res)=>{
    Order.findOneAndRemove(req.params.id).then(() => {
        res.send('Order remove successfully');
    }).catch(err => {
        if (err) throw err;
    });
});




app.listen(5000, ()=>{ console.log('Order Server is listen on port 5000.....') });
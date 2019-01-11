const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
mongoose.connect("mongodb://root:root123@ds245680.mlab.com:45680/customersservice", ()=>{console.log("Customer DB is connected...")});
app.use(bodyParser.json());

require('./Customer');
const Customer = mongoose.model('Customer');

app.get('/', (req, res)=>{
    res.send('This is customerservice');
});

app.post('/customer', (req, res)=>{
    const newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    };
    const customer = new Customer(newCustomer).save();
    if (!customer) { console.log('New customer Cannot created!') }
    res.send('New customer Created Successfully');
});

app.get('/customers', (req, res)=>{
    Customer.find().then(customer => {
        res.json(customer);
    }).catch(err => {
        if (err) throw err;
    });
});

app.get('/customer/:id', (req, res)=>{
    Customer.findById(req.params.id).then(customer => {
        if (customer) {
            res.json(customer);
        }else {
            res.sendStatus(404);
        }
    }).catch(err => {
        if (err) throw err;
    });
});

app.delete('/customer/:id', (req, res)=>{
    Customer.findOneAndRemove(req.params.id).then(() => {
        res.send('Customer remove successfully');
    }).catch(err => {
        if (err) throw err;
    });
});




app.listen(4000, ()=>{ console.log('Customer Server is listen on port 4000.....') });
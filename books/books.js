const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
mongoose.connect("mongodb://root:root123@ds125574.mlab.com:25574/booksservice", ()=>{console.log("Book DB is connected...")});
app.use(bodyParser.json());

require('./Book');
const Book = mongoose.model('Book');

app.get('/', (req, res)=>{
   res.send('This is bookservice');
});

app.post('/book', (req, res)=>{
   const newBook = {
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
      publisher: req.body.publisher
   };
   const book = new Book(newBook).save();
   if (!book) { console.log('Newbook Cannot created!') }
   res.send('Newbook Created Successfully');
});

app.get('/books', (req, res)=>{
   Book.find().then(book => {
      res.json(book);
   }).catch(err => {
      if (err) throw err;
   });
});

app.get('/book/:id', (req, res)=>{
   Book.findById(req.params.id).then(book => {
      if (book) {
         res.json(book);
      }else {
         res.sendStatus(404);
      }
   }).catch(err => {
      if (err) throw err;
   });
});

app.delete('/book/:id', (req, res)=>{
   Book.findOneAndRemove(req.params.id).then(() => {
      res.send('Book remove successfully');
   }).catch(err => {
      if (err) throw err;
   });
});




app.listen(3000, ()=>{ console.log('Book Server is listen on port 3000.....') });
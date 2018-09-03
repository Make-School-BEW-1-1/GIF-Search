
//app.js
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var http = require('http');
const giphy = require('giphy-api')();


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));


app.get('/', function (req, res) {
  if(req.query.term) {
      giphy.search(req.query.term, function (err, response) {
          console.log(`Searching for: ${req.query.term}`)
          res.render('home', { gifs: response.data })})
    }
    else {
      giphy.trending(function (err, response) {
          console.log('No keyword, loading trending')
          res.render('home', { gifs: response.data })})
      }
})


app.listen(3000, function () {
  console.log('Gif Search listening on port localhost:3000!')
});

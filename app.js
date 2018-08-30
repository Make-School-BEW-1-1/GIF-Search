
//app.js
var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var http = require('http');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res) {
  console.log(req.query.term)
  var queryString = req.query.term

  var term = encodeURIComponent(queryString)
  var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'

  http.get(url, function(response) {
    response.setEncoding('utf8')

    var body = '';

    response.on('data', function (d) {
      body += d
    })

    response.on('end', function () {
      var parsed = JSON.parse(body)
      res.render('home', {gifs: parsed.data})
    })
  })
})

app.get('/hello-gif', function (req, res) {
  var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
  res.render('hello-gif', {gifUrl: gifUrl})
});

app.get('/greetings/:name', function (req, res) {
  var name = req.params.name
  res.render('greetings', {name: name})
});

app.listen(3000, function () {
  console.log('Gif Search listening on port localhost:3000!')
});

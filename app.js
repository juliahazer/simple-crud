const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const morgan = require("morgan");
const puppyRoutes = require('./routes/puppies');

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method')) // ?_method=DELETE
app.use(morgan('dev'))

app.use('/puppies', puppyRoutes)

app.get('/', function(req,res){
  res.redirect('/puppies')
});

app.use('/', function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     eval(require("locus"))
//     res.status(err.status || 500);
//     res.send(err.status)
//   });
// }

app.listen(3000, function(){
  console.log('SERVER STARTING!')
})
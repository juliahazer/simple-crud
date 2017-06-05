var express = require("express");
var router = express.Router();
var id = 1;
var puppies = [];

router.get('/', function(req,res, next){
  res.render('index', {puppies})
})

router.get('/new', function(req,res, next){
  res.render('new')
})

router.get('/:id', function(req,res, next){
  // go to the puppies array and find a puppy by req.params.id
  let puppy = puppies.find(p => p.id === +req.params.id)
  res.render('show', {puppy})
})

router.get('/:id/edit', function(req,res, next){
  let puppy = puppies.find(p => p.id === +req.params.id)
  res.render('edit', {puppy})
})

router.post('/', function(req,res, next){
  puppies.push(Object.assign({},req.body.puppy, {id}))
  id++
  res.redirect('/')
})

router.patch('/:id', function(req,res, next){
  let puppyIdx = puppies.findIndex(p => p.id === +req.params.id);
  puppies[puppyIdx] = Object.assign({}, puppies[puppyIdx], req.body.puppy);
  res.redirect(`/puppies`)
})

router.delete('/:id', function(req,res, next){
  let puppyIdx = puppies.findIndex(p => p.id === +req.params.id)
  puppies.splice(puppyIdx, 1)
  res.redirect(`/puppies`)
})

module.exports = router;

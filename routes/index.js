var express = require('express');
var router = express.Router();

var kuxbhi = require("./users");

router.get(`/`, function(req,res){
  res.render("index",{title: 'Express'})
});

router.post("/create", function(req,res){
  kuxbhi.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    photu: req.body.photu
  }).then(function(elem){
    res.send(elem)
  })
})
router.get("/read",function(req,res){
  kuxbhi.find()
  .then(function(allusers){
    res.render("read", {allusers});
  })
})
router.get("/like/:id",function(req,res){
  kuxbhi.findOne({_id: req.params.id})
  .then(function(user){
    if(user.likes.indexOf(user._id) === -1){
      user.likes.push(user._id)
    }
    else{
      user.likes.splice(user.likes.indexOf(user._id,1))
    }
    user.save()
    .then(function(){
      res.redirect("/read");
    })
  })
})
router.get('/edit/:id', function(req,res){
  kuxbhi.findOne({_id: req.params.id})
  .then(function(user){
    res.render("edit", {user});
  })
})
router.get('/delete/:id', function(req,res){
  kuxbhi.findOneAndDelete({_id: req.params.id})
  .then(function(user){
    res.redirect("/read");
  })
})

router.post("/update/:id", function(req,res){
kuxbhi.findByIdAndUpdate({_id: req.params.id},{ name: req.body.name, email: req.body.email, photu: req.body.photu })
  .then(function(){
    res.redirect("/read")
  })
})
module.exports = router;
// $set:

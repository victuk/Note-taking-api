var express = require('express');
var router = express.Router();
var allSchema = require('../models/allSchema');
// var passport = require('passport');
var regUser = require('../models/register');
const authLogin = require('../auth/loginAuth');
const hasAccess = require('../auth/accessControl');
// const isRestricted = require('../auth/isRestricted');

// var cloudinary = require('cloudinary').v2;
//
// var nodemailer = require('nodemailer');

// authLogin, hasAccess.adminOnly,

// admin@email.com
// rpf13225

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'mentorstower@gmail.com',
//     pass: 'rutklqndqnkoqlyg'
//   }
// });
//
// router.get('/send-email', async function(req, res){
//   var mailOptions = {
//     from: 'mentorstower@gmail.com',
//     to: 'mentorstower@gmail.com',
//     subject: 'Test Email',
//     html: 'Test email for pacesetters.'
//   };
//
//   let sentMail = await transporter.sendMail(mailOptions);
//
//   res.json({
//     success: true,
//     sentMail
//   });
// });



router.get('/notes', authLogin, async function(req, res) {
  const notesList = await allSchema.noteSchema.find({ownerId: req.decoded.id}, '');
  res.json(notesList);
});

router.get('/note/:id', authLogin, async function(req, res) {
  const mentorsList = await allSchema.noteSchema.findById(req.params.id, '');
  res.json(mentorsList);
});


router.post('/note', authLogin, function(req, res) {
  const noteList = new allSchema.noteSchema({
    title: req.body.title,
    body: req.body.body,
    ownerId: req.decoded.id,
    createDate: Date.now()
  });

  noteList.save(function(err, newNote) {
    if (err) {console.log(err)}
    res.json({
      success: true,
      newNote
    });
  });
});

router.delete('/note/:id', authLogin, async function(req, res) {
  const deletedContacts = await allSchema.noteSchema.findByIdAndDelete(req.params.id, '');
  res.json({
    success: true,
    deletedContacts
  });
});

router.put('/note/:id', authLogin, async function(req, res) {

  const editNote = await allSchema.noteSchema.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    body: req.body.body,
    createDate: Date.now()
  });

  res.json({
    success: true,
    editNote
  });
});

module.exports = router;

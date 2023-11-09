const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./register');

const notes = new Schema({
    title: String,
    body: String,
    ownerId: String,
    createDate: Date
}, {timestamps: true});

const noteSchema = mongoose.model("notes", notes);
module.exports.noteSchema = noteSchema;

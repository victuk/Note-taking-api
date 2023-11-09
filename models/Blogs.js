const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userID: String,
    blogHead: String,
    blogBody: String,
    postDate: Date
}, {timestamps: true});

const Blog = mongoose.model("Blog", UserSchema)
module.exports = Blog
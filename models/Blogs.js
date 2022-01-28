const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userID: String,
    blogHead: String,
    blogBody: String,
    postDate: Date
});

const Blog = mongoose.model("Blog", UserSchema)
module.exports = Blog
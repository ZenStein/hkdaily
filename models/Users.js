const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const userSchema = new mongoose.Schema({
    displayName: String,
    googleId: String,
    photos: [Object]
})

module.exports = mongoose.model('User', userSchema)
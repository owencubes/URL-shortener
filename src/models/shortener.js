const { model, Schema } = require('mongoose')

module.exports = model('shortener', new Schema({
    Code: String, 
    Url: String
}))

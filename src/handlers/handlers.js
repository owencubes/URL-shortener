const shortener = require('../models/shortener')
const uuid = require('uuid')

async function codeHandler(code) {
    const final = await shortener.findOne({ Code: code })
    console.log(final)
    return final
}

async function urlHandler(url) {
    const code = uuid.v4().split('-').shift()
    let urlDB = await shortener.findOne({ code })
    while (urlDB) {
      code = uuidv4().split('-').shift()
      urlDB = await shortener.findOne({ code })
    }
    const newURL = new shortener({ Code: code, Url: url })
    return newURL.save()
}


module.exports = { urlHandler, codeHandler }
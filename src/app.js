const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.document = new JSDOM('localhost:3000').window.document;

const mongoose = require("mongoose");
const express = require("express");
const { urlHandler, codeHandler, submit } = require("./handlers/handlers.js");
const app = express();
const form = document.getElementById("form")
const UrL = document.getElementById('URL')
require("dotenv").config();
const port = process.env.PORT || 3001;
const path = require("path");
const erl = require("./models/shortener");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/url", async(req, res) => {
    const e = await req.query.url
    const newUrl = await urlHandler(e)
    console.log(newUrl)
    res.render('url.ejs', { url: `http://localhost:3000/${newUrl.Code}` })
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/index.html"));
});
app.get("/:code", async (req, res) => {
  const url = await erl.findOne({ Code: req.params.code });
  try {
    if (url) {
      res.redirect(url.Url);
    } else {
      res.send("404 not found");
    }
  } catch (err) {
    res.send("there was a error");
    console.log(err);
  }
});
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.listen(port, () => console.log(`running on port ${process.env.PORT}`));

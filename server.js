const express = require('express')
const path = require('path')

const app = express()

app.use('/static', express.static(path.resolve(__dirname, "client", "static")))

app.get('/*', (req, res) => {
  res.sendFile(path.resolve("client", "index.html"))
})

app.listen(process.env.PORT ||  3000)
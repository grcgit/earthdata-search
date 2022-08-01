const express = require('express')
const fs = require('fs')
const http = require('http')
const https = require('https')

const secretConfig = require('./secret-config')

const app = express()
const {
  PORT
} = secretConfig

app.use(express.static('../static/dist'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

if (secretConfig.USE_HTTPS) {
  // Certificate
  const privateKey = fs.readFileSync(secretConfig.privateKey, 'utf8')
  const certificate = fs.readFileSync(secretConfig.cert, 'utf8')
  const ca = fs.readFileSync(secretConfig.chain, 'utf8')

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca
  }

  const httpsServer = https.createServer(credentials, app)

  httpsServer.listen(PORT, () => {
    console.log(`HTTPS Server running on port ${PORT}`)
  })
} else {
  const httpServer = http.createServer(app)

  httpServer.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`)
  })
}

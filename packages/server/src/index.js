const express = require('express')
const cors = require('cors')
const glob = require('glob')
const path = require('path')
const helmet = require('helmet')
const { createConnection } = require('typeorm')

const app = express()

const main = async () => {
  const corsOptions = {
    origin: 'http://localhost:3000'
  }

  app.use(helmet())
  app.use(cors(corsOptions))
  app.use(express.json({ limit: '25mb', type: 'application/json' }))

  const dirPath = path.normalize(`${__dirname}/..`)
  const apis = glob.sync(`${dirPath}/**/*.controller.js`)
  const connection = await createConnection()

  apis.forEach(apiPath => {
    require(`${apiPath}`)(app)
  })

  app.listen(4000, () => {
    console.log('running')
  })
}

main()

module.exports = app

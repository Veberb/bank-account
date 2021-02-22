import express from 'express'
import cors from 'cors'
import glob from 'glob'
import path from 'path'
import helmet from 'helmet'
import 'reflect-metadata'

import { createConnection } from 'typeorm'

const app = express()

const main = async () => {
  const corsOptions = {
    origin: 'http://localhost:3000'
  }

  app.use(helmet())
  app.use(cors(corsOptions))
  app.use(express.json({ limit: '25mb', type: 'application/json' }))

  const dirPath = path.normalize(`${__dirname}/..`)
  const apis = glob.sync(`${dirPath}/**/*.controller.ts`)

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

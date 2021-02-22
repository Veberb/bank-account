const { Router } = require('express')
const router = Router({ mergeParams: true })
const AccountManager = require('./account.manager')

module.exports = app => {
  app.use('/account', router)
}

router.get('/', async (req, res, next) => {
  const users = await AccountManager.list({ ...req.query })
  return res.json(users)
})

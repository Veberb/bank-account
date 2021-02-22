import { Router, Request, Response } from 'express'
const router = Router({ mergeParams: true })
import UserService from './account.service'

module.exports = app => {
  app.use('/accounts', router)
}

router.post('/', async (req: Request, res: Response) => {
  const users = await UserService.create(req.body)
  return res.json(users)
})

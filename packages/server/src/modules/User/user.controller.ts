import { Router, Request, Response } from 'express'
const router = Router({ mergeParams: true })
import UserService from './user.service'

module.exports = app => {
  app.use('/users', router)
}

router.post('/', async (req: Request, res: Response) => {
  const users = await UserService.create(req.body)
  return res.json(users)
})

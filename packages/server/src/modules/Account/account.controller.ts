import { Router, Request, Response } from 'express'
const router = Router({ mergeParams: true })
import AccountService from './account.service'

module.exports = app => {
  app.use('/accounts', router)
}

router.post('/', async (req: Request, res: Response) => {
  const account = await AccountService.create(req.body)
  return res.json(account)
})

router.get('/:id', async (req: Request, res: Response) => {
  const account = await AccountService.getOne(+req.params.id)
  return res.json(account)
})

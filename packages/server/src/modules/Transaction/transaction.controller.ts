import { Router, Request, Response } from 'express'
const router = Router({ mergeParams: true })
import TransactionService from './transaction.service'

module.exports = app => {
  app.use('/transactions', router)
}

router.post('/', async (req: Request, res: Response, next) => {
  try {
    const account = await TransactionService.create(req.body)
    return res.json(account)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req: Request, res: Response) => {
  const transactions = await TransactionService.list()
  return res.json(transactions)
})

router.get('/:id', async (req: Request, res: Response) => {
  const account = await TransactionService.getOne(+req.params.id)
  return res.json(account)
})

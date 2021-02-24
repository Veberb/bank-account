import { getRepository, Repository } from 'typeorm'

import { Transaction } from './transaction.entity'
import { TransactionType } from './transaction.args'
import transactionFactory from './transaction.factory'
import AccountService from '../Account/account.service'

class TransactionService {
  private readonly repository: Repository<Transaction>

  constructor() {
    this.repository = getRepository('Transaction')
  }

  async checkIfThereIsEnougthMoney(accountId: number, ammount: number) {
    const [deposit, withdraw, payment] = await this.repository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.account', 'account')
      .where('account.id = :id', { id: accountId })
      .select('SUM(transaction.value)', 'sum')
      .addSelect('transaction.type', 'type')
      .groupBy('transaction.type')
      .orderBy('transaction.type', 'ASC')
      .getRawMany()

    if (!(+deposit.sum > +withdraw.sum + +payment.sum + ammount))
      throw new Error('Not enougth money')
  }

  async create(args: Transaction) {
    const afactory = transactionFactory(args)
    const account = await AccountService.getFirst()

    if (args.type !== TransactionType.Deposit) {
      await this.checkIfThereIsEnougthMoney(account.id, args.value)
    }

    afactory.account = account
    /* return this.repository.save(afactory) */
  }

  async getOne(id: number) {
    return this.repository.findOne({ id })
  }
}

export default new TransactionService()

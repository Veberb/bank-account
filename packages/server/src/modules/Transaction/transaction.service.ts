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

  async sumTransactionsValues(accountId: number) {
    return this.repository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.account', 'account')
      .where('account.id = :id', { id: accountId })
      .select('SUM(transaction.value)', 'sum')
      .addSelect('transaction.type', 'type')
      .groupBy('transaction.type')
      .orderBy('transaction.type', 'ASC')
      .getRawMany()
  }

  async checkIfThereIsEnougthMoney(accountId: number, ammount: number) {
    const [deposit, withdraw, payment] = await this.sumTransactionsValues(
      accountId
    )

    if (!(+deposit.sum > +withdraw.sum + +payment.sum + +ammount))
      throw new Error('Not enougth money')
  }

  async create(args: Transaction) {
    const transactionObj = transactionFactory(args)
    const account = await AccountService.getFirst()

    if (
      [TransactionType.Payment, TransactionType.Withdraw].includes(args.type)
    ) {
      await this.checkIfThereIsEnougthMoney(account.id, args.value)
    }

    transactionObj.account = account
    return this.repository.save(transactionObj)
  }

  async getOne(id: number) {
    return this.repository.findOne({ id })
  }

  async balance() {
    const account = await AccountService.getFirst()
    const [
      deposit,
      withdraw = { sum: 0 },
      payment = { sum: 0 }
    ] = await this.sumTransactionsValues(account.id)

    return +deposit.sum - +withdraw.sum - +payment.sum
  }

  async list(skip: number = 0, take: number = 10) {
    const transactionsQuery = this.repository.find({
      take,
      skip,
      order: { createdAt: 'DESC' }
    })
    const balanceQuery = this.balance()
    const [transactions, balance] = await Promise.all([
      transactionsQuery,
      balanceQuery
    ])
    return { transactions, balance }
  }

  async incomeTransaction() {
    const balance = await this.balance()
    const account = await AccountService.getFirst()
    return this.create({
      type: TransactionType.Income,
      value: balance * (1 + account.percentage / 100)
    } as Transaction)
  }
}

export default new TransactionService()

import { getRepository, Repository } from 'typeorm'

import { Account } from './account.entity'

class AccountService {
  private readonly repository: Repository<Account>

  constructor() {
    this.repository = getRepository('Account')
  }

  async create(args: Account) {
    return this.repository.save(args)
  }

  async getOne(id: number) {
    return this.repository.findOne({ id }, { relations: ['user'] })
  }
}

export default new AccountService()

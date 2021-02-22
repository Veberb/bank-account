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
}

export default new AccountService()

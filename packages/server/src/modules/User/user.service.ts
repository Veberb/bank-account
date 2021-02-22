import { getRepository, Repository } from 'typeorm'

import { User } from './user.entity'
import { Account } from '../Account/account.entity'

import { CreateUserArgs } from './user.args'

class UserService {
  private readonly repository: Repository<User>

  constructor() {
    this.repository = getRepository('User')
  }

  async create(args: User) {
    return this.repository.save({ ...args, account: new Account() })
  }

  async getOne() {
    return this.repository.find({ relations: ['account'] })
  }
}

export default new UserService()

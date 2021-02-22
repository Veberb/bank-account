import { getRepository, Repository } from 'typeorm'

import { User } from './user.entity'
import { CreateUserArgs } from './user.args'

class UserService {
  private readonly repository: Repository<User>

  constructor() {
    this.repository = getRepository('User')
  }

  async create(args: User) {
    return this.repository.save(args)
  }
}

export default new UserService()

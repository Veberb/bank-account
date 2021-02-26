import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  Column
} from 'typeorm'
import { User } from '../User/user.entity'
import { Transaction } from '../Transaction/transaction.entity'

@Entity('accounts')
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: 1 })
  percentage: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date

  @OneToOne(
    () => User,
    user => user.account
  )
  user: User

  @OneToMany(
    () => Transaction,
    transaction => transaction.account
  )
  transactions: Transaction[]
}

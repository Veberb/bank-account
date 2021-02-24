import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'
import { Account } from '../Account/account.entity'
import { TransactionType } from './transaction.args'

@Entity('transactions')
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  description: string

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.Deposit
  })
  type: TransactionType

  @Column()
  value: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date

  @ManyToOne(
    () => Account,
    account => account.transactions
  )
  account: Account
}

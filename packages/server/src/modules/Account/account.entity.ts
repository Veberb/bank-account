import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm'
import { User } from '../User/user.entity'

@Entity('accounts')
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date

  @OneToOne(
    () => User,
    user => user.account
  )
  user: User
}

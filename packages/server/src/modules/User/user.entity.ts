import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne
} from 'typeorm'
import { Account } from '../Account/account.entity'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date

  @OneToOne(type => Account, { cascade: true })
  @JoinColumn()
  account?: Account
}

import { TransactionType } from './transaction.args'

const transactionFactory = args => {
  if (args.type === TransactionType.Deposit)
    return new TransactionObj(args.type, 'Deposito', args.value)
  if (args.type === TransactionType.Withdraw)
    return new TransactionObj(args.type, 'Resgate', args.value)

  if (args.type === TransactionType.Income)
    return new TransactionObj(args.type, 'Rendimento', args.value)

  return new TransactionObj(args.type, 'Pagamento', args.value)
}

function TransactionObj(type, description, value) {
  this.type = type
  this.description = description
  this.value = value
}

export default transactionFactory

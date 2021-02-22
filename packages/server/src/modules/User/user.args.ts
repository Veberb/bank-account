import { isEmail, IsNotEmpty, isNotEmpty, IsEmail } from 'class-validator'

export class CreateUserArgs {
  @IsNotEmpty()
  name: number

  @IsNotEmpty()
  @IsEmail()
  email: string
}

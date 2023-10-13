import { left, type Either, right } from '@/shared'
import { type InvalidNameError, type InvalidEmailError } from './errors'
import { type UserData, Name, Email } from '.'

export class User {
  private constructor (
    public readonly name: Name,
    public readonly email: Email
  ) { }

  static create (userData: UserData): Either<InvalidEmailError | InvalidNameError, User> {
    const emailOrError = Email.create(userData.email)
    const nameOrError = Name.create(userData.name)
    if (emailOrError.isLeft()) return left(emailOrError.value)
    if (nameOrError.isLeft()) return left(nameOrError.value)

    const name = nameOrError.value
    const email = emailOrError.value
    return right(new User(name, email))
  }
}

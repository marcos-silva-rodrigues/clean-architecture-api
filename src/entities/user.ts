import { left, type Either, right } from '../shared/either'
import { Email } from './email'
import { type InvalidNameError } from './error/invalid-name-error'
import { type InvalidEmailError } from './error/invalid-email-error'
import { Name } from './name'
import { type UserData } from './user-data'

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

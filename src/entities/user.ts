import { left, type Either, right } from '../shared/either'
import { Email } from './email'
import { type InvalidEmailError } from './error/invalid-email-error'
import { type UserData } from './user-data'

export class User {
  static create (userData: UserData): Either<InvalidEmailError, User> {
    const emailOrError = Email.create(userData.email)
    if (emailOrError.isLeft()) return left(emailOrError.value)

    return right(new User())
  }
}

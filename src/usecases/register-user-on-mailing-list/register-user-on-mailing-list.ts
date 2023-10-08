import { type InvalidNameError } from '../../entities/error/Invalid-name-error'
import { type InvalidEmailError } from '../../entities/error/invalid-email-error'
import { User } from '../../entities/user'
import { type UserData } from '../../entities/user-data'
import { type Either, left, right } from '../../shared/either'
import { type UserRepository } from './ports/users-repository'

export class RegisterUserOnMailingList {
  constructor (private readonly userRepo: UserRepository) {}

  public async registerUserOnMailingList (request: UserData):
  Promise<Either< InvalidEmailError | InvalidNameError, UserData >> {
    const userOrError = User.create(request)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }
    const alreadyExists = await this.userRepo.exists(request)
    if (!alreadyExists) {
      await this.userRepo.add(request)
    }

    return right(request)
  }
}

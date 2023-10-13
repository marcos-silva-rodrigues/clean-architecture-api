import { type UserData, User } from '@/entities'
import { type InvalidEmailError, type InvalidNameError } from '@/entities/errors'
import { type Either, left, right } from '@/shared'
import { type UserRepository } from '@/usecases/register-user-on-mailing-list/ports'

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

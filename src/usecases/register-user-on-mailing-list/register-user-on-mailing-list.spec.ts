import { InvalidNameError } from '../../entities/error/Invalid-name-error'
import { InvalidEmailError } from '../../entities/error/invalid-email-error'
import { type UserData } from '../../entities/user-data'
import { type UserRepository } from './ports/users-repository'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'
import { InMemoryUserRepository } from './repository/in-memory-user-repository'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any@gmail.com'
    const response = await usecase.registerUserOnMailingList({
      name,
      email
    })

    const user = await repo.findUserByEmail(email)
    expect(user?.name).toBe(name)
    expect(response.value.name).toBe(name)
  })

  test('should not add user with email invalid', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const invalidEmail = 'anygmail.com'
    const response = await usecase.registerUserOnMailingList({
      name,
      email: invalidEmail
    })

    const user = await repo.findUserByEmail(invalidEmail)
    expect(user).toBeNull()
    expect(response.value).toEqual(new InvalidEmailError())
  })

  test('should not add user with name invalid', async () => {
    const users: UserData[] = []
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase = new RegisterUserOnMailingList(repo)
    const invalidName = ''
    const email = 'any@gmail.com'
    const response = await usecase.registerUserOnMailingList({
      name: invalidName,
      email
    })

    const user = await repo.findUserByEmail(email)
    expect(user).toBeNull()
    expect(response.value).toEqual(new InvalidNameError())
  })
})

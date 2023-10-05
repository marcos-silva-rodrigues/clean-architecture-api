import { type UserData } from '../user-data'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory User repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = []
    const userRepo = new InMemoryUserRepository(users)
    const user = await userRepo.findUserByEmail('any@email.com')
    expect(user).toBeNull()
  })

  test('should return user if it is found in the repository', async () => {
    const users: UserData[] = []
    const name = 'any_name'
    const email = 'any@gmail.com'
    const userRepo = new InMemoryUserRepository(users)
    await userRepo.add({
      name, email
    })

    const user = await userRepo.findUserByEmail(email)

    expect(user).not.toBeNull()
    expect(user?.name).toBe(name)
  })

  test('should return all users in the repository', async () => {
    const users: UserData[] = [
      {
        name: 'any_name',
        email: 'any@gmail.com'
      },
      {
        name: 'second_name',
        email: 'second@gmail.com'
      }
    ]
    const userRepo = new InMemoryUserRepository(users)

    const returned = await userRepo.findAllUser()

    expect(returned).toHaveLength(2)
  })
})

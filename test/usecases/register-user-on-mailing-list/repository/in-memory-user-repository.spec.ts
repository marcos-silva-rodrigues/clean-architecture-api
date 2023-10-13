import { type UserData } from '@/entities'
import { InMemoryUserRepository } from '.'

describe('In memory User repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = []
    const sut = new InMemoryUserRepository(users)
    const user = await sut.findUserByEmail('any@email.com')
    expect(user).toBeNull()
  })

  test('should return user if it is found in the repository', async () => {
    const users: UserData[] = []
    const name = 'any_name'
    const email = 'any@gmail.com'
    const sut = new InMemoryUserRepository(users)
    await sut.add({
      name, email
    })

    const user = await sut.findUserByEmail(email)

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
    const sut = new InMemoryUserRepository(users)

    const returned = await sut.findAllUser()

    expect(returned).toHaveLength(2)
  })
})

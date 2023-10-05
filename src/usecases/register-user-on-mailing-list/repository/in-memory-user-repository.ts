import { type UserRepository } from '../ports/users-repository'
import { type UserData } from '../user-data'

export class InMemoryUserRepository implements UserRepository {
  constructor (private readonly repository: UserData[]) {

  }

  async add (user: UserData): Promise<void> {
    throw new Error('Not implemented')
  }

  async findUserByEmail (email: string): Promise<UserData | null> {
    return null
  }

  async findAllUser (): Promise<UserData[]> {
    throw new Error('Not implemented')
  }

  async exists (user: UserData): Promise<boolean> {
    throw new Error('Not implemented')
  }
}

import { type UserRepository } from '@/usecases/register-user-on-mailing-list'
import { type UserData } from '@/entities'

export class InMemoryUserRepository implements UserRepository {
  constructor (private readonly repository: UserData[]) {

  }

  async add (user: UserData): Promise<void> {
    const exists = await this.exists(user)
    if (!exists) {
      this.repository.push(user)
    }
  }

  async findUserByEmail (email: string): Promise<UserData | null> {
    const user = this.repository.find(user => user.email === email)
    return user ?? null
  }

  async findAllUser (): Promise<UserData[]> {
    return this.repository
  }

  async exists (user: UserData): Promise<boolean> {
    if (await this.findUserByEmail(user.email) === null) {
      return false
    }

    return true
  }
}

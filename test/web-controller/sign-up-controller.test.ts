import { type UserData } from '@/entities'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { type HttpRequest } from '@/web-controller/ports'
import { type HttpResponse } from '@/web-controller/ports/http-response'
import { RegisterUserController } from '@/web-controller/register-user-controller'
import { InMemoryUserRepository } from '@test/usecases/register-user-on-mailing-list/repository'

describe('Register user with controller', () => {
  test('should return status code 201 when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any@gmail.com'
      }
    }

    const users: UserData[] = []

    const repo = new InMemoryUserRepository(users)
    const usecase = new RegisterUserOnMailingList(repo)
    const controller = new RegisterUserController(usecase)
    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(request.body)
  })
})

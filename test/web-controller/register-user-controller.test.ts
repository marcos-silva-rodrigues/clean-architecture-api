import { type UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
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

  test('should return status code 400 when request contains invalid name', async () => {
    const request: HttpRequest = {
      body: {
        name: 'A',
        email: 'any@gmail.com'
      }
    }

    const users: UserData[] = []

    const repo = new InMemoryUserRepository(users)
    const usecase = new RegisterUserOnMailingList(repo)
    const controller = new RegisterUserController(usecase)
    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  test('should return status code 400 when request contains invalid email', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any_gmail.com'
      }
    }

    const users: UserData[] = []

    const repo = new InMemoryUserRepository(users)
    const usecase = new RegisterUserOnMailingList(repo)
    const controller = new RegisterUserController(usecase)
    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })
})

import { type RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { type HttpRequest, type HttpResponse } from '@/web-controller/ports'
import { type UserData } from '@/entities'
import { created } from '@/web-controller/utils'

export class RegisterUserController {
  constructor (
    private readonly usecase: RegisterUserOnMailingList
  ) { }

  public async handle (request: HttpRequest): Promise<HttpResponse> {
    const userData: UserData = request.body
    const response = await this.usecase.registerUserOnMailingList(userData)

    if (response.isRight()) {
      return created(response.value)
    }

    return {
      statusCode: 404,
      body: response.value.message
    }
  }
}

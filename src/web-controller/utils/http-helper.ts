import { type HttpResponse } from '../ports'

export const created = <T>(data: T): HttpResponse => {
  return {
    statusCode: 201,
    body: data
  }
}

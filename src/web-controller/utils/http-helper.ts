import { type HttpResponse } from '../ports'

export const created = <T>(data: T): HttpResponse => {
  return {
    statusCode: 201,
    body: data
  }
}

export const badRequest = <T>(data: T): HttpResponse => {
  return {
    statusCode: 400,
    body: data
  }
}

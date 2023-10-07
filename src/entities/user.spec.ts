import { left } from '../shared/either'
import { InvalidNameError } from './error/Invalid-name-error'
import { InvalidEmailError } from './error/invalid-email-error'
import { User } from './user'

describe('User domain entity', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({
      name: 'any_name',
      email: invalidEmail
    })

    expect(error).toEqual(left(new InvalidEmailError()))
  })

  test('should not create user invalid name (too few characters)', () => {
    const invalidName = 'O          '
    const error = User.create({
      name: invalidName,
      email: 'fulano@mail.com'
    })

    expect(error).toEqual(left(new InvalidNameError()))
  })
})
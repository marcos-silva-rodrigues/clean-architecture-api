import { left, type Either, right } from '../shared/either'
import { InvalidNameError } from './error/Invalid-name-error'

export class Name {
  public readonly value: string

  private constructor (name: string) {
    this.value = name
  }

  public static create (name: string): Either<InvalidNameError, Name> {
    if (!Name.validate(name)) {
      return left(new InvalidNameError(name))
    }

    return right(new Name(name))
  }

  public static validate (name: string | null): boolean {
    if (name === null) {
      return false
    }

    if (name.trim().length < 2) {
      return false
    }

    if (name.trim().length > 256) {
      return false
    }

    return true
  }
}

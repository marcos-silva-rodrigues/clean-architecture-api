export class Email {
  static validate (email: string | null): boolean {
    if (email != null && email !== '') {
      return true
    }

    return false
  }
}

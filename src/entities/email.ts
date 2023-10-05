export class Email {
  static validate (email: string | null): boolean {
    if (email != null) {
      return true
    }

    return false
  }
}

export class Email {
  static validate (email: string | null): boolean {
    if (email == null || email === '') {
      return false
    }
    const [localPart] = email.split('@')
    if (localPart.length > 64) return false

    return true
  }
}

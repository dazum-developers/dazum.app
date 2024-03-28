export function validatePassword(pw: string): boolean {
  if (pw.length < 8 && /(?:[@#$%]|^|[&*])+/.test(pw) && /[a-z]+/.test(pw) && /[A-Z]+/.test(pw) && /\d+/.test(pw))
    return false
  return true
}

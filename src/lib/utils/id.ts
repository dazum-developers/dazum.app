const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export function gen(l: number, c: string) {
  let p = ''

  for (let i = 0; i < l; i++) {
    const d: number = Math.floor(Math.random() * c.length)
    p += c[d]
  }

  return p
}

export function generateGid(): string {
  return gen(8, charset)
}

export function generatePid(gid: string): string {
  return `${gid}${gen(20, charset)}`
}

export function generateSgid(gid: string): string {
  return `${gid}${gen(8, charset)}`
}

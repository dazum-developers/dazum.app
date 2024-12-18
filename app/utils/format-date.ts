const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp)

  return `${date.getDate()} ${months[date.getMonth()]}`
}

export function formatFullDate(timestamp: number): string {
  const date = new Date(timestamp)

  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`
}

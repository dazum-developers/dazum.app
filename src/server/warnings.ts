const alreadyWarned: { [message: string]: boolean } = {}

export function warnOnce(condition: boolean, message: string): void {
  if (!condition && !alreadyWarned[message]) {
    alreadyWarned[message] = true

    // eslint-disable-next-line no-console
    console.warn(message)
  }
}

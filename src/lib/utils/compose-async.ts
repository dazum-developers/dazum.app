// eslint-disable-next-line @typescript-eslint/no-explicit-any, github/no-then
const applyAsync = (acc: any, val: any) => acc.then(val)
const composeAsync =
  (...funcs: any[]) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/indent
  (x: any) =>
    // eslint-disable-next-line @typescript-eslint/indent
    funcs.reduce(applyAsync, Promise.resolve(x))

export default composeAsync

export default function singleton<Value>(name: string, factory: () => Value) {
  const g = global as unknown as { __singletons: Record<string, unknown> }
  g.__singletons ??= {}
  g.__singletons[name] ??= factory()
  return g.__singletons[name] as Value
}

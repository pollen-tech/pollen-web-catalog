type WhenTypeNull<TCheck, TReturn> = TCheck extends null ? null : TReturn
const awaitToError = async <E = Error, T = any>(
  p: Promise<T>
): Promise<[WhenTypeNull<T, E>, WhenTypeNull<E, T>]> => {
  try {
    const r = await Promise.resolve<T>(p)
    return [null as WhenTypeNull<T, E>, r as WhenTypeNull<E, T>]
  } catch (e) {
    return [e as WhenTypeNull<T, E>, null as WhenTypeNull<E, T>]
  }
}
export default awaitToError

/* eslint @typescript-eslint/indent: 0 */
/* eslint @typescript-eslint/comma-dangle: 0 */

import type { CookieParseOptions, CookieSerializeOptions } from 'cookie'

import type {
  Cookie,
  CookieOptions,
  CreateCookieFunction,
} from './server-runtime'
import { warnOnce } from './warnings'

/**
 * An object of name/value pairs to be used in the session.
 */
export interface SessionData {
  [name: string]: unknown
}

/**
 * Session persists data across HTTP requests.
 *
 * @see https://remix.run/utils/sessions#session-api
 */
export interface Session<Data = SessionData, FlashData = Data> {
  /**
   * The raw data contained in this session.
   *
   * This is useful mostly for SessionStorage internally to access the raw
   * session data to persist.
   */
  readonly data: FlashSessionData<Data, FlashData>

  /**
   * Sets a value in the session that is only valid until the next `get()`.
   * This can be useful for temporary values, like error messages.
   */
  flash: <Key extends keyof FlashData & string>(
    name: Key,
    value: FlashData[Key],
  ) => void

  /**
   * Returns the value for the given `name` in this session.
   */
  get: <Key extends (keyof Data | keyof FlashData) & string>(
    name: Key,
  ) =>
    | (Key extends keyof Data ? Data[Key] : undefined)
    | (Key extends keyof FlashData ? FlashData[Key] : undefined)
    | undefined

  /**
   * Returns `true` if the session has a value for the given `name`, `false`
   * otherwise.
   */
  has: (name: (keyof Data | keyof FlashData) & string) => boolean

  /**
   * A unique identifier for this session.
   *
   * Note: This will be the empty string for newly created sessions and
   * sessions that are not backed by a database (i.e. cookie-based sessions).
   */
  readonly id: string

  /**
   * Sets a value in the session for the given `name`.
   */
  set: <Key extends keyof Data & string>(name: Key, value: Data[Key]) => void

  /**
   * Removes a value from the session.
   */
  unset: (name: keyof Data & string) => void
}

export type FlashSessionData<Data, FlashData> = Partial<
  Data & {
    [Key in keyof FlashData as FlashDataKey<Key & string>]: FlashData[Key]
  }
>
type FlashDataKey<Key extends string> = `__flash_${Key}__`

function flash<Key extends string>(name: Key): FlashDataKey<Key> {
  return `__flash_${name}__`
}

export type CreateSessionFunction = <Data = SessionData, FlashData = Data>(
  initialData?: Data,
  id?: string,
) => Session<Data, FlashData>

/**
 * Creates a new Session object.
 *
 * Note: This function is typically not invoked directly by application code.
 * Instead, use a `SessionStorage` object's `getSession` method.
 *
 * @see https://remix.run/utils/sessions#createsession
 */
export const createSession: CreateSessionFunction = <
  Data = SessionData,
  FlashData = Data,
>(
  initialData: Partial<Data> = {},
  id = '',
): Session<Data, FlashData> => {
  const map = new Map(Object.entries(initialData)) as Map<
    keyof Data | FlashDataKey<keyof FlashData & string>,
    unknown
  >

  return {
    get id() {
      return id
    },
    get data() {
      return Object.fromEntries(map) as FlashSessionData<Data, FlashData>
    },
    has(name: keyof Data | (keyof FlashData & string)) {
      return (
        map.has(name as keyof Data) ||
        map.has(flash(name as keyof FlashData & string))
      )
    },
    // @ts-expect-error TypeA is not assignable to TypeB.
    get(name: keyof Data | (keyof FlashData & string)) {
      if (map.has(name as keyof Data)) return map.get(name as keyof Data)

      const flashName = flash(name as keyof FlashData & string)

      if (map.has(flashName)) {
        const value = map.get(flashName)
        map.delete(flashName)
        return value
      }

      return undefined
    },
    set(name: keyof Data, value: unknown) {
      map.set(name, value)
    },
    flash(name: keyof Data | (keyof FlashData & string), value: unknown) {
      // @ts-expect-error TypeA is not assignable to TypeB.
      map.set(flash(name), value)
    },
    unset(name: keyof Data) {
      map.delete(name)
    },
  }
}

/**
 * SessionIdStorageStrategy is designed to allow anyone to easily build their
 * own SessionStorage using `createSessionStorage(strategy)`.
 *
 * This strategy describes a common scenario where the session id is stored in
 * a cookie but the actual session data is stored elsewhere, usually in a
 * database or on disk. A set of create, read, update, and delete operations
 * are provided for managing the session data.
 */
export interface SessionIdStorageStrategy<
  Data = SessionData,
  FlashData = Data,
> {
  /**
   * The Cookie used to store the session id, or options used to automatically
   * create one.
   */
  cookie?: Cookie | (CookieOptions & { name?: string })

  /**
   * Creates a new record with the given data and returns the session id.
   */
  createData: (
    data: FlashSessionData<Data, FlashData>,
    expires?: Date,
  ) => Promise<string>

  /**
   * Deletes data for a given session id from the data store.
   */
  deleteData: (id: string) => Promise<void>

  /**
   * Returns data for a given session id, or `null` if there isn't any.
   */
  readData: (id: string) => Promise<FlashSessionData<Data, FlashData> | null>

  /**
   * Updates data for the given session id.
   */
  updateData: (
    id: string,
    data: FlashSessionData<Data, FlashData>,
    expires?: Date,
  ) => Promise<void>
}

interface CookieSessionStorageOptions {
  /**
   * The Cookie used to store the session data on the client, or options used
   * to automatically create one.
   */
  cookie?: SessionIdStorageStrategy['cookie']
}

/**
 * SessionStorage stores session data between HTTP requests and knows how to
 * parse and create cookies.
 *
 * A SessionStorage creates Session objects using a `Cookie` header as input.
 * Then, later it generates the `Set-Cookie` header to be used in the response.
 */
export interface SessionStorage<Data = SessionData, FlashData = Data> {
  /**
   * Stores all data in the Session and returns the Set-Cookie header to be
   * used in the HTTP response.
   */
  commitSession: (
    session: Session<Data, FlashData>,
    options?: CookieSerializeOptions,
  ) => Promise<string>

  /**
   * Deletes all data associated with the Session and returns the Set-Cookie
   * header to be used in the HTTP response.
   */
  destroySession: (
    session: Session<Data, FlashData>,
    options?: CookieSerializeOptions,
  ) => Promise<string>

  /**
   * Parses a Cookie header from a HTTP request and returns the associated
   * Session. If there is no session associated with the cookie, this will
   * return a new Session with no data.
   */
  getSession: (
    cookieHeader?: string | null,
    options?: CookieParseOptions,
  ) => Promise<Session<Data, FlashData>>
}

export type CreateCookieSessionStorageFunction = <
  Data = SessionData,
  FlashData = Data,
>(
  options?: CookieSessionStorageOptions,
) => SessionStorage<Data, FlashData>

export type IsCookieFunction = (object: Cookie) => object is Cookie

/**
 * Returns true if an object is a Remix cookie container.
 *
 * @see https://remix.run/utils/cookies#iscookie
 */
export const isCookie: IsCookieFunction = (object): object is Cookie => {
  return (
    object != null &&
    typeof object.name === 'string' &&
    typeof object.isSigned === 'boolean' &&
    typeof object.parse === 'function' &&
    typeof object.serialize === 'function'
  )
}

/**
 * Creates and returns a SessionStorage object that stores all session data
 * directly in the session cookie itself.
 *
 * This has the advantage that no database or other backend services are
 * needed, and can help to simplify some load-balanced scenarios. However, it
 * also has the limitation that serialized session data may not exceed the
 * browser's maximum cookie size. Trade-offs!
 *
 * @see https://remix.run/utils/sessions#createcookiesessionstorage
 */
export const createCookieSessionStorageFactory =
  (createCookie: CreateCookieFunction): CreateCookieSessionStorageFunction =>
  // @ts-expect-error TypeA is not assignable to TypeB.
  ({ cookie: cookieArg } = {}) => {
    // @ts-expect-error TypeA is not assignable to TypeB.
    const cookie = isCookie(cookieArg)
      ? cookieArg
      : createCookie(cookieArg?.name || '__session', cookieArg)

    warnOnceAboutSigningSessionCookie(cookie)

    return {
      async getSession(cookieHeader, options) {
        return createSession(
          // eslint-disable-next-line @typescript-eslint/no-extra-parens
          (cookieHeader && (await cookie.parse(cookieHeader, options))) || {},
        )
      },
      async commitSession(session, options) {
        const serializedCookie = await cookie.serialize(session.data, options)

        if (serializedCookie.length > 4096) {
          throw new Error(
            `Cookie length will exceed browser maximum. Length: ${serializedCookie.length}`,
          )
        }

        return serializedCookie
      },
      async destroySession(_session, options) {
        return cookie.serialize('', {
          ...options,
          maxAge: undefined,
          expires: new Date(0),
        })
      },
    }
  }

export type CreateSessionStorageFunction = <
  Data = SessionData,
  FlashData = Data,
>(
  strategy: SessionIdStorageStrategy<Data, FlashData>,
) => SessionStorage<Data, FlashData>

/**
 * Creates a SessionStorage object using a SessionIdStorageStrategy.
 *
 * Note: This is a low-level API that should only be used if none of the
 * existing session storage options meet your requirements.
 *
 * @see https://remix.run/utils/sessions#createsessionstorage
 */
export const createSessionStorageFactory =
  (createCookie: CreateCookieFunction): CreateSessionStorageFunction =>
  // @ts-expect-error TypeA is not assignable to TypeB
  ({ cookie: cookieArg, createData, deleteData, readData, updateData }) => {
    // @ts-expect-error TypeA is not assignable to TypeB
    const cookie = isCookie(cookieArg)
      ? cookieArg
      : createCookie(cookieArg?.name || '__session', cookieArg)

    warnOnceAboutSigningSessionCookie(cookie)

    return {
      async getSession(cookieHeader, options) {
        // eslint-disable-next-line @typescript-eslint/no-extra-parens
        const id = cookieHeader && (await cookie.parse(cookieHeader, options))
        // eslint-disable-next-line @typescript-eslint/no-extra-parens
        const data = id && (await readData(id as string))
        return createSession(data || {}, (id as string) || '')
      },
      async commitSession(session, options) {
        let { id } = session
        const { data } = session

        const expires =
          options?.maxAge != null
            ? new Date(Date.now() + options.maxAge * 1000)
            : options?.expires != null
              ? options.expires
              : cookie.expires

        if (id) {
          await updateData(id, data, expires)
        } else {
          id = await createData(data, expires)
        }

        return cookie.serialize(id, options)
      },
      async destroySession(session, options) {
        await deleteData(session.id)
        return cookie.serialize('', {
          ...options,
          maxAge: undefined,
          expires: new Date(0),
        })
      },
    }
  }

export function warnOnceAboutSigningSessionCookie(cookie: Cookie) {
  warnOnce(
    cookie.isSigned,
    // eslint-disable-next-line i18n-text/no-en
    `The '${cookie.name}' cookie is not signed, but session cookies should be
      signed to prevent tampering on the client before they are sent back to the
      server. See https://remix.run/utils/cookies#signing-cookies
      for more information.`,
  )
}

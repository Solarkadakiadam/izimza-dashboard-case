interface CookieOptions {
  days?: number
  secure?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
}

export const setCookie = (name: string, value: string, options: CookieOptions = {}): void => {
  const { days = 7, secure = true, sameSite = 'Strict' } = options

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    cookieString += `; expires=${date.toUTCString()}`
  }

  cookieString += `; path=/`

  if (secure && window.location.protocol === 'https:') {
    cookieString += `; Secure`
  }

  cookieString += `; SameSite=${sameSite}`

  document.cookie = cookieString
}

export const getCookie = (name: string): string | null => {
  const nameEQ = encodeURIComponent(name) + '='
  const cookies = document.cookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]?.trim()
    if (cookie && cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length))
    }
  }

  return null
}

export const deleteCookie = (name: string): void => {
  setCookie(name, '', { days: -1 })
}

export const hasAuthToken = (): boolean => {
  return getCookie('auth_token') !== null
}

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials, RegisterData } from '@/types/auth'
import { setCookie, getCookie, deleteCookie, hasAuthToken } from '@/utils/cookies'

const DUMMY_USERS = [
  {
    id: '1',
    email: 'omer@izimza.com',
    password: '123456',
    name: 'Ömer',
    surname: 'Avşar',
  },
  {
    id: '2',
    email: 'test@izimza.com',
    password: 'test123',
    name: 'Test',
    surname: 'User',
  },
]

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)

  const currentUser = computed(() => user.value)
  const isLoggedIn = computed(() => isAuthenticated.value)

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const foundUser = DUMMY_USERS.find(
      (u) => u.email === credentials.email && u.password === credentials.password,
    )

    if (foundUser) {
      user.value = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        surname: foundUser.surname,
      }
      isAuthenticated.value = true

      const token = `token_${foundUser.id}_${Date.now()}`
      const days = credentials.rememberMe ? 7 : 1
      setCookie('auth_token', token, { days, secure: true, sameSite: 'Strict' })
      setCookie('user_data', JSON.stringify(user.value), {
        days,
        secure: true,
        sameSite: 'Strict',
      })

      return true
    }

    return false
  }

  const register = async (data: RegisterData): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const exists = DUMMY_USERS.find((u) => u.email === data.email)
    if (exists) {
      return false
    }

    const newUser: User = {
      id: String(DUMMY_USERS.length + 1),
      email: data.email,
      name: data.name,
      surname: data.surname,
    }

    user.value = newUser
    isAuthenticated.value = true

    const token = `token_${newUser.id}_${Date.now()}`

    setCookie('auth_token', token, { days: 7, secure: true, sameSite: 'Strict' })
    setCookie('user_data', JSON.stringify(user.value), {
      days: 7,
      secure: true,
      sameSite: 'Strict',
    })

    DUMMY_USERS.push({
      ...newUser,
      password: data.password,
    })

    return true
  }

  const logout = (): void => {
    user.value = null
    isAuthenticated.value = false

    deleteCookie('auth_token')
    deleteCookie('user_data')
  }

  const checkAuth = (): boolean => {
    if (hasAuthToken()) {
      const userData = getCookie('user_data')
      if (userData) {
        try {
          user.value = JSON.parse(userData)
          isAuthenticated.value = true
          return true
        } catch (error) {
          console.error('Failed to parse user data:', error)
          logout()
        }
      }
    }
    return false
  }

  checkAuth()

  return {
    user,
    isAuthenticated,
    currentUser,
    isLoggedIn,
    login,
    register,
    logout,
    checkAuth,
  }
})

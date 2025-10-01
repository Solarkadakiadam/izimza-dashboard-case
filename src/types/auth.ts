export interface User {
  id: string
  email: string
  name: string
  surname: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  name: string
  surname: string
  email: string
  password: string
  passwordConfirm: string
  acceptTerms: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export interface Document {
  id: string
  name: string
  type: string
  date: Date
}

import { createContext, ReactNode, useState } from 'react'
import { useEffect } from 'react'
import { api } from '../server/api'

type AuthResponse = {
  token: string
  user: {
    id: string
    avatar_url: string
    name: string
    login: string
  }
}

type User = {
  id: string
  name: string
  login: string
  avatar_url: string
}

type AuthContextData = {
  user: User | null
  singInUrl: string
  signOut: () => void
}

type AuthProvider = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null)

  const singInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=ee5760b40bc9e9f7638c`

  async function singIn(githubCode: string) {
    console.log('Tentando autenticar')

    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode
    })

    const { token, user } = response.data

    if (token) {
      console.log('Autenticado')
      localStorage.setItem('@dowhile:token', token)
      api.defaults.headers.common.authorization = `Bearer ${token}`
      setUser(user)
    }
  }

  async function signOut() {
    setUser(null)
    localStorage.removeItem('@dowhile:token')
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token')

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`

      api.get<User>('profile').then(response => {
        console.log(response.data)
        setUser(response.data)
      })
    }
  }, [])

  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes('?code=')
    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=')
      console.log({ urlWithoutCode, githubCode })

      //window.history.pushState({}, '', urlWithoutCode)

      singIn(githubCode)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ singInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}

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
  singOut: () => void
}

type AuthProvider = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null)

  const singInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=ee5760b40bc9e9f7638c`

  async function singIn(githubCode: string) {
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode
    })

    const { token, user } = response.data

    localStorage.setItem('@dowhile:token', token)

    console.log(user)
    setUser(user)
  }

  async function singOut() {
    setUser(null)
    localStorage.removeItem('@dowhile:token')
  }

  useEffect(() => {
    const tokenStorage = localStorage.getItem('@dowhile:token')

    if (tokenStorage) {
      api.defaults.headers.common.authorization = `Bearer ${tokenStorage}`

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

      window.history.pushState({}, '', urlWithoutCode)

      singIn(githubCode)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ singInUrl, user, singOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}

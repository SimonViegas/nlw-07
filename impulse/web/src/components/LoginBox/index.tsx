import { useEffect } from 'react'
import { VscGithubInverted } from 'react-icons/vsc'
import { api } from '../../server/api'
import styles from './styles.module.scss'

type AuthResponse = {
  token: string
  user: {
    id: string
    avatar_url: string
    name: string
    login: string
  }
}

export function LoginBox() {
  const singInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=ee5760b40bc9e9f7638c`

  useEffect(() => {
    const url = window.location.href
    const hasGithubCode = url.includes('?code=')

    async function singIn(githubCode: string) {
      const response = await api.post<AuthResponse>('authenticate', {
        code: githubCode
      })

      const { token, user } = response.data

      localStorage.setItem('@dowhile:token', token)

      console.log(user)
    }

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=')
      console.log({ urlWithoutCode, githubCode })

      window.history.pushState({}, '', urlWithoutCode)

      singIn(githubCode)
    }
  }, [])

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={singInUrl} className={styles.singInWithGithub}>
        <VscGithubInverted size="24" />
        Entra com o GitHub
      </a>
    </div>
  )
}

import { useContext } from 'react'
import { VscGithubInverted } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/auth'

import styles from './styles.module.scss'

export function LoginBox() {
  const { singInUrl, user } = useContext(AuthContext)

  console.log(user)

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

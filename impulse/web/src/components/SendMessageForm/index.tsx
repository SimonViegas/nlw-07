import { useContext } from 'react'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/auth'
import styles from './styles.module.scss'

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext)

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>
      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt="Avatar Simon Viegas" />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          className={styles.sendMessageForm}
          name="mensagem"
          id="message"
          placeholder="Qual a sua expectativa para o evento"
        ></textarea>

        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  )
}

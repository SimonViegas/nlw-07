import { VscGithubInverted } from 'react-icons/vsc';
import styles from './styles.module.scss';

export function LoginBox() {
  return (
    <div className={styles.loginBoxWrapper} >
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href="#" className={styles.singInWithGithub}>
      <VscGithubInverted size="24"/>
      Entra com o GitHub
      </a>
   </div>
  )
}
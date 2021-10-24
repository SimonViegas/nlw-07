import styles from './App.module.css';
import { MessageList } from './components/MessageList';
import { LoginBox } from './components/LoginBox';

export function App() {
  return (
   <main className={styles.contentWrapper}>
     <MessageList></MessageList>
     <LoginBox></LoginBox>
   </main>
  )
}

import { useContext } from 'react'
import { MessageList } from './components/MessageList'
import { LoginBox } from './components/LoginBox'
import { AuthContext } from './contexts/auth'
import { SendMessageForm } from './components/SendMessageForm'

import styles from './App.module.css'

export function App() {
  const { user } = useContext(AuthContext)

  return (
    <main className={styles.contentWrapper}>
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  )
}

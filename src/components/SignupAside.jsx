import Image from 'next/image'
import styles from '../styles/Signup.module.css'

export default function SignupAside() {
  return (
    <aside className={styles.asideContainer}>
      <div className={styles.logo}>GargyoPay</div>
      <Image src={require('../assets/img/fullphone.png')} />
      <div className={styles.title}>
        App that Covering Banking Needs.
      </div>
      <div className={styles.info}>
        Zwallet is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in Zwallet everyday with worldwide users coverage.
      </div>
    </aside>
  )
}

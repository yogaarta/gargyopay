import SignupAside from "../../components/SignupAside";
import styles from '../../styles/Signup.module.css'
import Link from 'next/link'
import { Person, Envelope, Lock, Eye, EyeSlash } from 'react-bootstrap-icons'
import { useState } from "react";

export default function Signup() {
  const [isPassShown, setIsPassShown] = useState(false)
  const showPassHandler = () => {
    setIsPassShown(!isPassShown)
  }
  return (
    <main className={styles.globalContainer}>
      <SignupAside />
      <section className={styles.mainContainer}>
        <div className={styles.mainLogo}>GargyoPay</div>
        <div className={styles.title}>
          Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users
        </div>
        <div className={styles.info}>
          Transfering money is eassier than ever, you can access GargyoPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="first-name">
            <Person className={styles.icon} />
            <input type="text" id="first-name" placeholder="Enter your first name" />
          </label>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="last-name">
            <Person className={styles.icon} />
            <input type="text" id="last-name" placeholder="Enter your last name" />
          </label>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email">
            <Envelope className={styles.icon} />
            <input type="text" id="email" placeholder="Enter your email" />
          </label>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="pass">
            <Lock className={styles.icon} />
            <input type={isPassShown ? "text" : "password"} id="pass" placeholder="Enter your password" />
            {isPassShown ? <Eye className={`${styles.icon} ${styles.eye}`} onClick={showPassHandler} /> : <EyeSlash className={`${styles.icon} ${styles.eye}`} onClick={showPassHandler} />}
          </label>
        </div>
        <div className={styles.button}>Sign Up</div>
        <div className={styles.login}>Already have an account? Let's <Link href={'/login'}>Login</Link></div>
      </section>
    </main>
  )
}

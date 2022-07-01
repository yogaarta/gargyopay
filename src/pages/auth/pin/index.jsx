import SignupAside from "../../../components/SignupAside";
import styles from '../../../styles/Signup.module.css'
import Link from 'next/link'
import { Person, Envelope, Lock, Eye, EyeSlash } from 'react-bootstrap-icons'
import { useState } from "react";

export default function Login() {
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
          Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created Yourself.
        </div>
        <div className={styles.info}>
          Create 6 digits pin to secure all your money and your data in FazzPay app. Keep it secret and don't tell anyone about your GargyoPay account password and the PIN.
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
        <div className={styles.button}>Confirm</div>
      </section>
    </main>
  )
}

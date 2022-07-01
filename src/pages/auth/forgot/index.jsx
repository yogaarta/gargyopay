import SignupAside from "../../../components/SignupAside";
import styles from '../../../styles/Signup.module.css'
import Link from 'next/link'
import { Person, Envelope, Lock, Eye, EyeSlash } from 'react-bootstrap-icons'
import { useState } from "react";

export default function Forgot() {
  const [isPassShown, setIsPassShown] = useState(false)
  const [isConfirmPassShown, setIsConfirmPassShown] = useState(false)
  const [page, setPage] = useState("reset")
  const showPassHandler = () => {
    setIsPassShown(!isPassShown)
  }
  const showConfirmPassHandler = () => {
    setIsConfirmPassShown(!isConfirmPassShown)
  }
  const resetPassHandler = () => {
    setPage("newPass")
  }
  const confirmPassHandler = () => {
    setPage("reset")
  }

  return (
    <main className={styles.globalContainer}>
      <SignupAside />
      <section className={styles.mainContainer}>
        <div className={styles.mainLogo}>GargyoPay</div>
        <div className={styles.title}>
          Did You Forgot Your Password? Don't Worry, You Can Reset Your Password In a Minutes.
        </div>
        <div className={styles.info}>
          To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.
        </div>
        {page === 'reset' ?
          <>
            <div className={styles.inputContainer}>
              <label htmlFor="email">
                <Envelope className={styles.icon} />
                <input type="text" id="email" placeholder="Enter your email" />
              </label>
            </div>
            <div className={styles.button} onClick={resetPassHandler}>Confirm</div>
          </>
          :
          <>
            <div className={styles.inputContainer}>
              <label htmlFor="pass">
                <Lock className={styles.icon} />
                <input type={isPassShown ? "text" : "password"} id="pass" placeholder="Create new password" />
                {isPassShown ? <Eye className={`${styles.icon} ${styles.eye}`} onClick={showPassHandler} /> : <EyeSlash className={`${styles.icon} ${styles.eye}`} onClick={showPassHandler} />}
              </label>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="pass">
                <Lock className={styles.icon} />
                <input type={isConfirmPassShown ? "text" : "password"} id="pass" placeholder="Confirm new password" />
                {isConfirmPassShown ? <Eye className={`${styles.icon} ${styles.eye}`} onClick={showConfirmPassHandler} /> : <EyeSlash className={`${styles.icon} ${styles.eye}`} onClick={showConfirmPassHandler} />}
              </label>
            </div>
            <div className={styles.button} onClick={confirmPassHandler}>Reset Password</div>
          </>
        }


      </section>
    </main>
  )
}

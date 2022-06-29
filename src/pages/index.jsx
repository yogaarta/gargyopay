import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Landing.module.css'

import Phone from '../assets/img/phone.png'

export default function Landing() {
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.navbar}>
          <div className={styles.logo}>GargyoPay</div>
          <div className={styles.authContainer}>
            <div className={styles.loginButton}>Login</div>
            <div className={styles.signUpButton}>Register</div>
          </div>
        </div>
        <div className={styles.banner2}>
          <div className={styles.title}>Awesome App <br /> For Saving Time.</div>
          <div className={styles.info}>We bring you a mobile app for banking problems that <br />oftenly wasting much of your times.</div>
          <div className={styles.button}>Try It Free</div>
        </div>
      </div>
    </>
  )
}

import SignupAside from "../../components/SignupAside";
import styles from '../../styles/Signup.module.css'
import Link from 'next/link'
import { Person, Envelope, Lock, Eye, EyeSlash } from 'react-bootstrap-icons'
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [isPassShown, setIsPassShown] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isError, setIsError] = useState(null)
  const [msg, setMsg] = useState("")

  const loginHandler = async () => {
    try {
      setIsError(null)
      setMsg("")
      let body = {email, password}
      let response = await axios.post(`${process.env.NEXT_PUBLIC_BE_HOST}/auth/login`, body)
      setIsError(false)
      setMsg(response.msg)
      console.log(response)
      
    } catch (error) {
      setIsError(true)
      setMsg(error.msg)
    }
  }
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
          <label htmlFor="email">
            <Envelope className={styles.icon} />
            <input type="text" id="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)}/>
          </label>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="pass">
            <Lock className={styles.icon} />
            <input type={isPassShown ? "text" : "password"} id="pass" placeholder="Enter your password" onChange={e => setPassword(e.target.value)}/>
            {isPassShown ? <Eye className={`${styles.icon} ${styles.eye}`} onClick={showPassHandler} /> : <EyeSlash className={`${styles.icon} ${styles.eye}`} onClick={showPassHandler} />}
          </label>
        </div>
        <Link href={'/forgot'}>
          <div className={styles.forgot}>Forgot password?</div>
        </Link>
        {isError === null ? <></> : isError ? <div className={styles.errorMsg}>{msg}</div> : <div className={styles.errorMsg}>{msg}</div>}
        <div className={styles.button} onClick={loginHandler}>Login</div>
        <div className={styles.login}>Don't have an account? Let's <Link href={'/signup'}>Sign Up</Link></div>
      </section>
    </main>
  )
}

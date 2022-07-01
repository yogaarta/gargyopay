import SignupAside from "../../../components/SignupAside";
import styles from '../../../styles/Signup.module.css'
import Link from 'next/link'
import { Envelope, Lock, Eye, EyeSlash } from 'react-bootstrap-icons'
import { useEffect, useState } from "react";
import axios from "axios";

export default function Login() {
  const [isPassShown, setIsPassShown] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailFilled, setEmailFilled] = useState(false)
  const [passFilled, setPassFilled] = useState(false)
  const [isError, setIsError] = useState(null)
  const [buttonActive, setButtonActive] = useState(false)
  const [msg, setMsg] = useState("")

  useEffect(() => {
    setEmailFilled(email)
    setPassFilled(password)
    setButtonActive(email && password)
  }, [email, password, isError])

  const loginHandler = async () => {
    try {
      setIsError(null)
      setMsg("")
      let body = { email, password }
      let response = await axios.post(`${process.env.NEXT_PUBLIC_BE_HOST}/auth/login`, body)
      setIsError(false)
      setMsg(response.data.msg)

    } catch (error) {
      setIsError(true)
      setMsg(error.response.data.msg)
    }
  }

  const showPassHandler = () => {
    setIsPassShown(!isPassShown)
  }
  return (
    <main className={styles.globalContainer}>
      <SignupAside />
      <section className={styles.mainContainer}>
        <div className={styles.mainLogo}><Link href={"/"}>GargyoPay</Link></div>
        <div className={styles.title}>
          Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users
        </div>
        <div className={styles.info}>
          Transfering money is eassier than ever, you can access GargyoPay wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!
        </div>
        <div className={`${styles.inputContainer} ${emailFilled ? styles.borderActive : styles.borderInactive}`}>
          <label htmlFor="email">
            <Envelope className={emailFilled ? styles.iconActive : styles.icon} />
            <input type="text" id="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
          </label>
        </div>
        <div className={`${styles.inputContainer} ${passFilled ? styles.borderActive : styles.borderInactive}`}>
          <label htmlFor="pass">
            <Lock className={passFilled ? styles.iconActive : styles.icon} />
            <input type={isPassShown ? "text" : "password"} id="pass" placeholder="Enter your password" onChange={e => setPassword(e.target.value)} />
            {isPassShown ? <Eye className={`${passFilled ? styles.iconActive : styles.icon} ${styles.eye}`} onClick={showPassHandler} /> : <EyeSlash className={`${passFilled ? styles.iconActive : styles.icon} ${styles.eye}`} onClick={showPassHandler} />}
          </label>
        </div>
        <Link href={'/auth/forgot'}>
          <div className={styles.forgot}>Forgot password?</div>
        </Link>
        {isError === null ? <></> : isError ? <div className={styles.errorMsg}>{msg}</div> : <div className={styles.errorMsg}>{msg}</div>}
        {buttonActive ? 
        <div className={styles.button} onClick={loginHandler}>Login</div> :
        <div className={styles.buttonInactive}>Login</div>
        }
        <div className={styles.login}>Don't have an account? Let's <Link href={'/auth/signup'}>Sign Up</Link></div>
      </section>
    </main>
  )
}

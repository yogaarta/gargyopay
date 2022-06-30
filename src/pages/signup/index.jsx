import SignupAside from "../../components/SignupAside";
import styles from '../../styles/Signup.module.css'
import Link from 'next/link'
import { Person, Envelope, Lock, Eye, EyeSlash } from 'react-bootstrap-icons'
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [isPassShown, setIsPassShown] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isError, setIsError] = useState(false)
  const [msg, setMsg] = useState("")


  const showPassHandler = () => {
    setIsPassShown(!isPassShown)
  }
  const signUpHandler = async () => {
    try {
      setIsError(false)
      setMsg("")
      let body = {firstName, lastName, email, password}
      let response = await axios.post(`${process.env.NEXT_PUBLIC_BE_HOST}/auth/register`, body)
      setMsg(response.msg)
    } catch (error) {
      setIsError(true)
      setMsg(error.msg)
      console.log(error);
    }
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
            <input type="text" id="first-name" placeholder="Enter your first name" 
            onChange={e => setFirstName(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="last-name">
            <Person className={styles.icon} />
            <input type="text" id="last-name" placeholder="Enter your last name" 
            onChange={e => setLastName(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email">
            <Envelope className={styles.icon} />
            <input type="text" id="email" placeholder="Enter your email" 
            onChange={e => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="pass">
            <Lock className={styles.icon} />
            <input type={isPassShown ? "text" : "password"} id="pass" placeholder="Enter your password" 
            onChange={e => setPassword(e.target.value)}
            />
            {isPassShown ? <Eye className={`${styles.icon} ${styles.eye}`} onClick={showPassHandler} /> : <EyeSlash className={`${styles.icon} ${styles.eye}`} onClick={showPassHandler} />}
          </label>
        </div>
        {isError ? <div className={styles.errorMsg}>{msg}</div> : <></>}
        <div className={styles.button}
        onClick={signUpHandler}
        >Sign Up</div>
        <div className={styles.login}>Already have an account? Let's <Link href={'/login'}>Login</Link></div>
      </section>
    </main>
  )
}

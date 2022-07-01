import SignupAside from "../../../components/SignupAside";
import styles from '../../../styles/Signup.module.css'
import Link from 'next/link'
import { useEffect, useState } from "react";
import ReactCodeInput from 'react-code-input'
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from '../../../components/Loading';

export default function Login() {
  const [pinCode, setPinCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [msg, setMsg] = useState("")

  const { data } = useSelector(state => state.auth)
  const handlePinChange = e => {
      setPinCode(e);
  };

  useEffect(()=>{

  },[])

  const createPinHandler = async () => {
    try {
      setIsLoading(true)
      const body = { pinCode }
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_BE_HOST}/auth/pin/${data.id}`, body)
      setMsg(response.data.msg)
      setIsSuccess(true)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  return (
    <main className={styles.globalContainer}>
      {isLoading && <Loading />}
      <SignupAside />
      <section className={styles.mainContainer}>
        <div className={styles.mainLogo}>GargyoPay</div>
        <div className={styles.title}>
          Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That You Created Yourself.
        </div>
        <div className={styles.info}>
          Create 6 digits pin to secure all your money and your data in FazzPay app. Keep it secret and don't tell anyone about your GargyoPay account password and the PIN.
        </div>
        <div className={styles.pinContainer}>
          <ReactCodeInput type="number" fields={6} className={styles.reactCodeInput}
          onChange={handlePinChange}
          />
        </div>
        <div className={styles.button}
        onClick={()=> console.log(pinCode)}>Confirm</div>
      </section>
    </main>
  )
}

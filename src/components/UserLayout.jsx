import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Bell, Grid, ArrowUp, PlusLg, Person, Upload } from "react-bootstrap-icons"
import { Modal, Button } from "react-bootstrap"
import { useRouter } from 'next/router'
import Head from "next/head"
import Image from 'next/image'
import Link from 'next/link'
import Loading from '../components/Loading';
import styles from "../styles/UserLayouts.module.css"
import Profpict from "../assets/img/profpict.png"
import axios from "axios";
import { logoutAction } from "../redux/actionCreators/auth";

export default function UserLayout({ children, title, name, number }) {
  const [showTopUp, setShowTopUp] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [amount, setAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [msg, setMsg] = useState("")
  const [link, setLink] = useState("")

  const router = useRouter()
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.auth)

  const submitTopUpHandler = async () => {
    try {
      setIsLoading(true)
      const { token } = data
      const body = { amount }
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BE_HOST}/transaction/top-up`, body, config)
      setMsg(response.data.msg)
      setLink(response.data.data.redirectUrl)
      setIsSuccess(true)
      console.log(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsSuccess(false)
      setIsLoading(false)
    }
  }

  const logoutHandler = async () => {
    try {
      setIsLoading(true)
      const { token } = data
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BE_HOST}/auth/logout`, config)
      console.log(response)
      dispatch(logoutAction())
      setIsLoading(false)
      setShowLogout(false)
      router.push('/')
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  return (
    <>
      {isLoading && <Loading />}
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <header className={styles.header}>
        <div className={styles.logo}><Link href={"/"}>GargyoPay</Link></div>
        <div className={styles.profileContainer}>
          <div className={styles.profPictContainer}><Image src={Profpict} className={styles.profPict} /></div>
          <div className={styles.nameContainer}>
            <div className={styles.userName}>Robert Chandler</div>
            <div className={styles.userNumber}>+62 8139 3877 7946</div>
          </div>
          <div className={styles.notif}><Bell className={styles.icon} /></div>
        </div>
      </header>
      <main className={styles.mainContainer}>
        <nav className={styles.nav}>
          <div className={styles.mainNav}>
            <div className={title === "Dashboard" && !showTopUp ? styles.menuActive : styles.menu}><Grid className={styles.icon} /> Dashboard</div>
            <div className={title === "Transfer" && !showTopUp ? styles.menuActive : styles.menu}><ArrowUp className={styles.icon} /> Transfer</div>
            <div className={showTopUp ? styles.menuActive : styles.menu}
              onClick={() => {
                setShowTopUp(true)
                setIsSuccess(false)
              }}
            ><PlusLg className={styles.icon} /> Top Up</div>
            <div className={title === "Profile" && !showTopUp ? styles.menuActive : styles.menu}><Person className={styles.icon} /> Profile</div>
          </div>
          <div className={styles.logout}
            onClick={() => setShowLogout(true)}
          ><Upload className={styles.icon} /> Logout</div>
        </nav>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={styles.copyright}>2022 GargyoPay. All right reserved.</div>
        <div className={styles.right}>
          <div className={styles.phone}>+62 822 421 617 66</div>
          <div className={styles.email}>contact@gargyopay.com</div>
        </div>
      </footer>
      <Modal
        show={showLogout}
        onHide={() => setShowLogout(false)}>
        <Modal.Header closeButton className={styles.modalHeader}>
          Log Out
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          Are You Sure?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogout(false)}>
            Cancel
          </Button>
          <Button variant="primary" className={styles.modalPrimaryButton}
            onClick={logoutHandler}>
            Log Out
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showTopUp}
        onHide={() => setShowTopUp(false)} className={styles.topUpModal}>
        <Modal.Header closeButton className={styles.modalHeader}>
          Top Up
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          {isSuccess ?
            <>
              {msg}
            </>
            : <>
              Enter the amount of money, and click submit
              <label htmlFor="amount" className={styles.inputTopUpContainer}>
                <input type="number" id="amount" className={styles.inputTopUp}
                  onChange={e => setAmount(e.target.value)} placeholder="Input amount" />
              </label>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          {isSuccess ?
            <>
              <Button variant="secondary" onClick={() => setShowTopUp(false)}>
                Cancel
              </Button>
              <Button variant="primary" className={styles.modalPrimaryButton} onClick={()=> setShowTopUp(false)}>
                <Link href={link}>
                  <a target="_blank">Pay</a>
                </Link>
              </Button>
            </>
            :
            <Button variant="primary" onClick={submitTopUpHandler} className={styles.modalPrimaryButton}>
              Submit
            </Button>
          }
        </Modal.Footer>
      </Modal>
    </>
  )
}

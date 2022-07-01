import Head from "next/head"
import Image from 'next/image'
import styles from "../styles/UserLayouts.module.css"
import { Bell, Grid, ArrowUpShort, PlusLg, Person } from "react-bootstrap-icons"
import Profpict from "../assets/img/profpict.png"

export default function UserLayout({ children, title, name, number }) {
  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <header className={styles.header}>
        <div className={styles.logo}>GargyoPay</div>
        <div className={styles.profileContainer}>
          <div className={styles.profPictContainer}><Image src={Profpict} className={styles.profPict}/></div>
          <div className={styles.nameContainer}>
            <div className={styles.userName}>Robert Chandler</div>
            <div className={styles.userNumber}>+62 8139 3877 7946</div>
          </div>
          <div className={styles.notif}><Bell className={styles.icon}/></div>
        </div>
      </header>
      <main className={styles.mainContainer}>
        <nav className="nav">
          <div className="mainNav">
            <div className="dashboard"><Grid /> Dashboard</div>
            <div className="transfer"><ArrowUpShort /> Transfer</div>
            <div className="topUp"><PlusLg /> Top Up</div>
            <div className="profile"><Person /> Profile</div>
          </div>
          <div className="logout">Logout</div>
        </nav>
        {children}
      </main>
      <footer>
        <div className="copyright">2022 GargyoPay. All right reserved.</div>
        <div className={styles.right}>
          <div className={styles.phone}>+62 822 421 617 66</div>
          <div className={styles.email}>contact@gargyopay.com</div>
        </div>
      </footer>
    </>
  )
}

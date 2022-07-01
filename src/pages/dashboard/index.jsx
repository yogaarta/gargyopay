import React from 'react'
import styles from "../../styles/Dashboard.module.css"
import UserLayout from '../../components/UserLayout'

export default function Dashboard() {
  return (
    <UserLayout>
      <main className={styles.mainContainer}>
        main content nih
      </main>
    </UserLayout>
  )
}

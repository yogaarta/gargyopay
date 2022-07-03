import React from 'react'
import { useEffect, useState } from "react";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Loading from '../../components/Loading';
import styles from "../../styles/Transfer.module.css"
import UserLayout from '../../components/UserLayout'
import Profpict from "../../assets/img/profpict.png"
import { currencyFormatter } from '../../helper/formatter';

export default function UserDetail() {
  const [title, setTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState(0)
  const [user, setUser] = useState([])

  const { data } = useSelector(state => state.auth)
  const { userData } = useSelector(state => state.user)
  const router = useRouter()

  const getUserDetail = async () => {
    try {
      setIsLoading(true)
      const { token } = data
      const { id } = router.query
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BE_HOST}/user/profile/${id}`, config)
      setUser(response.data.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setTitle("Transfer");
    getUserDetail()
  }, [])
  return (
    <>
      {isLoading && <Loading />}
      <UserLayout title={title}>
        <main className={styles.mainContainer}>
          <section className={styles.transferCard}>
            <div className={styles.title}>Transfer Money</div>
            <div className={styles.userCard}>
              <div className={styles.profPictContainer}><Image src={user.image ? user.image : Profpict} className={styles.profPict} /></div>
              <div className={styles.nameContainer}>
                <div className={styles.name}>{`${user.firstName} ${user.lastName}`}</div>
                <div className={styles.number}>{user.noTelp}</div>
              </div>
            </div>
            <div className={styles.transferInfo}>Type the amount you want to transfer and then press continue to the next steps.</div>
            <label htmlFor='transfer' className={styles.transferInputContainer}>
              <input type="number" name="transfer" id="transfer" placeholder='0'
              value={amount}
              onChange={e => {
                setAmount(e.target.value)
              }}
              />
            </label>
            <div className={styles.balanceInfo}>{`${currencyFormatter.format(userData.balance)} Available`}</div>
            <div className="noteContainer">
              <input type="text" />
            </div>
          </section>
        </main>
      </UserLayout>
    </>
  )
}

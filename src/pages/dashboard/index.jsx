import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Modal, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux";

import Loading from '../../components/Loading';
import styles from "../../styles/Dashboard.module.css"
import UserLayout from '../../components/UserLayout'
import { ArrowUp, PlusLg, ArrowDown } from 'react-bootstrap-icons'
import Profpict from "../../assets/img/profpict.png"
import { getUserDataAction } from '../../redux/actionCreators/userData';
import { currencyFormatter } from '../../helper/formatter';

export default function Dashboard() {
  const [title, setTitle] = useState("")
  const [showTopUp, setShowTopUp] = useState(false)
  const [amount, setAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [msg, setMsg] = useState("")
  const [link, setLink] = useState("")

  const router = useRouter()
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.auth)
  const { userData } = useSelector(state => state.user)


  useEffect(() => {
    setTitle("Dashboard")
    dispatch(getUserDataAction(data.id, data.token))
  }, [])

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
  return (
    <>
      {isLoading && <Loading />}
      <UserLayout title={title}>
        <main className={styles.mainContainer}>
          <section className={styles.balanceContainer}>
            <div className={styles.balanceLeft}>
              <div className={styles.title}>Balance</div>
              <div className={styles.balance}>{currencyFormatter.format(userData.balance)}</div>
              <div className={styles.phone}>{userData.noTelp}</div>
            </div>
            <div className={styles.balanceRight}>
              <div className={styles.transfer}
              onClick={()=> router.push('/transfer')}
              ><ArrowUp className={styles.icon} /> Transfer</div>
              <div className={styles.transfer}
                onClick={() => {
                  setShowTopUp(true)
                  setIsSuccess(false)
                }}
              ><PlusLg className={styles.icon} /> Top Up</div>
            </div>
          </section>
          <section className={styles.bottomContainer}>
            <section className={styles.chartContainer}>
              <div className={styles.chartTop}>
                <div className={styles.income}>
                  <ArrowDown className={styles.icon} />
                  <div className={styles.title}>Income</div>
                  <div className={styles.total}>Rp2.120.000</div>
                </div>
                <div className={styles.expense}>
                  <ArrowUp className={styles.icon} />
                  <div className={styles.title}>Expense</div>
                  <div className={styles.total}>Rp1.560.000</div></div>
              </div>
              <div className={styles.chartBottom}>
                <div className={styles.dayContainer}>
                  <div className={styles.bar} style={{ height: "80%" }}></div>
                  <div className={styles.day}>Sat</div>
                </div>
                <div className={styles.dayContainer}>
                  <div className={styles.bar} style={{ height: "80%" }}></div>
                  <div className={styles.day}>Sun</div>
                </div>
                <div className={styles.dayContainer}>
                  <div className={styles.bar} style={{ height: "80%" }}></div>
                  <div className={styles.day}>Mon</div>
                </div>
                <div className={styles.dayContainer}>
                  <div className={styles.bar} style={{ height: "80%" }}></div>
                  <div className={styles.day}>Tue</div>
                </div>
                <div className={styles.dayContainer}>
                  <div className={styles.bar} style={{ height: "80%" }}></div>
                  <div className={styles.day}>Wed</div>
                </div>
                <div className={styles.dayContainer}>
                  <div className={styles.bar} style={{ height: "80%" }}></div>
                  <div className={styles.day}>Thu</div>
                </div>
                <div className={styles.dayContainer}>
                  <div className={styles.bar} style={{ height: "80%" }}></div>
                  <div className={styles.day}>Fri</div>
                </div>
              </div>
            </section>
            <section className={styles.historyContainer}>
              <div className={styles.titleContainer}>
                <div className={styles.title}>Transaction History</div>
                <div className={styles.seeAll}>See all</div>
              </div>
              <div className={styles.transactionContainer}>
                <div className={styles.item}>
                  <div className={styles.pictNameContainer}>
                    <div className={styles.profPictContainer}><Image src={Profpict} className={styles.profPict} /></div>
                    <div className={styles.nameContainer}>
                      <div className={styles.name}>Samuel Suhi</div>
                      <div className={styles.status}>Accept</div>
                    </div>
                  </div>
                  <div className={`${styles.nominal} ${styles.out}`}>-Rp50.000</div>
                </div>
                <div className={styles.item}>
                  <div className={styles.pictNameContainer}>
                    <div className={styles.profPictContainer}><Image src={Profpict} className={styles.profPict} /></div>
                    <div className={styles.nameContainer}>
                      <div className={styles.name}>Samuel Suhi</div>
                      <div className={styles.status}>Accept</div>
                    </div>
                  </div>
                  <div className={`${styles.nominal} ${styles.in}`}>+Rp50.000</div>
                </div>
              </div>
            </section>
          </section>
        </main>
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
                <Button variant="primary" className={styles.modalPrimaryButton} onClick={() => setShowTopUp(false)}>
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
      </UserLayout>
    </>
  )
}

import React from 'react'
import { useEffect, useState } from "react";
import Image from 'next/image'
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from 'next/router'

import Loading from '../../components/Loading';
import styles from "../../styles/Transfer.module.css"
import UserLayout from '../../components/UserLayout'
import { Search } from 'react-bootstrap-icons'
import Profpict from "../../assets/img/default-pict.png"

export default function Transfer() {
  const [title, setTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(4)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("")

  const { data } = useSelector(state => state.auth)
  const router = useRouter()

  const getUser = async () => {
    try {
      setIsLoading(true)
      const { token } = data
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const url = `${process.env.NEXT_PUBLIC_BE_HOST}/user?page=${page}&limit=${limit}`
      if(search !== ""){
        url += `&search=${search}`
      }
      const response = await axios.get(url, config)
      setUser(response.data.data)
      console.log(user)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setTitle("Transfer");
    getUser()
  }, [search])
  
  return (
    <>
      {isLoading && <Loading />}
      <UserLayout title={title}>
        <main className={styles.mainContainer}>
          <section className={styles.transferCard}>
            <div className={styles.title}>Search Receiver</div>
            <label className={styles.searchContainer}>
              <div className={styles.iconContainer}><Search className={styles.icon} /></div>
              <input type="text" placeholder='Search receiver here' 
              onChange={e => {
                setTimeout(() => {setSearch(e.target.value)}, 2000)
              }}
              />
            </label>
            <div className={styles.receiverContainer}>
              {user.map(user => (
              <div className={styles.userCard} key={user.id}
              onClick={()=> router.push(`/transfer/${user.id}`)}
              >
                <div className={styles.profPictContainer}>
                  <Image 
                  src={user.image === null ? Profpict : `${process.env.NEXT_PUBLIC_CLOUDINARY}${user.image}`} 
                  className={styles.profPict} width={'80px'} height={'80px'}/></div>
                <div className={styles.nameContainer}>
                  <div className={styles.name}>{`${user.firstName} ${user.lastName}`}</div>
                  <div className={styles.number}>{user.noTelp}</div>
                </div>
              </div>
              ))}
            </div>
          </section>
        </main>
      </UserLayout>
    </>
  )
}

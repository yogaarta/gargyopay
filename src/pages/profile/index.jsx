import React from 'react'
import { useEffect, useState } from "react";
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"


import { Pencil, ArrowRight, CheckLg } from 'react-bootstrap-icons'
import Loading from '../../components/Loading';
import styles from "../../styles/Profile.module.css"
import UserLayout from '../../components/UserLayout'
import Profpict from "../../assets/img/default-pict.png"
import { getUserDataAction } from '../../redux/actionCreators/userData';
import { logoutAction } from "../../redux/actionCreators/auth";

export default function Profile() {
  const [loading, setLoading] = useState(false)
  const [previewImg, setPreviewImg] = useState(null)
  const [image, setImage] = useState(null)
  const [isError, setIsError] = useState(null)
  const [msg, setMsg] = useState("")
  const [showLogout, setShowLogout] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()
  const { data, isLoading } = useSelector(state => state.auth)
  const { userData } = useSelector(state => state.user)

  const updateImgHandler = async () => {
    try {
      setLoading(true)
      setIsError(false)
      const { token } = data
      const body = new FormData()
      body.append('image', image)
      const config = { headers: { Authorization: `Bearer ${token}`, "content-type": "multipart/form-data" } }
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_BE_HOST}/user/image/${userData.id}`, body, config)
      console.log(response)
      setMsg(response.data.msg)
      setLoading(false)
    } catch (error) {
      setIsError(true)
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    dispatch(getUserDataAction(data.id, data.token))
  }, [msg])

  const logoutHandler = async () => {
    try {
      setLoading(true)
      const { token } = data
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BE_HOST}/auth/logout`, config)
      console.log(response)
      dispatch(logoutAction())
      setLoading(false)
      setShowLogout(false)
      router.push('/')
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (
    <>
      {loading && <Loading />}
      {isLoading && <Loading />}
      <UserLayout title={"Profile"}>
        <main className={styles.mainContainer}>
          <section className={styles.profileCard}>
            <div className={styles.profPictContainer}>
              <Image src={previewImg !== null ? previewImg :
                userData.image !== null ? `${process.env.NEXT_PUBLIC_CLOUDINARY}${userData.image}` :
                  Profpict} className={styles.profPict} width={'150px'} height={'150px'} />
            </div>
            <div className={styles.editSaveContainer}>
              <label htmlFor='pict' className={styles.editContainer}>
                <Pencil className={styles.icon} />
                <input type="file" name="pict" id="pict"
                  onChange={e => {
                    const file = e.target.files[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = () => {
                        setPreviewImg(reader.result)
                        setImage(file)
                      }
                      reader.readAsDataURL(file)
                    }
                  }} />
                <div className={styles.edit}>Edit</div>
              </label>
              {previewImg === null ?
                <></>
                :
                <div className={styles.saveChange} onClick={updateImgHandler}><CheckLg className={styles.icon} /></div>
              }
            </div>
            <div className={styles.name}>{`${userData.firstName} ${userData.lastName}`}</div>
            <div className={styles.phone}>{userData.noTelp ? userData.noTelp : 'Phone'}</div>
            <div className={styles.menuContainer}>
              <div className={styles.menu}
                onClick={() => router.push('/profile/info')}
              >
                <div className="title">Personal Information</div>
                <ArrowRight className={styles.icon} />
              </div>
              <div className={styles.menu}
              onClick={() => router.push('/profile/changepass')}
              >
                <div className="title">Change Password</div>
                <ArrowRight className={styles.icon} />
              </div>
              <div className={styles.menu}
              onClick={() => router.push('/profile/changepin')}
              >
                <div className="title">Change PIN</div>
                <ArrowRight className={styles.icon} />
              </div>
              <div className={styles.menu}
                onClick={() => setShowLogout(true)}
              >
                <div className="title">Logout</div>
                {/* <ArrowRight className={styles.icon}/> */}
              </div>
            </div>
          </section>
        </main>
      </UserLayout>
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
    </>
  )
}

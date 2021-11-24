import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useGlobalContext } from '../context'

const Avatar = ({ setPic_open }) => {
  const { user_info, setUser_info } = useGlobalContext()
  const [avatar_img, setAvatar_img] = useState(null)

  const img_convert = (img_data) => {
    const imgArr = img_data
    const reader = new FileReader()
    reader.readAsDataURL(img_data)
    reader.onload = (e) => {
      const imgData = e.target.result
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const newImg = document.createElement('img')
      newImg.setAttribute('src', imgData)
      newImg.onload = () => {
        const imgSize = (imgArr.size / (1000 * 1024)).toFixed(1)
        const actualWidth = newImg.width
        const actualHeight = newImg.height
        const imgWidth = Math.floor(
          actualWidth / (imgSize < 1 ? 1 : imgSize > 5 ? 4 : imgSize)
        )
        const imgHeight = Math.floor(
          actualHeight / (imgSize < 1 ? 1 : imgSize > 5 ? 4 : imgSize)
        )
        canvas.width = imgWidth
        canvas.height = imgHeight
        ctx.drawImage(newImg, 0, 0, imgWidth, imgHeight)
        const imgUrl = canvas.toDataURL('image/webp')
        setAvatar_img(imgUrl)
      }
    }
  }

  const inputHandle = (imgfile) => {
    img_convert(imgfile)
  }

  const change_pic = async () => {
    try {
      const data = await axios.patch('/api/user/edit/' + user_info._id, {
        avatar: avatar_img,
      })
      setUser_info(data.data.data)
      localStorage.setItem('user_ID', data.data.data._id)
      setPic_open((prev) => !prev)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAvatar = async () => {
    setAvatar_img(null)
    try {
      const data = await axios.patch('/api/user/edit/' + user_info._id, {
        avatar: '',
      })
      setUser_info(data.data.data)
      localStorage.setItem('user_ID', data.data.data._id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <motion.div
      className='modal'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 12 }}
        className='modal-content'
      >
        <div className='avatar-preview'>
          {avatar_img && (
            <img src={avatar_img} alt='' className='user-avatar' />
          )}
          {!avatar_img && user_info.avatar && (
            <img src={user_info.avatar} className='user-avatar' />
          )}
        </div>
        <ul>
          <input
            hidden
            type='file'
            id='avatar-pic'
            accept='image/*'
            onChange={(e) => inputHandle(e.target.files[0])}
          />
          {avatar_img && (
            <li className='save-avatar' onClick={() => change_pic()}>
              Save
            </li>
          )}
          <li>
            <label htmlFor='avatar-pic'>New Image</label>
          </li>
          <li onClick={() => deleteAvatar()}>Delete Image</li>
          <li onClick={() => setPic_open((prev) => !prev)}>Cancel</li>
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default Avatar

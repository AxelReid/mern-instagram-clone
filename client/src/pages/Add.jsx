import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'

const Add = () => {
  const {
    SendIcon,
    UploadIcon,
    user_ID,
    setUser_info,
    user_info,
    handleAlert,
  } = useGlobalContext()
  const [post_caption, setPost_caption] = useState('')
  const [post_img, setPost_img] = useState(null)

  // img compress and convert to base64
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
        setPost_img(imgUrl)
      }
    }
  }

  const handleImg_upload = async (e) => {
    img_convert(e.target.files[0])
  }

  const createPost = () => {
    const postInfo = {
      id: new Date().getTime(),
      img: post_img,
      caption: post_caption,
      likes: [],
      comments: [],
      date: new Date().toLocaleString(),
    }
    const addthis = [...user_info.posts, postInfo]
    handleAlert([true, 'creating...'])
    try {
      setTimeout(async () => {
        await axios.patch('/api/posts/create/' + user_ID, addthis)
        setUser_info((prev) => {
          return { ...prev, posts: addthis }
        })
        handleAlert([false, 'new post created!', 'success'])
        setPost_caption('')
        setPost_img(null)
      }, 1000)
    } catch (error) {
      console.log(error)
      handleAlert([false, 'somthing went wrong!', 'error'])
    }
  }

  return (
    <div className='container'>
      <article className='post'>
        <div className='post-header'>
          <div className='post-header-left'>
            <div className='avatar-circle'>
              {user_info && user_info.avatar && (
                <img src={user_info.avatar} className='user-avatar' />
              )}
            </div>
            <p>mern_stack_boy</p>
          </div>
        </div>
        <div className='upload-img'>
          {post_img && <img src={post_img} />}
          <center className={post_img ? 'has' : ''}>
            <i>
              <UploadIcon />
            </i>
            <h4>Drag & Drop your image here</h4>
            <h3>OR</h3>
            <label className='button styled' htmlFor='browseImg'>
              Choose img
            </label>
            <input
              hidden
              id='browseImg'
              type='file'
              accept='image/*'
              onChange={(e) => handleImg_upload(e)}
            />
          </center>
        </div>
        <section>
          <div className='post-caption-action'>
            <h4>
              Post Caption
              <i>
                <SendIcon />
              </i>
            </h4>
            <p className='txt-length'>{post_caption.length}/500</p>
          </div>
          <textarea
            value={post_caption}
            onChange={(e) => setPost_caption(e.target.value)}
            placeholder='Write a caption'
            maxLength='500'
          ></textarea>
          <div className='submit-post'>
            <button
              className='styled'
              onClick={() => setPost_caption('')}
              disabled={post_caption ? false : true}
            >
              Reset
            </button>
            <button
              className='styled'
              disabled={post_caption && post_img ? false : true}
              onClick={() => createPost()}
            >
              Create a post
            </button>
          </div>
        </section>
      </article>
    </div>
  )
}

export default Add

import axios from 'axios'
import React, { useState } from 'react'
import { useGlobalContext } from '../context'

const Add = () => {
  const { SendIcon, UploadIcon, user_ID, setUser_info, user_info } =
    useGlobalContext()
  const [post_caption, setPost_caption] = useState('')

  const createPost = async () => {
    const postInfo = {
      id: new Date().getTime(),
      img: '',
      caption: post_caption,
      date: new Date().toLocaleDateString(),
    }
    const addthis = [...user_info.posts, postInfo]
    try {
      await axios.patch('/api/posts/create/' + user_ID, addthis)
      setUser_info((prev) => {
        return { ...prev, posts: addthis }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <article className='post'>
        <div className='post-header'>
          <div className='avatar-circle'></div>
          <p>mern_stack_boy</p>
        </div>
        <div className='upload-img'>
          <center>
            <i>
              <UploadIcon />
            </i>
            <h4>Drag & Drop your image here</h4>
            <h3>OR</h3>
            <label className='button styled' htmlFor='browseImg'>
              Choose img
            </label>
            <input hidden id='browseImg' type='file' />
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
              disabled={post_caption ? false : true}
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

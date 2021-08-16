import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import { motion, AnimatePresence } from 'framer-motion'

const Post = ({ img, user, likes, caption, date }) => {
  const { SendIcon, Heart, ChatIcon, SmileIcon, Heart_filled, user_info } =
    useGlobalContext()
  const [txt_expand, setTxt_expand] = useState(false)
  const [heart_leap, setHeart_leap] = useState(false)
  const [liked, setLiked] = useState(false)

  const [comment, setComment] = useState('')

  useEffect(() => {
    const wait = setTimeout(() => {
      setHeart_leap(false)
    }, 1000)
    return () => clearTimeout(wait)
  }, [heart_leap])
  // double click to give like
  const handleGiveLike = () => {
    setHeart_leap(true)
    setLiked(true)
  }
  // click on the heart to toggle like
  const toggleLike = () => {
    setLiked((prev) => !prev)
  }
  // write and submit comment
  const submitComment = () => {
    const trmc = comment.trim()
    console.log(user_info)
  }
  return (
    <article className='post'>
      <div className='post-header'>
        <div className='avatar-circle'></div>
        <p>{user}</p>
      </div>
      <div className='upload-img' onDoubleClick={() => handleGiveLike()}>
        <AnimatePresence>
          {heart_leap && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 170 }}
              className='double-click-heart'
            >
              <Heart_filled />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <section className='no-pad-b'>
        <div className='post-action'>
          <i className={liked ? 'liked' : ''} onClick={() => toggleLike()}>
            {liked ? <Heart_filled /> : <Heart />}
          </i>
          <i>
            <ChatIcon />
          </i>
          <i>
            <SendIcon />
          </i>
        </div>
        <div className='post-info'>
          <h4 className='post-likes'>{likes} likes</h4>
          <p className='post-caption'>
            <b>{user}</b>{' '}
            {!txt_expand ? (
              caption.length > 100 ? (
                <>
                  {caption.substring(0, 100)}{' '}
                  <span onClick={() => setTxt_expand(true)}>...more</span>
                </>
              ) : (
                caption
              )
            ) : (
              caption
            )}
          </p>
          <p className='show-all-comments'>View all {likes} comments</p>
          <p className='a-comment'>
            <b>donix </b> Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Totam, sint.
          </p>
          <p className='post-date'>{date}</p>
        </div>
      </section>
      <div className='write-comment'>
        <i>
          <SmileIcon />
        </i>
        <input
          type='text'
          placeholder='Add a comment...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className='link'
          disabled={!comment ? true : false}
          onClick={() => submitComment()}
        >
          Post
        </button>
      </div>
    </article>
  )
}

export default Post

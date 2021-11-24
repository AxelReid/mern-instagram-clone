import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const Post = ({ post, myself, dropPost, setViewPost, user_ID }) => {
  const { id: postID, img, caption, date, likes, comments } = post
  const {
    SendIcon,
    Heart,
    ChatIcon,
    SmileIcon,
    Heart_filled,
    user_info,
    setUser_info,
    Dots,
    Trash,
    Edit,
    handleAlert,
  } = useGlobalContext()
  const [txt_expand, setTxt_expand] = useState(false)
  const [heart_leap, setHeart_leap] = useState(false)
  const [liked, setLiked] = useState(false)
  const [comment, setComment] = useState('')
  const [got_comments, setGot_comments] = useState([])
  const [showAll_comments, setShowAll_comments] = useState(false)

  useEffect(() => {
    setGot_comments(comments)
  }, [])

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
  const submitComment = async () => {
    const trmc = comment.trim()
    const acomment = {
      post_ID: postID,
      name: user_info.username,
      comment: trmc,
      date: new Date().toLocaleString(),
    }
    const acomment2 = {
      name: user_info.username,
      comment: trmc,
      date: new Date().toLocaleString(),
    }
    try {
      await axios.patch('/api/posts/comments/add/' + user_ID, acomment)
      setGot_comments((prev) => [...prev, acomment2])
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }
  const deletePost = () => {
    handleAlert([true, 'Deleting...'])
    const newPosts = user_info.posts.filter((tpost) => tpost.id !== postID)
    try {
      setTimeout(async () => {
        await axios.patch('/api/posts/create/' + user_info._id, newPosts)
        setUser_info((prev) => {
          return { ...prev, posts: newPosts }
        })
        setViewPost(null)
        handleAlert([false, 'deleted successfully!', 'success'])
      }, [1000])
    } catch (err) {
      console.log(err)
      handleAlert([false, 'Something went wrong!', 'error'])
    }
  }

  return (
    <article className='post'>
      <div className='post-header'>
        <div className='post-header-left'>
          <div className='avatar-circle'>
            {user_info.avatar && (
              <img src={user_info.avatar} alt='' className='user-avatar' />
            )}
          </div>
          <p>{user_info.username}</p>
        </div>

        {myself && (
          <>
            <i data-dots='dots' className='post-header-dots'>
              <Dots />
            </i>
            <AnimatePresence>
              {dropPost && (
                <motion.ul
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className='post-dropdown'
                >
                  <li>
                    <i>
                      <Edit />
                    </i>
                    Edit
                  </li>
                  <li onClick={() => deletePost()}>
                    <Trash />
                    Delete
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
      <div className='upload-img' onDoubleClick={() => handleGiveLike()}>
        <img src={img} />
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
          <h4 className='post-likes'>{likes.length} likes</h4>
          <p className='post-caption'>
            <b>{user_info.username}</b>{' '}
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
          <p
            className='show-all-comments'
            onClick={() => setShowAll_comments(true)}
          >
            {!showAll_comments && got_comments.length > 3 && 'View all'}{' '}
            {got_comments.length} comments
          </p>
          <div className='post-comments'>
            {got_comments &&
              got_comments
                .slice(
                  showAll_comments ? 0 : got_comments.length - 3,
                  got_comments.length
                )
                .sort((a, b) => {
                  return new Date(b.date) - new Date(a.date)
                })
                .map((comment, i) => (
                  <p key={i} className='a-comment'>
                    <b>{comment.name}</b> {comment.comment}
                  </p>
                ))}
          </div>
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

import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
import Post from './Post'

const Profile = ({ got_user, myself }) => {
  const { PostsIcon, Skeleton, Heart, ChatIcon, CheckMark } = useGlobalContext()
  const [followed, setFollowed] = useState(false)
  const [view_post, setViewPost] = useState(null)
  const [dropPost, setDropPost] = useState(false)

  const giveFollow = () => {
    setFollowed((prev) => !prev)
  }

  const postClick = (viewing_post) => {
    setViewPost(viewing_post)
  }

  document.body.onclick = (e) => {
    const { close, dots } = e.target.dataset
    if (close) setViewPost(null)
    if (dots) setDropPost(true)
    if (dropPost) {
      setDropPost(false)
    }
  }

  return (
    <div className='container'>
      <AnimatePresence>
        {view_post && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className='viewing_post'
            data-close={true}
          >
            <Post
              user_ID={got_user._id}
              post={view_post}
              myself={myself}
              dropPost={dropPost}
              setViewPost={setViewPost}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {got_user ? (
        <section className='profile-info'>
          <div className='p-img'>
            <div>
              {got_user.avatar && (
                <img src={got_user.avatar} className='user-avatar' />
              )}
            </div>
          </div>
          <div className='p-right'>
            <div className='p-title'>
              <h1>{got_user.username}</h1>
              {myself === true ? (
                <Link className='styled white' to='/account/edit'>
                  Edit profile
                </Link>
              ) : (
                <button
                  onClick={() => giveFollow()}
                  className={followed ? 'styled white' : `styled`}
                >
                  {followed ? (
                    <>
                      following{' '}
                      <i className='checkmark'>
                        <CheckMark />
                      </i>
                    </>
                  ) : (
                    'follow'
                  )}
                </button>
              )}
            </div>
            <div className='p-tags'>
              <p>
                <b>{got_user.posts ? got_user.posts.length : 0} </b>post
              </p>
              <p>
                <b>{got_user.followers ? got_user.followers.length : 0} </b>
                followers
              </p>
              <p>
                <b>{got_user.following ? got_user.following.length : 0} </b>
                following
              </p>
            </div>
            <div className='p-desc'>
              <b>{got_user.fullname}</b>
              <p>{got_user.bio}</p>
            </div>
          </div>
        </section>
      ) : (
        <>
          <div className='profile-info'>
            <div className='p-img'>
              <Skeleton variant='circle' width={150} height={150} />
            </div>
            <div className='p-right'>
              <Skeleton variant='text' width={350} />
              <br />
              <Skeleton variant='text' width={300} />
              <br />
              <Skeleton variant='text' width={400} />
            </div>
          </div>
        </>
      )}
      <section className='posts-content'>
        <div className='content-header'>
          <p>
            <PostsIcon />
            <span>Posts</span>
          </p>
        </div>
        <div className='my-posts'>
          {got_user &&
            got_user.posts
              .sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
              })
              .map((info) => (
                <div
                  key={info.id}
                  className='my-post'
                  onClick={() => postClick(info)}
                >
                  <img src={info.img} alt='' />
                  <div className='my-post-review'>
                    <p>
                      0<Heart />
                    </p>
                    <p>
                      0<ChatIcon />
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </section>
    </div>
  )
}

export default Profile

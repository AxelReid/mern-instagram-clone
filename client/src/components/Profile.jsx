import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'

const Profile = ({ got_user, myself }) => {
  const { PostsIcon, Skeleton, Heart, ChatIcon, CheckMark } = useGlobalContext()
  const [followed, setFollowed] = useState(false)
  const giveFollow = () => {
    setFollowed((prev) => !prev)
  }

  return (
    <div className='container'>
      {got_user ? (
        <section className='profile-info'>
          <div className='p-img'>
            <div></div>
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
            got_user.posts.map((info) => (
              <div key={info.id} className='my-post'>
                <img src='' alt='' />
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

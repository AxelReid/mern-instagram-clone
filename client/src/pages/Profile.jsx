import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'

const Profile = () => {
  const { user_info, PostsIcon } = useGlobalContext()
  const { fullname, username, bio, posts, followers, following } = user_info
  return (
    <div className='container'>
      <section className='profile-info'>
        <div className='p-img'>
          <div></div>
        </div>
        <div className='p-right'>
          <div className='p-title'>
            <h1>{username}</h1>
            <button>
              <Link to='/account/edit'>Edit profile</Link>
            </button>
          </div>
          <div className='p-tags'>
            <p>
              <b>{posts && posts.length} </b>post
            </p>
            <p>
              <b>{posts && followers.length} </b>followers
            </p>
            <p>
              <b>{following && following.length} </b>following
            </p>
          </div>
          <div className='p-desc'>
            <b>{fullname && fullname}</b>
            <p>{bio && bio}</p>
          </div>
        </div>
      </section>
      <section className='posts-content'>
        <div className='content-header'>
          <p>
            <PostsIcon />
            <span>Posts</span>
          </p>
        </div>
      </section>
    </div>
  )
}

export default Profile

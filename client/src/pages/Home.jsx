import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Post from '../components/Post'
import { useGlobalContext } from '../context'

const Home = () => {
  const { user_info, allUsers } = useGlobalContext()
  const [sugg_Show, setSugg_Show] = useState(
    window.innerWidth > 970 ? true : false
  )
  window.onresize = (e) => {
    setSugg_Show(e.target.innerWidth > 970 ? true : false)
  }
  return (
    user_info && (
      <div className='container home-page'>
        <div>
          {user_info.posts.map((post) => (
            <Post
              key={post.id}
              img={post.img}
              user={user_info.username}
              likes='0'
              caption={post.caption}
              date={post.date}
            />
          ))}
        </div>
        {sugg_Show && (
          <div className='suggestions'>
            <div className='an-account'>
              <Link
                to={`/profile/${user_info.username}`}
                className='avatar'
              ></Link>
              <div className='a-info'>
                <Link
                  className='visit-user'
                  to={`/profile/${user_info.username}`}
                >
                  {user_info.username}
                </Link>
                <p>{user_info.fullname}</p>
              </div>
            </div>
            <div className='s-header'>
              <p>Suggestions for you</p>
              <h4>See all</h4>
            </div>
            <div className='suggested-users'>
              {allUsers
                ? allUsers.map((auser, index) => {
                    if (auser._id !== user_info._id) {
                      return (
                        <div key={index} className='an-account'>
                          <div className='c-c'>
                            <Link
                              to={`/user/visit/${auser.username}`}
                              className='avatar'
                            ></Link>
                            <div className='a-info'>
                              <Link
                                className='visit-user'
                                to={`/user/visit/${auser.username}`}
                              >
                                {auser.username}
                              </Link>
                              <p>{auser.fullname}</p>
                            </div>
                          </div>
                          <button className='link'>follow</button>
                        </div>
                      )
                    }
                  })
                : 'loading...'}
            </div>
            <footer className='copyright'>
              <p>
                &copy; {new Date().getFullYear()} instagram clone from Axel
                Reid.
              </p>
            </footer>
          </div>
        )}{' '}
      </div>
    )
  )
}

export default Home

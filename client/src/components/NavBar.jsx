import React, { useState } from 'react'
import { useGlobalContext } from '../context'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Nav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const {
    Instagram,
    HomeIcon,
    SearchIcon,
    UserIcon,
    CogIcon,
    user_info,
    PlusIcon,
  } = useGlobalContext()

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_ID')
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  document.body.onclick = (e) => {
    setDropdownOpen(e.target.dataset.item === 'avatar-open-btn' ? true : false)
  }

  return (
    <header className='nav-bar'>
      <div className='container'>
        <i className='insta'>
          <Instagram />
        </i>
        <div className='search-div'>
          <SearchIcon />
          <input type='text' placeholder='Search' />
        </div>
        <nav>
          <i className='search-icon'>
            <HomeIcon />
          </i>
          <i>
            <PlusIcon />
          </i>
          <i className={`avatar ${dropdownOpen}`} data-item='avatar-open-btn'>
            <div></div>
          </i>
        </nav>
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: 'just' }}
              className='profile-dropdown'
            >
              <div className='span'></div>
              <Link to={'/profile/' + user_info.username}>
                <span>
                  <UserIcon />
                </span>
                profile
              </Link>
              <Link to='/account/edit'>
                <span>
                  <CogIcon />
                </span>
                setting
              </Link>
              <p onClick={() => logout()}>logout</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Nav

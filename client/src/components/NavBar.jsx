import React from 'react'
import { useGlobalContext } from '../context'

const Nav = () => {
  const { Instagram, HomeIcon, SearchIcon } = useGlobalContext()
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
          <i className='avatar'>
            <div></div>
          </i>
        </nav>
      </div>
    </header>
  )
}

export default Nav

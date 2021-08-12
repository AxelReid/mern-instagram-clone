import React, { createContext, useContext, useEffect, useState } from 'react'
import logo from './assets/logo.png'
import instagram from './assets/txt_logo.png'
import spin from './assets/spin.gif'
import { Link } from 'react-router-dom'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const Logo = () => <img src={logo} alt='' />
  const Instagram = () => <img src={instagram} alt='' />
  const Spin = () => <img className='spin' src={spin} alt='' />
  const Heart_filled = () => <ion-icon name='heart'></ion-icon>
  const Heart = () => <ion-icon name='heart-outline'></ion-icon>
  const ChatIcon = () => <ion-icon name='chatbubble-outline'></ion-icon>
  const HomeIcon = () => (
    <Link to='/'>
      <ion-icon name='home-sharp'></ion-icon>
    </Link>
  )
  const SearchIcon = () => <ion-icon name='search-outline'></ion-icon>
  const Google = () => <ion-icon name='logo-google'></ion-icon>
  const UserIcon = () => <ion-icon name='person-circle-outline'></ion-icon>
  const CogIcon = () => <ion-icon name='cog-outline'></ion-icon>
  const PostsIcon = () => <ion-icon name='apps-outline'></ion-icon>
  const PlusIcon = () => <ion-icon name='duplicate-outline'></ion-icon>

  const token = localStorage.getItem('user_ID')
  // Switch register, login
  const [goLog, setGoLog] = useState(token ? true : false)
  // is user has an account
  const [isUser, setIsUser] = useState(token ? true : false)
  // user info
  const [user_info, setUser_info] = useState([])

  return (
    <AppContext.Provider
      value={{
        Logo,
        Instagram,
        Spin,
        Heart_filled,
        Heart,
        ChatIcon,
        HomeIcon,
        SearchIcon,
        Google,
        goLog,
        setGoLog,
        UserIcon,
        CogIcon,
        PostsIcon,
        PlusIcon,

        token,
        isUser,
        user_info,
        setUser_info,
        setIsUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

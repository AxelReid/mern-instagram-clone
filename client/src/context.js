import React, { createContext, useContext, useEffect, useState } from 'react'
import logo from './assets/logo.png'
import instagram from './assets/txt_logo.png'
import spin from './assets/spin.gif'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const Logo = () => <img src={logo} alt='' />
  const Instagram = () => <img src={instagram} alt='' />
  const Spin = () => <img className='spin' src={spin} alt='' />
  const Heart_filled = () => <ion-icon name='heart'></ion-icon>
  const Heart = () => <ion-icon name='heart-outline'></ion-icon>
  const ChatIcon = () => <ion-icon name='chatbubble-outline'></ion-icon>
  const HomeIcon = () => <ion-icon name='home-sharp'></ion-icon>
  const SearchIcon = () => <ion-icon name='search-outline'></ion-icon>
  const Google = () => <ion-icon name='logo-google'></ion-icon>
  // Switch register, login
  const [goLog, setGoLog] = useState(false)
  // is user has an account
  const [isUser, setIsUser] = useState(
    localStorage.getItem('auth_token') ? true : false
  )

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
        isUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

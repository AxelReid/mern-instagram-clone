import React, { createContext, useContext, useEffect, useState } from 'react'
import logo from './assets/logo.png'
import instagram from './assets/txt_logo.png'
import spin from './assets/spin.gif'
import { Link } from 'react-router-dom'
import { Skeleton } from '@material-ui/lab'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const HomeIcon = () => (
    <Link to='/'>
      <ion-icon name='home-sharp'></ion-icon>
    </Link>
  )
  const PlusIcon = () => (
    <Link to='/new-post/edit'>
      <ion-icon name='add-circle-outline'></ion-icon>
    </Link>
  )
  const Logo = () => <img src={logo} alt='' />
  const Instagram = () => <img src={instagram} alt='' />
  const Spin = () => <img className='spin' src={spin} alt='' />

  const Heart_filled = () => <ion-icon name='heart'></ion-icon>
  const Heart = () => <ion-icon name='heart-outline'></ion-icon>
  const ChatIcon = () => <ion-icon name='chatbubble-outline'></ion-icon>
  const SearchIcon = () => <ion-icon name='search-outline'></ion-icon>
  const Google = () => <ion-icon name='logo-google'></ion-icon>
  const UserIcon = () => <ion-icon name='person-circle-outline'></ion-icon>
  const CogIcon = () => <ion-icon name='cog-outline'></ion-icon>
  const PostsIcon = () => <ion-icon name='apps-outline'></ion-icon>
  const SendIcon = () => <ion-icon name='paper-plane-outline'></ion-icon>
  const UploadIcon = () => <ion-icon name='cloud-upload-outline'></ion-icon>
  const SmileIcon = () => <ion-icon name='happy-outline'></ion-icon>
  const CheckMark = () => <ion-icon name='checkmark-outline'></ion-icon>

  const user_ID = localStorage.getItem('user_ID')
  // Switch register, login
  const [goLog, setGoLog] = useState(user_ID ? true : false)
  // is user has an account
  const [isUser, setIsUser] = useState(user_ID ? true : false)
  // user info
  const [user_info, setUser_info] = useState(null)
  // all users
  const [allUsers, setallUsers] = useState([])

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
        UserIcon,
        CogIcon,
        PostsIcon,
        PlusIcon,
        SendIcon,
        UploadIcon,
        SmileIcon,
        CheckMark,

        user_ID,
        isUser,
        user_info,
        goLog,
        allUsers,
        setallUsers,
        setGoLog,
        setUser_info,
        setIsUser,

        Skeleton,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

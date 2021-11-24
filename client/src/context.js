import React, { createContext, useContext, useState } from 'react'
import logo from './assets/logo.png'
import instagram from './assets/txt_logo.png'
import spin from './assets/spin.gif'
import { Link } from 'react-router-dom'
import { Skeleton } from '@material-ui/lab'
import axios from 'axios'

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
  const Spin = (props) => (
    <img className={`spin ${Object.keys(props)[0]}`} src={spin} alt='' />
  )

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
  const Dots = () => <ion-icon name='ellipsis-vertical-outline'></ion-icon>
  const Trash = () => <ion-icon name='trash-outline'></ion-icon>
  const Edit = () => <ion-icon name='create-outline'></ion-icon>
  const CheckmarkDone = () => (
    <ion-icon name='checkmark-done-outline'></ion-icon>
  )

  const [alert_props, setalert_props] = useState({
    open: false,
    mssg: '',
    status: '',
  })
  const handleAlert = (props) => {
    if (props[0] === true) {
      setalert_props({ open: true, mssg: props[1], status: '' })
    }
    if (props[0] === false) {
      setalert_props({ open: true, mssg: props[1], status: props[2] })
      const wait = setTimeout(() => {
        setalert_props({ open: false, mssg: '', status: '' })
      }, 1500)
      return () => clearTimeout(wait)
    }
  }

  const user_ID = localStorage.getItem('user_ID')
  // Switch register, login
  const [goLog, setGoLog] = useState(user_ID ? true : false)
  // is user has an account
  const [isUser, setIsUser] = useState(user_ID ? true : false)
  // user info
  const [user_info, setUser_info] = useState(null)
  // all users
  const [allUsers, setallUsers] = useState([])
  // fetch all users
  const fetch_allUsers = async () => {
    try {
      const users = await axios.get('/api/user/all')
      setallUsers(users.data)
    } catch (error) {
      console.log(error)
    }
  }

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
        Dots,
        Trash,
        Edit,
        CheckmarkDone,

        user_ID,
        isUser,
        user_info,
        goLog,
        allUsers,
        alert_props,
        setalert_props,
        handleAlert,
        setallUsers,
        setGoLog,
        setUser_info,
        setIsUser,
        fetch_allUsers,

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

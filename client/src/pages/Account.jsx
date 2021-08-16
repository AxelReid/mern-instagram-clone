import React from 'react'
import Profile from '../components/Profile'
import { useGlobalContext } from '../context'

const Account = () => {
  const { user_info } = useGlobalContext()
  return <Profile got_user={user_info} myself={true} />
}

export default Account

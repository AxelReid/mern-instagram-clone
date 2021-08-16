import React, { useEffect, useState } from 'react'
import Profile from '../components/Profile'
import { useGlobalContext } from '../context'

const User = ({ match }) => {
  const { id: user_name } = match.params
  const { allUsers } = useGlobalContext()
  const [theUser, setTheUser] = useState(null)
  useEffect(() => {
    if (allUsers) {
      const gotUser = allUsers.find((allu) => allu.username === user_name)
      setTheUser(gotUser)
    }
  }, [])
  if (!theUser) return <div className='container'>User not found</div>
  return <Profile got_user={theUser} myself={false} />
}

export default User

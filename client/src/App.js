import './styles/App.scss'
import { Route, Switch, useLocation } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import NavBar from './components/NavBar'
import { useGlobalContext } from './context'
import { useEffect, useState } from 'react'
import Edit from './pages/Edit'
import axios from 'axios'

function App() {
  const location = useLocation()
  const { goLog, isUser, Logo, setIsUser, setUser_info, token } =
    useGlobalContext()
  const [pageLoading, setPageLoading] = useState(true)

  const fetch_user = async () => {
    if (isUser) {
      try {
        if (!token) return
        const user = await axios.get('/api/user/all/' + token)
        setIsUser(true)
        setUser_info(user.data)
      } catch (error) {
        console.log(error)
        setIsUser(true)
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_ID')
      }
    }
  }

  window.onload = () => {
    setPageLoading(false)
  }
  useEffect(() => {
    fetch_user()
  }, [])
  if (pageLoading) {
    return (
      <div className='page-loading'>
        <Logo />
      </div>
    )
  } else {
    return (
      <main>
        {isUser ? (
          <>
            <NavBar />
            <Switch location={location} key={location.pathname}>
              <Route exact path='/' component={Home} />
              <Route exact path='/profile/:id' component={Profile} />
              <Route exact path='/account/edit' component={Edit} />
            </Switch>
          </>
        ) : (
          <>{goLog ? <Login /> : <Register />}</>
        )}
      </main>
    )
  }
}

export default App

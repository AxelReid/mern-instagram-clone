import './styles/App.scss'
import { Route, Switch, useLocation } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Account from './pages/Account'
import NavBar from './components/NavBar'
import { useGlobalContext } from './context'
import { useEffect, useState } from 'react'
import Edit from './pages/Edit'
import axios from 'axios'
import Add from './pages/Add'
import User from './pages/User'
import Alert from './components/Alart'

function App() {
  const location = useLocation()
  const {
    goLog,
    isUser,
    Logo,
    setIsUser,
    setUser_info,
    user_ID,
    fetch_allUsers,
    alert_props,
  } = useGlobalContext()
  const [pageLoading, setPageLoading] = useState(true)

  window.onload = () => {
    setPageLoading(false)
  }

  const fetch_user = async () => {
    if (isUser) {
      try {
        if (user_ID) {
          const user = await axios.get('/api/user/all/' + user_ID)
          setIsUser(true)
          setUser_info(user.data)
        } else {
          setIsUser(false)
          localStorage.removeItem('auth_token')
          localStorage.removeItem('user_ID')
          window.location.pathname = '/'
        }
      } catch (error) {
        console.log(error)
        setIsUser(false)
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_ID')
        window.location.pathname = '/'
      }
    }
  }

  const fetch_posts = async () => {
    try {
      const posts = await axios.get('/api/posts/all/' + user_ID)
      setUser_info((prev) => {
        return { posts: posts.data, ...prev }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch_user()
    if (user_ID) {
      fetch_posts()
      fetch_allUsers()
    }
  }, [])

  if (pageLoading) {
    return (
      <div className='page-loading'>
        <Logo />
      </div>
    )
  } else {
    return (
      <main className='body'>
        {isUser ? (
          <>
            {alert_props.open && <Alert />}
            <NavBar />
            <Switch location={location} key={location.pathname}>
              <Route exact path='/' component={Home} />
              <Route exact path='/profile/:id' component={Account} />
              <Route exact path='/account/edit' component={Edit} />
              <Route exact path='/new-post/edit' component={Add} />
              <Route exact path='/user/visit/:id' component={User} />
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

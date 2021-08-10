import './styles/App.scss'
import { Route, Switch, useLocation } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import NavBar from './components/NavBar'
import { useGlobalContext } from './context'

function App() {
  const logged = false
  const location = useLocation()
  const { goLog } = useGlobalContext()
  return (
    <main>
      {logged ? (
        <>
          <NavBar />
          <Switch location={location} key={location.pathname}>
            <Route exact path='/' component={Home} />
            {/* <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} /> */}
            <Route exact path='/axel-reid' component={Profile} />
          </Switch>
        </>
      ) : (
        <>{goLog ? <Login /> : <Register />}</>
      )}
    </main>
  )
}

export default App

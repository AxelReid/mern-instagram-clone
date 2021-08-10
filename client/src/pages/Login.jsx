import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'

const Login = () => {
  const { Instagram, Google, setGoLog } = useGlobalContext()
  const [info, setInfo] = useState({ username: '', password: '' })
  const [isValid, setValid] = useState(false)
  // send info to api
  const formSubmit = (e) => {
    e.preventDefault()
    if (!isValid) return
    console.log(info)
  }
  // handle values
  const handleInput = ({ name, value }) => {
    setInfo((prev) => {
      return { ...prev, [name]: value }
    })
  }
  // constant checkout
  useEffect(() => {
    const validInput = Object.entries(info).find(
      (e) => e[1].length < 3 || e[1].length > 10
    )
    setValid(!validInput ? true : false)
  }, [info])

  return (
    <div className='register'>
      <div className='register-center'>
        <nav>
          <i className='logo login'>
            <Instagram />
          </i>
          <form onSubmit={formSubmit}>
            <input
              name='username'
              type='text'
              placeholder='Username'
              value={info.username}
              onChange={(e) => handleInput(e.target)}
            />
            <input
              name='password'
              type='text'
              placeholder='Password'
              value={info.password}
              onChange={(e) => handleInput(e.target)}
            />
            <button disabled={!isValid ? true : false}>Sign up</button>
          </form>
          <div className='divider'>
            <span></span>
            <h2>OR</h2>
            <span></span>
          </div>
        </nav>
        <div className='login-option login'>
          <Google />
          &nbsp;
          <span>Login in with google</span>
        </div>
      </div>
      <div className='go-login'>
        <p>Don't have an account?</p>&nbsp;
        <span onClick={() => setGoLog(false)}>Sign up</span>
      </div>
    </div>
  )
}

export default Login

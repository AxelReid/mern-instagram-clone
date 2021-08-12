import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import axios from 'axios'

const Login = () => {
  const { Instagram, Google, setGoLog, Spin } = useGlobalContext()
  const [info, setInfo] = useState({ username: '', password: '' })
  const [isValid, setValid] = useState(false)
  const [message, setMessage] = useState({ msg: null, status: null })
  const [loading, setLoading] = useState(false)
  // clear message
  useEffect(() => {
    const wait = setTimeout(() => {
      setMessage({ msg: null, status: null })
    }, 3000)
    return () => clearTimeout(wait)
  }, [message.msg])
  // send info to api
  const formSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    if (!isValid) return
    try {
      const data = await axios.post('/api/user/login', info)
      const token = data.headers.auth_token
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user_ID', data.data.id)
      setMessage({ msg: data.data.msg, status: data.status })
      setLoading(false)
      window.location.reload()
    } catch (error) {
      setMessage({ msg: error.response.data, status: error.response.status })
      setLoading(false)
    }
  }
  // handle values
  const handleInput = ({ name, value }) => {
    setInfo((prev) => {
      return { ...prev, [name]: value.trim().toLowerCase().replace(/\s/g, '') }
    })
  }
  // constant checkout
  useEffect(() => {
    const validInput = Object.entries(info).find(
      (e) =>
        e[1].trim().toLowerCase().replace(/\s/g, '').length < 3 ||
        e[1].trim().toLowerCase().replace(/\s/g, '').length > 30
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
              type='password'
              placeholder='Password'
              value={info.password}
              onChange={(e) => handleInput(e.target)}
            />
            {loading ? (
              <button className='spin-btn' disabled>
                <Spin />
              </button>
            ) : (
              <button disabled={!isValid ? true : false}>Login</button>
            )}
          </form>
          {message.msg && (
            <p
              className={`alert ${
                message.status === 200 || (message.status === 201 && 'success')
              }`}
            >
              {message.msg}
            </p>
          )}
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

import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context'
import axios from 'axios'

const Register = () => {
  const { Instagram, Google, setGoLog, Spin } = useGlobalContext()
  const [info, setInfo] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
  })
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
      const data = await axios.post('/api/user/register', info)
      const token = data.headers.auth_token
      localStorage.setItem('auth_token', token)
      localStorage.setItem('user_ID', data.data.data._id)
      setMessage({ msg: data.data.msg, status: data.data.status })
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
      return {
        ...prev,
        [name]:
          name !== 'fullname'
            ? value.trim().toLowerCase().replace(/\s/g, '')
            : value.trim(),
      }
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
          <i className='logo'>
            <Instagram />
          </i>
          <h2 className='title'>
            Sign up to see photos and videos from your friends
          </h2>
          <div className='login-option'>
            <Google />
            &nbsp;
            <span>Login in with google</span>
          </div>
          <div className='divider'>
            <span></span>
            <h2>OR</h2>
            <span></span>
          </div>
        </nav>
        <form onSubmit={formSubmit}>
          <input
            name='fullname'
            type='text'
            placeholder='Fullname'
            onChange={(e) => handleInput(e.target)}
          />
          <input
            name='email'
            type='email'
            placeholder='Email'
            onChange={(e) => handleInput(e.target)}
            required
          />
          <input
            name='username'
            type='text'
            placeholder='Username'
            onChange={(e) => handleInput(e.target)}
          />
          <input
            name='password'
            type='password'
            placeholder='Password'
            onChange={(e) => handleInput(e.target)}
          />
          {loading ? (
            <button className='spin-btn' disabled>
              <Spin />
            </button>
          ) : (
            <button disabled={!isValid ? true : false}>Sign up</button>
          )}
        </form>
        {message.msg && (
          <p
            className={`alert-register ${
              message.status === 200 || (message.status === 201 && 'success')
            }`}
          >
            {message.msg}
          </p>
        )}
        <p className='warn'>
          By signing up, you agree to our <b>Terms</b> , <b>Data Policy</b>
          &nbsp; and&nbsp;
          <b>Cookies Policy</b> .
        </p>
      </div>
      <div className='go-login'>
        <p>Have an account?</p>&nbsp;
        <span onClick={() => setGoLog(true)}>Log in</span>
      </div>
    </div>
  )
}

export default Register

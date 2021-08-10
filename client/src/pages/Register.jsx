import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context'

const Register = () => {
  const { Instagram, Google, setGoLog } = useGlobalContext()
  const [info, setInfo] = useState({ email: '', username: '', password: '' })
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
      (e) => e[1].length < 3 || e[1].length > 30
    )
    console.log(info)
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
            type='text'
            placeholder='Password'
            onChange={(e) => handleInput(e.target)}
          />
          <button disabled={!isValid ? true : false}>Sign up</button>
        </form>
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

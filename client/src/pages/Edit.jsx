import axios from 'axios'
import React, { useState } from 'react'
import { useGlobalContext } from '../context'

const Edit = () => {
  const { user_info, setUser_info, Spin } = useGlobalContext()
  const { fullname, username, bio, posts, followers, following } = user_info
  const tabs = ['edit profile', 'change password']
  const [tab_num, setTab_num] = useState(1)
  const [loading, setLoading] = useState(false)

  const tabChange = (tab) => {
    setTab_num(tab)
  }

  const formSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const fullname = e.target.childNodes[1].childNodes[1].childNodes[0].value
    const username = e.target.childNodes[2].childNodes[1].childNodes[0].value
    const bio = e.target.childNodes[3].childNodes[1].childNodes[0].value
    const edited = { fullname, username, bio }
    try {
      const data = await axios.patch('/api/user/edit/' + user_info._id, edited)
      setUser_info(data.data.data)
      localStorage.setItem('user_ID', data.data.data._id)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const changePass = async (e) => {
    setLoading(true)
    e.preventDefault()
    const old_password =
      e.target.childNodes[1].childNodes[1].childNodes[0].value
    const new_password =
      e.target.childNodes[2].childNodes[1].childNodes[0].value
    const confirm_pass =
      e.target.childNodes[3].childNodes[1].childNodes[0].value

    const info = { old_password, new_password }

    if (!old_password || !new_password || !confirm_pass) {
      console.log('Don`t leave inputs empty')
      setLoading(false)
    } else {
      try {
        if (new_password !== confirm_pass) {
          console.log('Confirmation faied')
          setLoading(false)
        } else {
          const data = await axios.patch(
            '/api/user/password/edit/' + user_info._id,
            info
          )
          setUser_info(data.data.data)
          console.log(data)
          localStorage.setItem('user_ID', data.data.data._id)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  }

  return (
    <div className='container edit'>
      <aside>
        {tabs.map((t, i) => (
          <li
            key={i}
            onClick={() => tabChange(i + 1)}
            className={tab_num === i + 1 ? 'active' : ''}
          >
            {t}
          </li>
        ))}
      </aside>
      <main>
        {tab_num === 1 && (
          <form className='edit-info' onSubmit={formSubmit}>
            <div className='edit-img'>
              <div className='img-div'>
                <div></div>
              </div>
              <h4>change profile photo</h4>
            </div>
            <section>
              <h4>Name</h4>
              <div>
                <input
                  type='text'
                  placeholder='Name'
                  defaultValue={fullname && fullname}
                />
                <p>
                  Help people discover your account by using the name you're
                  known by: either your full name, nickname, or business name.
                  <br />
                  <br />
                  You can only change your name twice within 14 days.
                </p>
              </div>
            </section>
            <section>
              <h4>Username</h4>
              <div>
                <input
                  type='text'
                  placeholder='Username'
                  defaultValue={username && username}
                />
                <p>
                  In most cases, you'll be able to change your username back to
                  mern_stack_boy for another 14 days.
                </p>
              </div>
            </section>
            <section>
              <h4>bio</h4>
              <div>
                <textarea
                  type='text'
                  placeholder='Bio'
                  defaultValue={bio && bio}
                ></textarea>
                <p>
                  <b>Personal Information</b>
                  <br />
                  <br />
                  Provide your personal information, even if the account is used
                  for a business, a pet or something else. This won't be a part
                  of your public profile.
                </p>
              </div>
            </section>
            <button className='submit-edit' disabled={loading ? true : false}>
              {loading ? <Spin /> : 'Submit'}
            </button>
          </form>
        )}
        {tab_num === 2 && (
          <form className='edit-info' onSubmit={changePass}>
            <div className='edit-img'>
              <div className='img-div'>
                <div></div>
              </div>
              <h4>{username && username}</h4>
            </div>
            <section>
              <h4>old password</h4>
              <div className='change-passw'>
                <input type='password' />
              </div>
            </section>
            <section>
              <h4>new password</h4>
              <div className='change-passw'>
                <input type='password' />
              </div>
            </section>
            <section>
              <h4>confirm new password</h4>
              <div className='change-passw'>
                <input type='password' />
              </div>
            </section>
            <button className='submit-edit' disabled={loading ? true : false}>
              {loading ? <Spin /> : 'Save'}
            </button>
          </form>
        )}
      </main>
    </div>
  )
}

export default Edit

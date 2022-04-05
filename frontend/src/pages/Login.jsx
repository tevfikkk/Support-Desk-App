import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const dispatch = useDispatch()

  const { user, isLoading, isSuccess, message } = useSelector(
    state => state.auth
  )

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = e => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  return (
    <div>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get Support</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          {/* Email */}
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email' // this is going to onChange func
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>

          {/* Password */}
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password' // this is going to onChange func
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              required
            />
          </div>

          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Login

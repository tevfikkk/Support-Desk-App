import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

const NewTicket = () => {
  const { user } = useSelector(state => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(
    state => state.tickets
  )

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      navigate('/tickets')
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = e => {
    e.preventDefault()
    dispatch(createTicket({ product, description }))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the for below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' value={name} className='form-control' disabled />
        </div>

        <div className='form-group'>
          <label htmlFor='name'>Customer Email</label>
          <input type='text' value={email} className='form-control' disabled />
        </div>

        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={e => setProduct(e.target.value)}>
              <option value='product'>Please choose a product</option>
              <option value='Xbox360'>Xbox360</option>
              <option value='Nintendo Game Boy'>Nintendo Game Boy</option>
              <option value='PS3'>PS3</option>
              <option value='Sega Genesis'>Sega Genesis</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={e => setDescription(e.target.value)}></textarea>
          </div>

          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket

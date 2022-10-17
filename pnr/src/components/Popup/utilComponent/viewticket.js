import React from 'react'
import { useState } from 'react'


export default function Viewticket() {
    
    
    const [formData, setFormData] = useState({
        v_no:'',
        seckey: '',
      })


    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }

  return (
    <div className='utilContainer'>
        <div className='leftFloat'>
        <form >
        <div className='form-group'>
            <label>Vehicle No.</label>
            <input
            type='text'
            className='form-control'
            id='v_no'
            name='v_no'
            placeholder='Enter your vehicle-no'
            onChange={onChange}
            />
        </div>
        <div className='form-group'>
            <label>Secret PIN</label>
            <input
            type='password'
            className='form-control'
            id='seckey'
            name='seckey'
            placeholder='Enter secret-pin'
            onChange={onChange}
            />
        </div>

        <div className='form-group'>
            <button type='submit' className='btn btn-block'>
            View Ticket
            </button>
        </div>
        </form>
        </div>
        <div className='rightFloat'></div>
    </div>
  )
}

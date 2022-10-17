import React from 'react'
import { useState } from 'react';

export default function Bookslot({data}) {
    const curr_id = data?._id;
    const curr_place = data?.place;
    const [formData, setFormData] = useState({
        plot:{_id:curr_id,slot:7},
        user: '',
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
            <label>Parkinglot</label>
            <input
              type='text'
              className='form-control'
              id='place'
              name='place'
              value={curr_place}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div> 
          <div className='form-group'>
            <label>Name</label> 
            <input
              type='text'
              className='form-control'
              id='user'
              name='user'
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
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
              Book Slot
            </button>
          </div>
        </form>
        </div>
        <div className='rightFloat'></div>
    </div>
  )
}

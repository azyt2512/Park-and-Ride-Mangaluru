import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Checkout() {
    const [formData, setFormData] = useState({
        v_no:'',
        seckey: '',
      })
      const [isLoading, setIsLoading] = useState(false);
      const [resMessage, setResMessage] = useState('View Response Here');  
      const onChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        })
      }
      const onSubmit = async (e) =>{
        e.preventDefault();
        setIsLoading(true);
        try {
           const res = await axios.delete("http://localhost:5000/api/ticket/checkout",formData)
           console.log(res.data);
           setResMessage("Ticket has been Flushed Successfully");
          setIsLoading(false);
        } catch (error) {
          setResMessage("Something went wrong :(");
          setIsLoading(false);
         console.log(error);
        }
     }
  return (
    <div className='utilContainer'>
        <div className='leftFloat'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label>Vehicle No.<span className='mendate'>*</span></label>
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
            <label>Secret PIN<span className='mendate'>*</span></label>
            <input
              type='password'
              className='form-control'
              id='seckey'
              name='seckey'
              placeholder='Enter secret-pin'
              onChange={onChange}
            />
          </div>
          <div><span className='mendate'>*</span>Marked fields are mendatory</div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Check Out
            </button>
          </div>
        </form>
        </div>
        <div className='rightFloat'>
          <div className='rightUp'>
          {isLoading ? <div className='spinner'></div>
           : ''
          }
          </div>
          <div className='rightDown'>
          {isLoading ? ''
           : <div id = 'util_msg'>{resMessage}</div>
          }
          </div>
        </div>
    </div>
  )
}

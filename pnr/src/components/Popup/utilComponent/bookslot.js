import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export default function Bookslot({data, onClick}) {
    const curr_id = data?._id;
    const curr_place = data?.place;
    const [formData, setFormData] = useState({
        plot:{_id:curr_id,slot:7},
        user: '',
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
          const res = await axios.post("http://localhost:5000/api/ticket/add",formData)
          console.log(res.data);
          onClick(curr_id);
          setResMessage("Ticket Created Successfully");
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
            <label>Parkinglot<span className='mendate'>*</span> </label>
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
            <label>Name<span className='mendate'>*</span></label> 
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
              Book Slot
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

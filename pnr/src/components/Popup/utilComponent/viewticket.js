import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Showticket from './showticket'

export default function Viewticket() {


  const [formData, setFormData] = useState({
    v_no: '',
    seckey: '',
  })
  const [isLoading, setIsLoading] = useState(1);
  const [resMessage, setResMessage] = useState('View Response Here');
  const [ticketData, setTicketData] = useState(undefined);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(2);
    try {
      const res = await axios.post("http://localhost:5000/api/ticket/view", formData)
      setTicketData(res.data);
      setResMessage("Ticket Fetched Successfully");
      setIsLoading(3);
    } catch (error) {
      if(error.response.status === 401)
      setResMessage("Wrong Credentials :(");
      else
      setResMessage("Internal server error Something went wrong :(");
      setIsLoading(4);
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
              View Ticket
            </button>
          </div>
        </form>
      </div>
      <div className='rightFloat'>
        <div className='rightUp'>
          {isLoading === 2? <div className='spinner'></div>
            : isLoading === 3 ? <Showticket data={ticketData}/>
            : isLoading === 4 ? <div className='ticket-table'><img src='./error.jpg'></img></div>
            : <div className='ticket-table'><img src='./default-img.png'></img></div>
          }
        </div>
        <div className='rightDown'>
          {isLoading === 2 ? ''
            : <div id='util_msg'>{resMessage}</div>
          }
        </div>
      </div>
    </div>
  )
}

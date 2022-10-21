import React from 'react'


export default function Showticket({data}) {
    
    const place = localStorage.getItem(data?.parkinglot._id);

  return (
    <>
    <div className='ticket-table'>
        <img src='./booked.png'></img>
    </div>
    <div className='ticket-table'>
        <table >
            
            <tbody>
            <tr>
                <th>Parkinglot</th>
                <td>{place}</td>
            </tr>
            <tr>
                <th>Slot No.</th>
                <td>{data?.parkinglot.slot_no}</td>
            </tr>
            <tr>
                <th>Owner</th>
                <td>{data?.user}</td>
            </tr>
            <tr>
                <th>Vehicle No.</th>
                <td>{data?.vehicle}</td>
            </tr>
            </tbody>
        </table>
    </div>
    </>
  )
}

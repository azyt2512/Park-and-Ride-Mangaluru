import React from 'react'


export default function Showticket({data}) {
    
    const place = localStorage.getItem(data?.parkinglot._id);
    const dateModify = (date) =>{
        console.log(typeof(date),date);
        let ans = ""
        let temp1 = date.split("T");
        ans += temp1[0] + " "
        let temp2 = temp1[1].split(".");
        ans += temp2[0] 
        return ans;
    }
    const create_time = (new Date(data?.create_time).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}))
    const expire_time = (new Date(data?.expire_time).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'}))

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
            <tr>
                <th>Created On</th>
                <td>{create_time}</td>
            </tr>
            <tr>
                <th>Expire On</th>
                <td>{expire_time}</td>
            </tr>
            </tbody>
        </table>
    </div>
    </>
  )
}

import React from "react";
import Bookslot from "./utilComponent/bookslot"
import Checkout from "./utilComponent/checkout"
import Viewticket from "./utilComponent/viewticket"
import './utility.css';
import { useState, useEffect } from "react";

const Utility = ({ data, visible, onClick  }) => {
    
    const [container,setContainer] = useState(undefined);
    const [uoptions,setUoptions] = useState("1");
    
    useEffect(()=>{
        if(visible===true)
        {setContainer({"display": "block"})}
        else
        {setContainer({"display": "none"})}
        console.log(visible);
    },[visible]);

    function handleClick(e){
      e.preventDefault();
      setUoptions(e.target.name);
    }

  return (
    <div className="container" style={container}>
        <div className="utility">
            <div className="util_nav">
            <button name="1" className="nav_button" onClick={handleClick}>BOOK_SLOT</button>
            <button name="2" className="nav_button" onClick={handleClick}>CHECK_OUT</button>
            <button name="3" className="nav_button" onClick={handleClick}>VIEW_TICKET</button>
            <button id="exit" onClick={onClick}>X</button>
            </div>
            <>
            { uoptions=== "1" ? <Bookslot data={data}/>
             : uoptions === "2" ? <Checkout/>
             : <Viewticket/>
            }
            </>
        </div>
    </div>
  )
}

export default Utility;

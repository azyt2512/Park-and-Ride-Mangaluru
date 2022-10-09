import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDirections } from '@fortawesome/free-solid-svg-icons';
import './popup.css';

import RealTimeParkRidePopup from './RealTimeParkRide';
import FreeParkRidePopup from './FreeParkRide';

export const popupTypes = {
  realTimeParkRide: 'realTime',
  freeParkRide: 'freeParkRide',
};
function Popup({ data, visible, onClick, onClick1 }) {
  if (!data) return <div className="popup"></div>;
  let count = data.data.fields.grp_disponible;
  const wrapperClassName = `popup ${visible ? 'visible' : ''}`;
  const navigationButClassName = `navigation-button ${visible ? 'visible' : ''}`;

  const handleNavigationClick = e => {
    e.stopPropagation(); // Prevent closing popup

    let location;
    if (data.data.fields) {
      location = data.data.fields.location;
    } else  {
      location = JSON.parse(data.data.properties.location);
    }
  
    if (location) {
      startNavigation(location);
    }
  }
  // const handleClick =(e) => {
  //     if(e.target.name == 'book'){

  //     }
  // }
  
  const startNavigation = location => {
    const [lat, lng] = location
    window.open(`https://maps.google.com/maps?daddr=${lat},${lng}&amp;ll=`);
  };  

  return (
    <div className={wrapperClassName} onClick={onClick}>
      <div className={navigationButClassName} onClick={handleNavigationClick}>
        <FontAwesomeIcon icon={faDirections} color="rgb(28, 57, 223)" />
        <span>Direction</span>
      </div>
      {data.type === popupTypes.realTimeParkRide && (
        <RealTimeParkRidePopup data={data.data} onClick1={onClick1}/>
      )}
      {data.type === popupTypes.freeParkRide && <FreeParkRidePopup data={data.data} />}
      
      {/* <button name='unbook' onClick={handleClick}>Check Out</button> */}
    </div>
  );
}

Popup.propTypes = {
  data: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onClick1: PropTypes.func.isRequired
}

export default Popup;

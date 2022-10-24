import React from 'react';
import PropTypes from 'prop-types';

const RealTimeParkRidePopup = ({ data ,onClick1}) => {
  const {  grp_nom, grp_disponible, grp_exploitation, grp_statut } = data.fields;
  let _id = data._id;
  let p_name = data.fields.grp_nom;
  let count = grp_disponible;

  let countClassName = `popup-count ${
    count === 0 ? 'danger' : count < 10 ? 'warning' : ''
  }`;

  let countSentence;
  if (count === 0) {
    countSentence = 'NO place Available';
  } else if (count === 1) {
    countSentence = '1 place Available';
  } else {
    countSentence = `${count} places Available`;
  }

  if (grp_statut === 0) {
    countSentence = 'Comptage hors service';
    count = 'X';
    countClassName += ' invalid';
  } else if (grp_statut === 1) {
    countSentence = 'Parking fermé';
    count = 'X';
    countClassName = 'popup-count danger';
  }
   const handleClick = (e)=>{
      e.preventDefault();
      onClick1(e.target.name, p_name);
   }

  return (
    <div className="popup-wrapper">
      <div className={countClassName}>{count}</div>
      <div className="popup-informations">
        <h3 className="popup-park-name">{grp_nom}</h3>
        <p className="">{countSentence}</p>
        <p>
           Number of total places : <strong>{grp_exploitation}</strong>
        </p>
      </div>
      <button className=' btn btn-block' disabled={count==0 ? true : false} name={_id} onClick={handleClick}>MENU</button>
    </div>
  );
};

RealTimeParkRidePopup.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RealTimeParkRidePopup;

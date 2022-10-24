import React from 'react';
import PropTypes from 'prop-types';
import './marker.css';

function Marker({ data, onClick }) {
  let count = data.fields.grp_disponible;
  const status = data.fields.grp_statut;
  const name = data.fields.grp_nom;
  let className = `marker ${
    count === 0 ? 'danger' : count < 10 ? 'warning' : ''
  }`;

  if (status === 0) {
    className += ' invalid';
    count = 'X';
  } else if (status === 1) {
    className = 'marker danger';
    count = 'X';
  }

  return (<>
          <div className='marker-container'>

          <div onClick={() => onClick(data)} className={className}><div >{count}</div></div>
          <div className='small'>{name}</div>
          </div>
          </>
  );
}

Marker.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func.isRequired
}

export default Marker;

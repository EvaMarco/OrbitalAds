import React from 'react';
import PropTypes from 'prop-types';
import logo from '../images/mountains.png'

const City = props => {
  const {city} = props;
  return (
    <div className="city">
      <img src={logo} alt="city"/>
      <p>{city.name}</p>
      <p>{city.chineseName}</p>
    </div>
  );
}
City.propTypes = {
  city: PropTypes.object.isRequired,
}

export default City;
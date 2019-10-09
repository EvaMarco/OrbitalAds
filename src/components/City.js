import React from 'react';
import PropTypes from 'prop-types';
import logo from '../images/mountains.png';
import '../scss/City.scss';

const City = props => {
  const {city} = props;
  return (
    <div className="city">
      <img className="city__logo"src={logo} alt="city"/>
      <div className="city__names">
        <p className ="city__name">{city.name}</p>
        <p className="city__chineseName">{city.chineseName}</p>
      </div>
    </div>
  );
}
City.propTypes = {
  city: PropTypes.object.isRequired,
}

export default City;
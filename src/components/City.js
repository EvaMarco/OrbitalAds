import React from 'react';
import PropTypes from 'prop-types';
import logo from '../images/mountains.png';
import './City.scss';

const City = props => {
  const {city} = props;
  return (
    <div className = "city">
      <img className = "city__logo" src = {logo} alt = {city.name}/>
      <div className = "city__names">
        <div className = "city__name">{city.name}</div>
        <div className = "city__metadata" lang="zh">{city.chineseName}</div>
      </div>
    </div>
  );
}
City.propTypes = {
  city: PropTypes.object.isRequired
}

export default City;
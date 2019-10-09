import React from 'react';
import PropTypes from 'prop-types';

const City = props => {
  const {city} = props;
  return (
    <div className="city">
      <img src="../images/mountains.svg" alt="city"/>
      <p>{city.name}</p>
      <p>{city.chineseName}</p>
    </div>
  );
}
City.propTypes = {
  city: PropTypes.object.isRequired,
}

export default City;
import React from 'react';
import PropTypes from 'prop-types';
import '../scss/Filters.scss'; 

const Filters = props => {
  const {getUserInput} = props
    return (
      <div className="filters">
        <label htmlFor="input"></label>
        <input 
          type="text" 
          name="text" 
          id="input" 
          className="input-text" 
          placeholder={'Search by name'}
          onChange={getUserInput}
        />
      </div>
    );
}
Filters.propTypes = {
  getUserInput: PropTypes.func.isRequired,
}

export default Filters;
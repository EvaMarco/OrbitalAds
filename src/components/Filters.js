import React from 'react';
import PropTypes from 'prop-types';
import './Filters.scss'; 

const Filters = props => {
  const {getUserInput} = props;
    return (
      <div className = "filters">
        <label htmlFor = "filterByName" className ="filter__label">FilterByName</label>
        <input 
          type = "text" 
          name = "filterByName" 
          id = "filterByName" 
          className = "input-text" 
          placeholder = {'Search by name'}
          onChange = {getUserInput}
        />
      </div>
    );
}

Filters.propTypes = {
  getUserInput: PropTypes.func.isRequired
}

export default Filters;
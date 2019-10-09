import React from 'react';
import PropTypes from 'prop-types';
import City from './City';
import '../scss/Selected.scss'; 

const Selected = props => {
  const {clearAllSelected, clearSelected, result} = props;
  return(
    <div className="selected">
      <div className="clear__box">
        <p className="selected__items">{result.length} items</p>
        <button className="btn clear__btn" onClick = {clearAllSelected}>clear</button>
      </div>
      <ul className="selected__list">
      {result.map((item)=>{
        return(
          <li key={item.id} className="selected__list-city">
            <City city={item}/>  
            <button 
              data-key={item.name}
              className="btn delete__btn" 
              onClick = {clearSelected}
            >
              x
            </button>
          </li>
        )
        }
      )}
      </ul>
    </div>
  )
}

Selected.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object).isRequired, 
  clearAllSelected: PropTypes.func.isRequired,
  clearSelected: PropTypes.func.isRequired
}

export default Selected;
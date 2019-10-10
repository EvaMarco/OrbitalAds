import React from 'react';
import PropTypes from 'prop-types';
import City from './City';
import '../scss/Selected.scss'; 

const Selected = props => {
  const {
    clearAllSelected, 
    clearSelected, 
    selectedCities, 
    query,
    initSelect, 
    endSelect, 
    prevPageSelect,
    nextPageSelect
  } = props;
  const cities = selectedCities
    .filter(item => {
      return item.name.toUpperCase().includes(query.toUpperCase())
      }
    );
  return(
    <div className="selected">
      <div className="clear__box">
        <p className="selected__items">{cities.length} items</p>
        <button 
          className="btn clear__btn" 
          onClick = {clearAllSelected}
        >
          clear
        </button>
      </div>
      <ul className="selected__list">
        {cities
          .slice(initSelect, endSelect)
          .map((item)=>{
            return(
              <li key={item.id} className="selected__list-city">
                <City city={item}/>  
                <button 
                  data-key={item.id}
                  className="btn delete__btn" 
                  onClick = {clearSelected}
                >
                  x
                </button>
              </li>
            )
          })
        }
      </ul>
      <button onClick = {prevPageSelect}>prev page</button>
      <button onClick = {nextPageSelect}>next page</button>
    </div>
  )
}

Selected.propTypes = {
  selectedCities: PropTypes.arrayOf(PropTypes.object).isRequired, 
  clearAllSelected: PropTypes.func.isRequired,
  clearSelected: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired
}

export default Selected;
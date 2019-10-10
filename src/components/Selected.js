import React from 'react';
import PropTypes from 'prop-types';
import City from './City';
import './Selected.scss'; 

const Selected = props => {
  const {
    clearAllSelected, 
    clearSelected, 
    selectedCities, 
    query,
    initSelect, 
    endSelect, 
    prevPageSelect,
    nextPageSelect, 
    selectPage
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
      <div className="selected__pages">
        <button className = "btn prevPage__btn" onClick = {prevPageSelect}>
        &lt;
        </button>
        <p className="list__page">Page {selectPage}  of {Math.ceil(cities.length/20)}</p>
        <button className = "btn nextPage__btn" onClick = {nextPageSelect}>
        &gt;
        </button>
      </div>
    </div>
  )
}

Selected.propTypes = {
  selectedCities: PropTypes.arrayOf(PropTypes.object).isRequired, 
  clearAllSelected: PropTypes.func.isRequired,
  clearSelected: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired, 
  initSelect: PropTypes.number.isRequired, 
  endSelect: PropTypes.number.isRequired, 
  prevPageSelect: PropTypes.func.isRequired,
  nextPageSelect: PropTypes.func.isRequired,
  selectPage: PropTypes.number.isRequired
}

export default Selected;
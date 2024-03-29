import React from 'react';
import PropTypes from 'prop-types';
import City from './City';
import Filters from './Filters';
import './List.scss';

const List = props => {
  const {
    data, 
    query, 
    getSelectValue, 
    getUserInput, 
    selectedCities, 
    allSelected, 
    init, 
    end, 
    prevPage,
    nextPage, 
    listPage
  } = props

  const cities = data
    .filter(item => {
      return item.name.toUpperCase().includes(query.toUpperCase())
      }
    );
    
  return(
    <div className="results">
      <Filters getUserInput = {getUserInput}/>
      <div className="results__counter">  
        <input 
          className="checkbox__input results__checkbox"
          type="checkbox" 
          name="all" 
          id="all" 
          value="all"
          onChange={getSelectValue}
          checked = {allSelected === true}
        />
        <p className = "results__counter-text">{cities.length} items</p>
      </div>
      <ul className="city__list">
      {cities
        .slice(init, end)
        .map((item)=>{
            return(
              <li key={item.id} className="city__list-item">
                <label htmlFor={item.name} className = "city__list-label">
                  <input 
                    key={item.id}
                    className="checkbox__input"
                    type="checkbox" 
                    name="city" 
                    id={item.name} 
                    value={item.id} 
                    onChange={getSelectValue}
                    checked = {selectedCities.filter(city => (city.name === item.name)).length === 1 }
                  />
                  <City city={item}/>  
                </label>
              </li>
            )
          }
        )
      }
      </ul>
      <div className="list__pages">
        <button className = "btn prevPage__btn" onClick = {prevPage}>
        &lt;
        </button>
        <p className="list__page">Page {listPage} of {Math.ceil(cities.length/20)}</p>
        <button className = "btn nextPage__btn" onClick = {nextPage}>
        &gt;
        </button>
      </div>
    </div>
  )
}

List.propTypes = {
  getSelectValue: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired, 
  query: PropTypes.string.isRequired,
  getUserInput: PropTypes.func.isRequired, 
  selectedCities: PropTypes.arrayOf(PropTypes.object).isRequired, 
  allSelected: PropTypes.bool, 
  init: PropTypes.number.isRequired, 
  end: PropTypes.number.isRequired, 
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  listPage: PropTypes.number.isRequired
}

export default List;
import React from 'react';
import PropTypes from 'prop-types';
import City from './City';
import Filters from './Filters';
import '../scss/List.scss';

const List = props => {
const {data, query, getSelectValue, getUserInput, result, selectedCities, allSelected} = props
  const cities = data.cities
    .filter(item => {
      return item.name.toUpperCase().includes(query.toUpperCase())
    });
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
          checked = {allSelected=== true}
        />
        <p className = "results__counter-text">{cities.length} items</p>
      </div>
      <ul className="city__list">
      {cities
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
                  checked = {result.filter(e => e.name === item.name).length > 0}
                />
                <City city={item}/>  
              </label>
            </li>
          )
        }
      )}
      </ul>
    </div>
  )
}
List.propTypes = {
  getSelectValue: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired
}
export default List;
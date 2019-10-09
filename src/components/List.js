import React from 'react';
import PropTypes from 'prop-types';
import City from './City';

const List = props => {
const {data, query, getSelectValue} = props
  const result = data.cities
    .filter(item => {
      return item.name.toUpperCase().includes(query.toUpperCase())
    });
  return(
    <div className="results">
      <div className="results__counter">  
        <input 
          type="checkbox" 
          name="all" 
          id="all" 
          value="all"
          onChange={getSelectValue}
        />
        <p>{result.length} items</p>
      </div>
      <ul className="result__list">
      {result
      .map((item)=>{
          return(
            <li key={item.id} className="list__city">
              <label htmlFor={item.name}>
                <input 
                  type="checkbox" 
                  name="city" 
                  id={item.name} 
                  value={item.id} 
                  onChange={getSelectValue}
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
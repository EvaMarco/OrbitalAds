import React from 'react';
import PropTypes from 'prop-types';
import City from './City';

const Selected = props => {
  const {selectedCities, data} = props;
  let result = [];
  if(selectedCities[0] === 'all'){
    result = data.cities;
    console.log(result);
  }
  else{
    for(let item of selectedCities){
      let obj = data.cities.find(o => o.id === item);
      result.push(obj);
    }
    console.log(result);
  }

  return(
    <div className="selected">
      <ul>
      {result.map((item)=>{
        return(
          <li key={item.id} className="list__city">
          <City city={item}/>  
          </li>
        )
        }
      )}
      </ul>
    </div>
  )
}

Selected.propTypes = {
  selectedCities: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired
}

export default Selected;
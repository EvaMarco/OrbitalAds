import React from 'react';
import PropTypes from 'prop-types';
import City from './City';

const Selected = props => {
  const {selectedCities, data} = props;
    // const foo = data.find(item=>item.name.toUpperCase() === data.cities.name);
    // console.log(foo)
    if(selectedCities === ['all']){
      return(
        <div className="selected">
          <ul>
          {data.map((item)=>{return(
            <li key={item.id} className="list__city">
            <City city={item}/>  
            </li>
          )})}
          </ul>
        </div>
      )
    }
    else{
      return(
        <p>Aun no hay lista</p>
      )
    }
}
Selected.propTypes = {
  selectedCities: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired
}

export default Selected;
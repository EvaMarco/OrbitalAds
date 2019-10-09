import React from 'react';
import Header from './Header';
import List from './List';
import Data from '../Data';
import Filters from './Filters';
import Selected from './Selected';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      data: Data,
      query:'',
      selectedCities:[]
    }
    this.getUserInput= this.getUserInput.bind(this);
    this.getSelectValue= this.getSelectValue.bind(this);
  }
  getUserInput(event){
    const inputValue = event.currentTarget.value;
    this.setState({query: inputValue});
  }
  getSelectValue(event){
    const selectValue = event.currentTarget.value;
    if(selectValue === "all"){
      if(this.state.selectedCities === ['all']){
        this.setState({selectedCities: []})
      }
      else{
        this.setState({selectedCities: ['all']})
      }
    }
    else{
      if (this.state.selectedCities.indexOf(selectValue) > -1) {
        const index = this.state.selectedCities.indexOf(selectValue);
        const newArray = [...this.state.selectedCities];
        newArray.splice(index, 1)
        this.setState({selectedCities: newArray})
      } 
      else {
        this.setState(prevState => ({
          selectedCities: [...prevState.selectedCities, selectValue]
        })) 
      }
    }

  }
  render() {
    return (
      <div className="App">
        <Header />
        <Filters getUserInput= {this.getUserInput}/>
        <List data = {this.state.data} query = {this.state.query} getSelectValue= {this.getSelectValue}/>
        <Selected selectedCities = {this.state.selectedCities} data = {this.state.data}/>
      </div>
    );
  }
}

export default App;

import React from 'react';
import Header from './Header';
import List from './List';
import Data from '../Data';
import Selected from './Selected';
import '../scss/App.scss';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      data: Data,
      query:'',
      selectedCities:[], 
      result:[]
    }
    this.getUserInput = this.getUserInput.bind(this);
    this.getSelectValue = this.getSelectValue.bind(this);
    this.clearAllSelected = this.clearAllSelected.bind(this);
    this.clearSelected = this.clearSelected.bind(this);
  }
  getUserInput(event){
    const inputValue = event.currentTarget.value;
    this.setState({query: inputValue});
  }
  getSelectValue(event){
    const selectValue = event.currentTarget.value;
    if(selectValue === "all"){
      if(this.state.selectedCities[0] === 'all'){
        this.setState({selectedCities: []}, () => {this.setSelected()})     
      }
      else{
        this.setState({selectedCities: ['all']}, () => {this.setSelected()})
      }
    }
    else{
      if (this.state.selectedCities.indexOf(selectValue) > -1) {
        const index = this.state.selectedCities.indexOf(selectValue);
        const newArray = [...this.state.selectedCities];
        newArray.splice(index, 1)
        this.setState({selectedCities: newArray}, () => {this.setSelected()});  
      } 
      else {
        this.setState(prevState => ({
          selectedCities: [...prevState.selectedCities, selectValue]
        }), () => {this.setSelected()});        
      }
    }
  }
  setSelected(){ 
    if(this.state.selectedCities[0] === 'all'){
      const cities = this.state.data.cities
      .filter(item => {
        return item.name.toUpperCase().includes(this.state.query.toUpperCase())
      });
      this.setState({
        result: cities
      })
    }
    else{
      const newArray=[]
      for(let item of this.state.selectedCities){
        let obj = this.state.data.cities.find(o => o.id === item);
        newArray.push(obj);
      }
      this.setState({
        result: newArray
      })
    }   
  }
  clearAllSelected(){
    this.setState({result:[], selectedCities:[]})
  }
  clearSelected(event){
    const newSelected=[];
    const deleteCity = event.currentTarget.dataset.key; 
    const index = this.state.result.findIndex(x => x.name === deleteCity);
    const newArray = [...this.state.result];
    newArray.splice(index, 1);
    for(let item of newArray){
      newSelected.push(item.name)
    }
    console.log(newSelected)
    this.setState({selectedCities: newSelected}, () => {this.setSelected()}); 
  }
  render() {
    return (
      <div className="App">
        <Header />
        <div className="grid__container">
          <List 
            selectedCities = {this.state.selectedCities}
            result = {this.state.result}
            data = {this.state.data} 
            query = {this.state.query} 
            getSelectValue= {this.getSelectValue} 
            getUserInput= {this.getUserInput}
          />
          <Selected 
            result = {this.state.result}
            clearAllSelected= {this.clearAllSelected}
            clearSelected= {this.clearSelected}
          />
        </div>

      </div>
    );
  }
}

export default App;

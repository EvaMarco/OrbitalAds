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
      result:[],
      allSelected:false
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
      if(this.state.allSelected === true){
        this.setState({selectedCities: [], allSelected: false}, () => {this.setSelected()})     
      }
      else{
        const allArray = []
        for(let item of this.state.data.cities){
          allArray.push(item)
        }
        console.log(allArray)
        this.setState({selectedCities: allArray, allSelected: true}, () => {this.setSelected()})
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
    if(this.state.allSelected === true){
      const cities = this.state.data.cities;
        const filtered = cities.filter(item => {
          return item.name.toUpperCase().includes(this.state.query.toUpperCase())
        });
        if(filtered.length !== cities.length){
          this.setState({
            result: filtered, allSelected: false
          })
        }else{
          this.setState({
            result: filtered
          })
        }

    }
    else{
      const newArray=[]
      for(let item of this.state.selectedCities){
        let obj = this.state.data.cities.find(o => o.id === item);
        newArray.push(obj);
      }
      const filteredArray = newArray.filter(item => {
        return item.name.toUpperCase().includes(this.state.query.toUpperCase())
      });
      this.setState({
        result: filteredArray
      })
    }   
  }
  clearAllSelected(){
    this.setState({result:[], selectedCities:[], allSelected: false})
  }
  clearSelected(event){
    const key = event.currentTarget.dataset.key; 
    console.log(key)
  }
  render() {
    return (
      <div className = "App">
        <Header />
        <div className = "grid__container">
          <List 
            allSelected =  {this.state.allSelected}
            selectedCities = {this.state.selectedCities}
            result = {this.state.result}
            data = {this.state.data} 
            query = {this.state.query} 
            getSelectValue = {this.getSelectValue} 
            getUserInput = {this.getUserInput}
          />
          <Selected 
            result = {this.state.result}
            clearAllSelected = {this.clearAllSelected}
            clearSelected = {this.clearSelected}
          />
        </div>
      </div>
    );
  }
}

export default App;

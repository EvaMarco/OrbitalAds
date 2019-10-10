import React from 'react';
import Header from './Header';
import List from './List';
import Data from '../Data/cities-of-china.json';
import Selected from './Selected';
import '../scss/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Data.cities,
      query: '',
      selectedCities: [],
      allSelected: false,  
      init: 0, 
      end: 20, 
      initSelect: 0,
      endSelect: 20,
      listPage:1,
      selectPage:1,
    }
    this.getUserInput = this.getUserInput.bind(this);
    this.getSelectValue = this.getSelectValue.bind(this);
    this.clearAllSelected = this.clearAllSelected.bind(this);
    this.clearSelected = this.clearSelected.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPageSelect = this.nextPageSelect.bind(this);
    this.prevPageSelect = this.prevPageSelect.bind(this);
  }
 
  prevPage(){
    const preInit = this.state.init;
    if(this.state.listPage !== 1){
      const newInit = preInit - 21;
      const preEnd = this.state.end;
      const newEnd = preEnd - 21;
      const newPage = this.state.listPage - 1;
        this.setState({
          init: newInit, 
          end: newEnd,
          listPage : newPage
        })
    }else{
      console.log('error'); 
    }
  }
  nextPage(){
    const preEnd = this.state.end;
    if(preEnd < this.state.data.filter((item => {
      return item.name.toUpperCase().includes(this.state.query.toUpperCase())
      }
    )).length){
      const preInit = this.state.init;
      const newInit = preInit + 21;
      const newEnd = preEnd + 21;
      const newPage = this.state.listPage + 1;
      this.setState({
        init: newInit, 
        end: newEnd,
        listPage: newPage
      })
    }
    else{
      console.log('error'); 
    }
  }
  prevPageSelect(){
    const preInit = this.state.initSelect;
    if(this.state.selectPage !== 1){
      const newInit = preInit - 21;
      const preEnd = this.state.endSelect;
      const newEnd = preEnd - 21;
      const newPage = this.state.selectPage - 1; 
        this.setState({
          initSelect: newInit, 
          endSelect: newEnd,
          selectPage: newPage
        })
    }else{
      console.log('error'); 
    }
  }
  nextPageSelect(){
    const preEnd = this.state.endSelect;
    if(preEnd < this.state.selectedCities.filter((item => {
      return item.name.toUpperCase().includes(this.state.query.toUpperCase())
      })).length){
      const preInit = this.state.initSelect;
      const newInit = preInit + 21;
      const newEnd = preEnd + 21;
      const newPage = this.state.selectPage + 1; 
      this.setState({
        initSelect: newInit, 
        endSelect: newEnd, 
        selectPage: newPage
      })
    }
    else{
      console.log('error'); 
    }
  }
  getUserInput(event) {
    const inputValue = event.currentTarget.value;
    this.setState({ 
      query: inputValue,
      init: 0, 
      end: 20, 
      initSelect: 0,
      endSelect: 20,
      listPage: 1, 
      selectPage: 1,
      allSelected: false
    });
  }
  getSelectValue(event) {
    const selectValue = event.currentTarget.value;
    this.setSelected(selectValue);
  }
  setSelected(city) {
    if (city === "all") {
      if (this.state.allSelected === true) {
        this.setState({ selectedCities: [], allSelected: false })
      }
      else {
        const allArray = []
        for (let item of this.state.data.filter((item => {
          return item.name.toUpperCase().includes(this.state.query.toUpperCase())
          }))) {
          allArray.push(item)
        }
        this.setState({ selectedCities: allArray, allSelected: true })
      }
    }
    else {
      if (this.state.selectedCities.length === 0) {
        const newCity = this.state.data.find(item => item.id === city);
        this.setState(prevState => ({
          selectedCities: [...prevState.selectedCities, newCity]
        }));
      }
      else if (this.state.allSelected === true) {
        const index = this.state.selectedCities.findIndex(
          item => item.id === city
        );
        const newArray = [...this.state.selectedCities];
        newArray.splice(index, 1);
        this.setState({ selectedCities: newArray, allSelected: false });
      }
      else {
        if (this.state.selectedCities.find(item => item.id === city)) {
          const index = this.state.selectedCities.findIndex(item => item.id === city);
          const newArray = [...this.state.selectedCities];
          newArray.splice(index, 1)
          this.setState({ selectedCities: newArray })
        }
        else {
          const selectedCity = this.state.data.find(item => item.id === city);
          this.setState(prevState => ({
            selectedCities: [...prevState.selectedCities, selectedCity]
          }))
        }
      }
    }
  }
  clearAllSelected() {
    this.setState({ selectedCities: [], allSelected: false })
  }
  clearSelected(event) {
    const key = event.currentTarget.dataset.key;
    if (this.state.allSelected === true) {
      const index = this.state.selectedCities.findIndex(
        item => item.id === key
      );
      const newArray = [...this.state.selectedCities];
      newArray.splice(index, 1);
      this.setState({ selectedCities: newArray, allSelected: false });
    }
    else {
      const index = this.state.selectedCities.findIndex(
        item => item.id === key
      );
      const newArray = [...this.state.selectedCities];
      newArray.splice(index, 1);
      this.setState({ selectedCities: newArray });
    }
  }
  render() {
    return (
      <div className = "App">
        <Header />
        <div className = "grid__container">
          <List
            allSelected = {this.state.allSelected}
            selectedCities = {this.state.selectedCities}
            data = {this.state.data}
            query = {this.state.query}
            getSelectValue = {this.getSelectValue}
            getUserInput = {this.getUserInput}
            dividedData = {this.state.dividedData}
            init = {this.state.init}
            end = {this.state.end}
            nextPage = {this.nextPage}
            prevPage = {this.prevPage}
            listPage = {this.state.listPage}
          />
          <Selected
            query = {this.state.query}
            clearAllSelected = {this.clearAllSelected}
            clearSelected = {this.clearSelected}
            selectedCities = {this.state.selectedCities}
            initSelect = {this.state.initSelect}
            endSelect = {this.state.endSelect}
            nextPageSelect = {this.nextPageSelect}
            prevPageSelect = {this.prevPageSelect}
            selectPage = {this.state.selectPage}
          />
        </div>
      </div>
    );
  }
}

export default App;

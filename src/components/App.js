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
      allSelected: false
    }
    this.getUserInput = this.getUserInput.bind(this);
    this.getSelectValue = this.getSelectValue.bind(this);
    this.clearAllSelected = this.clearAllSelected.bind(this);
    this.clearSelected = this.clearSelected.bind(this);
  }

  getUserInput(event) {
    const inputValue = event.currentTarget.value;
    this.setState({ query: inputValue });
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
        for (let item of this.state.data) {
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
      <div className="App">
        <Header />
        <div className="grid__container">
          <List
            allSelected={this.state.allSelected}
            selectedCities={this.state.selectedCities}
            data={this.state.data}
            query={this.state.query}
            getSelectValue={this.getSelectValue}
            getUserInput={this.getUserInput}
          />
          <Selected
            query={this.state.query}
            clearAllSelected={this.clearAllSelected}
            clearSelected={this.clearSelected}
            selectedCities={this.state.selectedCities}
          />
        </div>
      </div>
    );
  }
}

export default App;

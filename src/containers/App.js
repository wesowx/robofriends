import React from 'react';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js';
import './App.css';
import Scroll from '../components/Scroll.js';
import ErrorBoundary from '../components/ErrorBoundary.js';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        return response.json();
      })
      .then(users => {
        this.setState({robots: users})
      });
  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value});
    // this.setState({robots: filteredRobots});
  }

  render() {
    const filteredRobots = this.state.robots.filter(robot =>
      {return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
    });
    if (!this.state.robots.length) {
      return <h1>LOADING</h1>
    } else {
      return (
        <div className='tc'>
          <h1 className='f2'>RoboFriends</h1>
          <SearchBox searchChange = {this.onSearchChange}/>
          <Scroll>
            <ErrorBoundary>
              <CardList robots = {filteredRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      );
    }
  };
}


export default App;

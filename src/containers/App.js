import React from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js';
import './App.css';
import Scroll from '../components/Scroll.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import {setSearchField, requestRobots} from '../actions.js'


const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends React.Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     robots: []
  //   }
  // }

  componentDidMount() {
    this.props.onRequestRobots();
  }

  // onSearchChange = (event) => {
  //   this.setState({searchfield: event.target.value});
  //   // this.setState({robots: filteredRobots});
  // }

  render() {
    const filteredRobots = this.props.robots.filter(robot =>
      {return robot.name.toLowerCase().includes(this.props.searchField.toLowerCase())
    });
    if (this.props.isPending) {
      return <h1>LOADING</h1>
    } else {
      return (
        <div className='tc'>
          <h1 className='f2'>RoboFriends</h1>
          <SearchBox searchChange = {this.props.onSearchChange}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(App);

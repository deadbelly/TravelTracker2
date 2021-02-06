import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import TripList from '../TripList/TripList'
import Traveler from '../../DataClasses/Traveler'
import Trip from '../../DataClasses/Trip'
import Destination from '../../DataClasses/Destination'
import fetchRequests from '../../fetchRequests'
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      userInfo: {
        id: NaN,
        name: '',
        travelerType: '',
        trips:[],
      },
      destinations: []
    }
  }

  componentDidMount() {
    Promise.all(fetchRequests.getAllData(46))
       .then(responses => this.generateDataClasses(responses[0], responses[1], responses[2]))
  }

  generateDataClasses(userData, tripData, destinationData) {
    this.setState({destinations: destinationData.destinations.map(data => new Destination(data))})
    this.setState(new Traveler(userData, tripData.trips, this.state.destinations))
  }

  render() {
    return (
      <>
        <Sidebar />
        <main>
          <h1>TRAVEL TRACKER</h1>
          <TripList />
        </main>
      </>
    )
  }
}

export default App;

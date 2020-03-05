import React, { Component } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getJourneysQuery } from '../queries/queries';
import JourneysDetails from './JourneyDetails';

class JourneyList extends Component {
  state = {
    journeyId: ''
  }
  render() {
    const JourneyDataList = () => {
      const { loading, error, data } = useQuery(getJourneysQuery);
      console.log(data);
      
      if (loading) return <p>Loading...</p>
      if (!data) return <></>
      if (error) return `Error! ${error}`;

      return (
        <>
          {data.journeys.map(journey => {
            return <li key={journey.id} onClick={() => {this.setState({journeyId: journey.id})}}>{journey.title}</li>
          })}
        </>
      )
    }

    return (
      <div className="journey-list">
        <ul>
          <JourneyDataList/>
        </ul>
        <JourneysDetails journeyId={this.state.journeyId} />
      </div> 
    )   
  }
}

export default JourneyList;
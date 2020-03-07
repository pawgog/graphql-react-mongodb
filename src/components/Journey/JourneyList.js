import React, { Component } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getJourneysQuery } from '../../queries/queries';
import JourneysDetails from './JourneyDetails';

class JourneyList extends Component {
  state = {
    journeyId: ''
  };

  render() {
    const JourneyDataList = () => {
      const { loading, error, data } = useQuery(getJourneysQuery);

      if (loading) return <p>Loading...</p>;
      if (!data) return <></>;
      if (error) return `Error! ${error}`;

      return (
        <>
          {data.journeys.map(journey => {
            return (
              <li
                key={journey.id}
                onClick={() => {
                  this.setState({ journeyId: journey.id });
                }}
              >
                {journey.title}
              </li>
            );
          })}
        </>
      );
    };

    return (
      <div className="journey-list">
        <h1>Journeys</h1>
        <div className="journey-list__content">
          <ul>
            <JourneyDataList />
          </ul>
          <JourneysDetails journeyId={this.state.journeyId} />
        </div>
      </div>
    );
  }
}

export default JourneyList;

import React, { Component } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getJourneysQuery } from '../../queries/queries';
import JourneyDetails from './JourneyDetails';
import RemoveJourney from './RemoveJourney';

class JourneyList extends Component {
  state = {
    journeyId: ''
  };

  setEmptyJourneyId = () => {
    this.setState({
      journeyId: ''
    });
  };

  render() {
    const JourneyDataList = () => {
      const { loading, error, data } = useQuery(getJourneysQuery);

      if (loading) return <p>Loading...</p>;
      if (!data) return <></>;
      if (error) return `Error! ${error}`;
      console.log(data.journeys);

      return (
        <>
          {data.journeys
            .sort(
              ({ date: previousDate }, { date: nextDate }) =>
                new Date(previousDate) - new Date(nextDate)
            )
            .map(journey => {
              return (
                <li
                  key={journey.id}
                  onClick={() => {
                    this.setState({ journeyId: journey.id });
                  }}
                >
                  <span>{journey.date}</span>
                  {journey.title}
                  <RemoveJourney
                    setEmptyJourneyId={this.setEmptyJourneyId}
                    journeyId={journey.id}
                  />
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
          <JourneyDetails journeyId={this.state.journeyId} />
        </div>
      </div>
    );
  }
}

export default JourneyList;

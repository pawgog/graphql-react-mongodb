import React, { Component } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getJourneysQuery, removeJourneyMutation } from '../../queries/queries';
import JourneysDetails from './JourneyDetails';

class JourneyList extends Component {
  state = {
    journeyId: ''
  };

  render() {
    const JourneyDataList = () => {
      const [removeJourney] = useMutation(removeJourneyMutation, {
        update(cache, { data: { removeJourney } }) {
          const { journeys } = cache.readQuery({ query: getJourneysQuery });
          const newData = {
            journeys: journeys.filter(t => t.id !== removeJourney.id)
          };

          cache.writeQuery({
            query: getJourneysQuery,
            data: newData
          });
        }
      });

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
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    removeJourney({
                      variables: {
                        id: journey.id
                      }
                    });
                  }}
                >
                  X
                </button>
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

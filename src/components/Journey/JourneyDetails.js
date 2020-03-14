import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getJourneyQuery } from '../../queries/queries';
import UpdateJourney from './UpdateJourney';

const JourneyDetails = ({ journeyId }) => {
  const { loading, error, data } = useQuery(getJourneyQuery, {
    variables: { id: journeyId }
  });

  if (loading)
    return (
      <div className="journey-details">
        <p>Loading journey...</p>
      </div>
    );
  if (!data || journeyId === '')
    return (
      <div className="journey-details">
        <p>Please select journey...</p>
      </div>
    );
  if (error) return `Error! ${error}`;

  const { title, description, author } = data.journey;
  return (
    <div>
      <div className="journey-details">
        <div className="journey-details__content">
          <h2>{title}</h2>
          <h5>({author.name})</h5>
          <p>{description}</p>
          <h4>All author journeys:</h4>
          <ol>
            {author.journeys.map(item => {
              return <li key={item.id}>{item.title}</li>;
            })}
          </ol>
        </div>
      </div>
      <UpdateJourney
        id={journeyId}
        titleJourney={title}
        descriptionJourney={description}
      />
    </div>
  );
};

export default JourneyDetails;

import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getJourneyQuery } from '../queries/queries';

const JourneyDetails = ({ journeyId }) => {
  const { loading, error, data } = useQuery(getJourneyQuery, {
    variables: { id: journeyId },
  });

  if (loading) return <p>Loading journey...</p>;
  if (!data) return <><p>Please select journey...</p></>
  if (error) return `Error! ${error}`;

  const { title, description, author } = data.journey
  return (
    <>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{author.name}</p>
      <p>All author journeys:</p>
      <ul>
        {author.journeys.map(item => {
            return <li key={item.id}>{item.title}</li>
        })
        }
      </ul>
    </>
  );
}

export default JourneyDetails;
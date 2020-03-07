import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { getJourneysQuery, removeJourneyMutation } from '../../queries/queries';

const RemoveJourney = ({ journeyId, setEmptyJourneyId }) => {
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

  return (
    <button
      type="button"
      onClick={e => {
        e.stopPropagation();
        removeJourney({
          variables: {
            id: journeyId
          }
        });
        setEmptyJourneyId();
      }}
    >
      X
    </button>
  );
};

export default RemoveJourney;

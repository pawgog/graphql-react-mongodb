import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { getJourneysQuery, updateJourneyMutation } from '../../queries/queries';

const UpdateJourney = ({ id, titleJourney, descriptionJourney }) => {
  let title = titleJourney;
  let description = descriptionJourney;
  const [updateJourney] = useMutation(updateJourneyMutation);
  const [blockDisplay, changeBlockDisplay] = useState(false);

  return (
    <>
      {blockDisplay ? (
        <form
          className="journey-update-item"
          onSubmit={e => {
            e.preventDefault();
            updateJourney({
              variables: {
                id,
                title: title.value,
                description: description.value
              },
              refetchQueries: [{ query: getJourneysQuery }]
            });
            changeBlockDisplay(false);
          }}
        >
          <div className="journey-update-item__block">
            <label>Journey title:</label>
            <input
              type="text"
              ref={node => {
                title = node;
              }}
              defaultValue={title}
              required
            />
          </div>
          <div className="journey-update-item__block">
            <label>Description:</label>
            <textarea
              rows="6"
              cols="35"
              ref={node => {
                description = node;
              }}
              defaultValue={description}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      ) : (
        <div className="journey-update-item__button">
          <button onClick={() => changeBlockDisplay(true)} type="button">
            Change journey
          </button>
        </div>
      )}
    </>
  );
};

export default UpdateJourney;

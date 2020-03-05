import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAuthorsQuery, getJourneysQuery, addJourneyMutation } from '../queries/queries';

const AuthorDataList = () => {
  const { data } = useQuery(getAuthorsQuery);
  if (!data) return <><option disabled>Loading authors...</option></>

  return (
    <>
      {data.authors.map(author => {
        return <option key={author.id} value={author.id}>{author.name}</option>
      })}
    </>
  )
}

const AddJourney = () => {
    let title;
    let description;
    let authorId;
    const [addJourney] = useMutation(addJourneyMutation);
    return (
      <>
        <form onSubmit={e => {
          e.preventDefault();
          
          addJourney({ variables: { 
            title: title.value,
            description: description.value,
            authorId: authorId.value
          },
          refetchQueries: [{ query: getJourneysQuery }]
        });
        }}>
          <div>
            <label>Journey title:</label>
            <input type="text" ref={node => {title = node;}}/>
          </div>
          <div>
            <label>Description:</label>
            <textarea rows="4" cols="40" ref={node => {description = node;}}/>
          </div>
          <div>
            <label>Author:</label>
            <select  ref={node => {authorId = node;}}>
              <option>Select author</option>
              <AuthorDataList />
            </select>
          </div>
          <button type="submit">Add</button>
        </form>
      </>
    )
  }

export default AddJourney;
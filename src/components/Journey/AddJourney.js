import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAuthorsQuery, getJourneysQuery, addJourneyMutation } from '../../queries/queries';

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
        <form className="journey-new-item" onSubmit={e => {
          e.preventDefault();
          
          addJourney({ variables: { 
            title: title.value,
            description: description.value,
            authorId: authorId.value
          },
          refetchQueries: [{ query: getJourneysQuery }]
        });
          title.value = '';
          description.value = '';
          authorId.selectedIndex  = 0;
        }}>
          <div className="journey-new-item__block">
            <label>Journey title:</label>
            <input type="text" ref={node => {title = node;}} required/>
          </div>
          <div className="journey-new-item__block">
            <label>Author:</label>
            <select ref={node => {authorId = node;}} required>
              <option value="">Select author</option>
              <AuthorDataList />
            </select>
          </div>
          <div className="journey-new-item__block">
            <label>Description:</label>
            <textarea rows="6" cols="35" ref={node => {description = node;}}/>
          </div>
          <button type="submit">+</button>
        </form>
      </>
    )
  }

export default AddJourney;
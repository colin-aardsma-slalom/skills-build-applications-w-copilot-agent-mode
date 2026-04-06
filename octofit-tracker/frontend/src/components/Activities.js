import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const apiUrl = `https://${codespace}-8000.app.github.dev/api/activities/`;
        
        console.log('Fetching Activities from API:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities data fetched:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesList = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed activities list:', activitiesList);
        
        setActivities(activitiesList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading activities...</p></div>;
  if (error) return <div className="container mt-5 alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.id}</td>
                  <td>{activity.name || 'N/A'}</td>
                  <td>{activity.description || 'N/A'}</td>
                  <td>{activity.date || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Activities;

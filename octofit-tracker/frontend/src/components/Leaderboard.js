import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
        const apiUrl = `https://${codespace}-8000.app.github.dev/api/leaderboard/`;
        
        console.log('Fetching Leaderboard from API:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard data fetched:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardList = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed leaderboard list:', leaderboardList);
        
        setLeaderboard(leaderboardList);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading leaderboard...</p></div>;
  if (error) return <div className="container mt-5 alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p>No leaderboard data found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id || index}>
                  <td>{index + 1}</td>
                  <td>{entry.user || entry.username || 'N/A'}</td>
                  <td>{entry.score || 'N/A'}</td>
                  <td>{entry.points || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;

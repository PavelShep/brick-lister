import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Sets() {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = await fetch('/media/sets.json');
        if (!response.ok) {
          throw new Error('Failed to fetch sets');
        }
        const data = await response.json();
        setSets(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSets();
  }, []);

  // Function to check if a file exists by attempting to fetch it
  const checkFileExists = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };

  // State to track file existence for each set
  const [fileAvailability, setFileAvailability] = useState({});

  useEffect(() => {
    const checkFiles = async () => {
      const availability = {};
      for (const set of sets) {
        availability[set.id] = {
          image: set.image ? await checkFileExists(set.image) : false,
          partsCsv: set.partsCsv ? await checkFileExists(set.partsCsv) : false,
          instructions: set.instructions ? await checkFileExists(set.instructions) : false,
        };
      }
      setFileAvailability(availability);
    };

    if (sets.length > 0) {
      checkFiles();
    }
  }, [sets]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="sets">
      <h2>Zestawy (Sets)</h2>
      <div className="sets-grid">
        {sets.map((set) => {
          const files = fileAvailability[set.id] || {};
          const hasImage = files.image;
          const hasPartsCsv = files.partsCsv;
          const hasInstructions = files.instructions;

          // Skip rendering the tile if no files are available
          if (!hasImage && !hasPartsCsv && !hasInstructions) {
            return null;
          }

          return (
            <div key={set.id} className="set-tile">
              <h3>{set.id}</h3>
              {hasImage && (
                <img src={set.image} alt={set.name} width="150" height="150" />
              )}
              {hasPartsCsv && (
                <Link to={`/parts?set=${set.id}`}>Lista części</Link>
              )}
              {hasInstructions && (
                <a href={set.instructions} target="_blank" rel="noopener noreferrer">
                  Instrukcja
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sets;
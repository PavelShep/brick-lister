import { useState, useEffect } from 'react';
import SplitScreen from '../components/SplitScreen';
import Form from '../components/Form';

function Help() {
  const [faq, setFaq] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [layoutDirection, setLayoutDirection] = useState('left-right'); // State for layout direction

  // Load FAQ data from faq.json using React Hooks
  useEffect(() => {
    const loadFaq = async () => {
      try {
        const response = await fetch('/media/faq.json');
        if (!response.ok) {
          throw new Error('Failed to fetch FAQ');
        }
        const data = await response.json();
        setFaq(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadFaq();
  }, []);

  // Toggle layout direction between left-right and top-bottom
  const toggleLayout = () => {
    setLayoutDirection((prev) =>
      prev === 'left-right' ? 'top-bottom' : 'left-right'
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="help">
      <h2>Strona Pomoc</h2>
      <div className="layout-actions">
        <button onClick={toggleLayout}>
          Zmień układ na {layoutDirection === 'left-right' ? 'pionowy' : 'poziomy'}
        </button>
      </div>
      <SplitScreen direction={layoutDirection} splitRatio={0.5}>
        {/* Left/Top Panel: FAQ Section */}
        <div className="faq-section">
          <h3>Tematy Pomocy</h3>
          {faq.map((item, index) => (
            <div key={index} className="faq-item">
              <p><strong>Pytanie {index + 1}. {item.question}</strong></p>
              <p>Odpowiedź: {item.answer}</p>
            </div>
          ))}
        </div>
        {/* Right/Bottom Panel: Functional Information */}
        <Form />
      </SplitScreen>
    </div>
  );
}

export default Help;
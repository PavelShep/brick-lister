import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CsvDownloader from 'react-csv-downloader';
import ListItem from '../components/ListItem';
import usePartValue from '../hooks/usePartValue';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Import autoTable explicitly

function Parts() {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const setId = queryParams.get('set') || '6541'; // Default to 6277 if no set ID

  // Use the custom Hook to manage part values
  const { formattedTotalValue } = usePartValue(parts);

  // Function to generate a random price between 0.05 and 1.00 PLN
  const generateRandomPrice = () => {
    const min = 0.05;
    const max = 1.00;
    const price = Math.random() * (max - min) + min;
    return parseFloat(price.toFixed(2)); // Round to 2 decimal places
  };

  // Load parts from WebStorage or fetch from CSV
  useEffect(() => {
    const loadParts = async () => {
      const storageKey = `parts_${setId}`;
      const storedParts = localStorage.getItem(storageKey);

      if (storedParts) {
        setParts(JSON.parse(storedParts));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/media/${setId}_parts.csv`);
        if (!response.ok) {
          throw new Error('Failed to fetch parts');
        }
        const text = await response.text();
        const rows = text.trim().split('\n').slice(1); // Skip header
        const parsedParts = rows.map((row, index) => {
          const [name, elementId, quantity, image] = row.split(',');
          return {
            id: index,
            name,
            elementId,
            quantity: parseInt(quantity),
            image,
            price: generateRandomPrice(), // Generate random price
          };
        });

        setParts(parsedParts);
        localStorage.setItem(storageKey, JSON.stringify(parsedParts));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadParts();
  }, [setId]);

  // Update WebStorage when parts change (e.g., quantity adjustments)
  useEffect(() => {
    if (parts.length > 0) {
      localStorage.setItem(`parts_${setId}`, JSON.stringify(parts));
    }
  }, [parts, setId]);

  // Handle quantity changes
  const updateQuantity = (id, delta) => {
    setParts((prevParts) =>
      prevParts.map((part) =>
        part.id === id
          ? { ...part, quantity: Math.max(1, part.quantity + delta) }
          : part
      )
    );
  };

  // Prepare data for CSV download
  const csvData = parts.map((part) => ({
    Name: part.name,
    'Element ID': part.elementId,
    Quantity: part.quantity,
    Price: part.price,
    Value: (part.quantity * part.price).toFixed(2),
  }));

  // Generate PDF
  const generatePDF = () => {
  const doc = new jsPDF();

  // Helper function to replace Polish characters with ASCII equivalents
  const replacePolishChars = (str) => {
      const polishChars = {
      'ą': 'a',
      'ć': 'c',
      'ę': 'e',
      'ł': 'l',
      'ń': 'n',
      'ó': 'o',
      'ś': 's',
      'ź': 'z',
      'ż': 'z',
      'Ą': 'A',
      'Ć': 'C',
      'Ę': 'E',
      'Ł': 'L',
      'Ń': 'N',
      'Ó': 'O',
      'Ś': 'S',
      'Ź': 'Z',
      'Ż': 'Z',
      };
      return str.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (char) => polishChars[char] || char);
  };

  // Add title with replaced characters
  const title = replacePolishChars(`Części - Zestaw ${setId}`);
  doc.text(title, 14, 20);

  // Define table columns with replaced characters
  const tableColumns = [
      'Nazwa',
      'Numer',
      'Ilosc', // "Ilość" → "Ilosc"
      'Cena (PLN)',
      'Wartosc (PLN)', // "Wartość" → "Wartosc"
  ].map(replacePolishChars);

  // Prepare table rows with replaced characters
  const tableRows = parts.map((part) => [
      replacePolishChars(part.name), // Replace Polish chars in part name
      part.elementId,
      part.quantity.toString(),
      part.price.toFixed(2),
      (part.quantity * part.price).toFixed(2),
  ]);

  // Add table to PDF using autoTable
  autoTable(doc, {
      head: [tableColumns],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 123, 255] }, // Blue header
      margin: { top: 30 },
  });

  // Add total value below the table with replaced characters
  const totalText = replacePolishChars(`Całkowita wartość: ${formattedTotalValue}`);
  const finalY = doc.lastAutoTable.finalY || 30;
  doc.text(totalText, 14, finalY + 10);

  // Save the PDF
  doc.save(`parts_${setId}.pdf`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="parts">
      <h2>Części (Parts) - Zestaw {setId}</h2>
      <div className="parts-actions">
        <CsvDownloader
          filename={`parts_${setId}`}
          extension=".csv"
          separator=","
          columns={[
            { id: 'Name', displayName: 'Nazwa' },
            { id: 'Element ID', displayName: 'Numer' },
            { id: 'Quantity', displayName: 'Ilość' },
            { id: 'Price', displayName: 'Cena' },
            { id: 'Value', displayName: 'Wartość' },
          ]}
          datas={csvData}
        >
          <button>Pobierz CSV</button>
        </CsvDownloader>
        <button onClick={generatePDF}>Generuj PDF</button>
      </div>
      <table className="parts-table">
        <thead>
          <tr>
            <th>Obraz</th>
            <th>Nazwa / Numer</th>
            <th>Ilość</th>
            <th>Cena</th>
            <th>Wartość</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <ListItem
              key={part.id}
              part={part}
              onQuantityChange={(delta) => updateQuantity(part.id, delta)}
            />
          ))}
        </tbody>
      </table>
      <div className="total-value">
        Całkowita wartość: {formattedTotalValue}
      </div>
    </div>
  );
}

export default Parts;
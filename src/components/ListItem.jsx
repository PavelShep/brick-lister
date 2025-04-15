import usePartValue from '../hooks/usePartValue';

function ListItem({ part, onQuantityChange }) {
  // Use the custom Hook to calculate the value for this part
  const { calculateValue } = usePartValue();
  const { formattedValue } = calculateValue(part);

  return (
    <tr>
      <td>
        {part.image ? (
          <img src={part.image} alt={part.name} width="50" height="50" />
        ) : (
          'N/A'
        )}
      </td>
      <td>
        {part.name} / {part.elementId}
      </td>
      <td>
        <button onClick={() => onQuantityChange(-1)}>-</button>
        {part.quantity}
        <button onClick={() => onQuantityChange(1)}>+</button>
      </td>
      <td>{part.price.toFixed(2)} PLN</td>
      <td>{formattedValue}</td>
    </tr>
  );
}

export default ListItem;
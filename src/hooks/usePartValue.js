import { useState, useEffect } from 'react';

function usePartValue(parts = []) {
  // Calculate the value (quantity * price) for a single part
  const calculateValue = (part) => {
    const value = part.quantity * part.price;
    return {
      value,
      formattedValue: `${value.toFixed(2)} PLN`,
    };
  };

  // Calculate the total value for all parts
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const calculatedTotal = parts.reduce((sum, part) => {
      return sum + part.quantity * part.price;
    }, 0);
    setTotalValue(calculatedTotal);
  }, [parts]);

  // Format the total value with currency
  const formattedTotalValue = `${totalValue.toFixed(2)} PLN`;

  return {
    calculateValue,
    totalValue,
    formattedTotalValue,
  };
}

export default usePartValue;
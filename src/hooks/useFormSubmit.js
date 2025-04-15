import { useState } from 'react';

const useFormSubmit = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3307/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submission successful:', result);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ title: '', author: '', content: '' });
      }, 3000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Wystąpił błąd podczas wysyłania formularza');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    submitted,
    error,
    loading,
    handleChange,
    handleSubmit,
  };
};

export default useFormSubmit;
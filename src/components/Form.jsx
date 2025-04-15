import useFormSubmit from '../hooks/useFormSubmit';

function Form() {
  const { formData, submitted, error, loading, handleChange, handleSubmit } = useFormSubmit();

  return (
    <div className="functional-info">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <strong>Tytul:</strong>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Wpisz typ wiadomości"
            required
          />
        </div>
        <div className="form-group">
          <label>
            <strong>Autor:</strong>
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Wpisz imię autora"
            required
          />
        </div>
        <div className="form-group">
          <label>
            <strong>Tresc:</strong>
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Wpisz treść wiadomości"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Wysyłanie...' : 'Wyslij'}
        </button>
      </form>
      {submitted && (
        <p className="success-message">Wiadomość została wysłana!</p>
      )}
      {error && (
        <p className="error-message">{error}</p>
      )}
    </div>
  );
}

export default Form;
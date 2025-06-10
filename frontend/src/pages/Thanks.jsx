export default function Thanks() {
  return (
    <div className="container" style={{ textAlign: 'center', paddingTop: '10vh' }}>
      <h2>Thank you for your donation!</h2>
      <p>Your contribution makes a difference and helps us fulfill our mission.</p>
      <button
        className="button"
        onClick={() => window.location.href = '/user'}
        style={{ marginTop: '4vh' }}
      >
        Return to home
      </button>
    </div>
  );
}
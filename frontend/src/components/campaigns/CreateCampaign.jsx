import { useEffect, useState } from 'react';
import { VITE_API_URL } from '../../config/config';
import '../../styles/campaign/createCampaign.css';

const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    goalAmount: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${VITE_API_URL}/api/campaign`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      setCampaigns(data);
    } catch (err) {
      console.error('Error loading campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(`${VITE_API_URL}/api/campaign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          goal_amount: parseFloat(form.goalAmount)
        })
      });
      setForm({ title: '', description: '', goalAmount: '' });
      await loadCampaigns();
    } catch (err) {
      console.error('Error creating campaign:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="campaignManagerContainer">
      <h2>Create campaign</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '4vh', color: 'black' }}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className='campaignCreateInput'
          required
          style={{
            display: 'block',
            width: '50%',
            padding: '1vh',
            marginBottom: '2vh',
            borderRadius: '0.5vh',
            border: '1px solid #ccc', color: 'black'
          }}
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows="3"
          required
          className='campaignCreateInput'
          style={{
            display: 'block',
            width: '50%',
            padding: '1vh',
            marginBottom: '2vh',
            borderRadius: '0.5vh',
            border: '1px solid #ccc', color: 'black'
          }}
        />
        <input
          name="goalAmount"
          type="number"
          value={form.goalAmount}
          onChange={handleChange}
          placeholder="Goal amount (USD)"
          required
          className='campaignCreateInput'
          style={{
            display: 'block',
            width: '25%',
            padding: '1vh',
            marginBottom: '2vh',
            borderRadius: '0.5vh',
            border: '1px solid #ccc', color: 'black'
          }}
        />
        <button
          type="submit"
          className="button"
          disabled={submitting}
          style={{ opacity: submitting ? 0.6 : 1, color: 'white' }}
        >
          {submitting ? 'Creating...' : 'Create campaign'}
        </button>
      </form>

      <h2 style={{ marginBottom: '2vh' }}>Campaigns</h2>
      {loading ? (
        <p>Loading campaigns…</p>
      ) : campaigns.length === 0 ? (
        <p>No campaigns yet.</p>
      ) : (
                <table className="campaignsTable">
                    <thead>
                        <tr>
                            <th className="tableHeader">ID</th>
                            <th className="tableHeader">Title</th>
                            <th className="tableHeader">Description</th>
                            <th className="tableHeader">Goal Amount (USD)</th>
                            <th className="tableHeader">Collected Amount (USD)</th>
                            <th className="tableHeader">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.length > 0 ? (
                            campaigns.map(c => (
                                <tr key={c.id} className="tableRow">
                                    <td className="tableCell">{c.id}</td>
                                    <td className="tableCell">{c.title}</td>
                                    <td className="tableCell descriptionCell">{c.description}</td>
                                    <td className="tableCell amountCell">{parseFloat(c.goal_amount).toFixed(2)}</td>
                                    <td className="tableCell amountCell">{parseFloat(c.collected_amount).toFixed(2)}</td>
                                    <td className="tableCell dateCell">
                                        {new Date(c.create_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="emptyRow">
                                <td colSpan="6" className="emptyCell">No campaigns found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
      )}
    </div>
  );
}

export default CampaignManager;
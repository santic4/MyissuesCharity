import { useState } from 'react';
import { VITE_API_URL } from '../../config/config.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/seniorInteraction/seniorInteractionForm.css';

const ScheduleSeniorCallForm = () => {
  const [agentId, setAgentId] = useState('');
  const [summary, setSummary] = useState('');

  const submit = async e => {
    e.preventDefault();
    try {
      const payload = {
        agent_id: agentId,
        summary
      };

      const res = await fetch(`${VITE_API_URL}/api/interaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payload),
        credentials: 'include'
      });

      if (!res.ok) throw new Error('Error scheduling interaction.');

      const data = await res.json();
      console.log(data, 'seniorResponse');

      toast.success('Call scheduled successfully!');

      setAgentId('');
      setSummary('');
    } catch (err) {
      console.error('Error scheduling call:', err);
      toast.error('Failed to schedule call. Please try again.');
    }
  };

  return (
    <>
      <form onSubmit={submit} className="callForm">
        <div className="formGroup">
          <label htmlFor="agentId" className="formLabel">
            Agent ID
          </label>
          <select
            id="agentId"
            value={agentId}
            onChange={e => setAgentId(e.target.value)}
            required
            className="formSelect"
          >
            <option value="" disabled>
              -- Select an agent --
            </option>
            <option value="1">Agent 1</option>
            <option value="2">Agent 2</option>
            <option value="3">Agent 3</option>
          </select>
        </div>

        <div className="formGroup">
          <label htmlFor="summary" className="formLabel">
            Summary
          </label>
          <input
            id="summary"
            type="text"
            value={summary}
            onChange={e => setSummary(e.target.value)}
            required
            placeholder="Brief summary of the call"
            className="formInput"
          />
        </div>

        <button type="submit" className="submitButton">
          Schedule Call
        </button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ScheduleSeniorCallForm;
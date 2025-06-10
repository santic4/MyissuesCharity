// src/components/DonationForm.jsx
import React, { useState } from 'react';
import { postDonation } from '../api/api.js';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/donatePage.css';

export default function DonationForm({ campaign }) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('stripe');
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await postDonation(campaign.id, parseFloat(amount), method);
      nav('/thanks');
    } catch (err) {
      console.error(err);
      alert('Error. Try later please.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
     <form onSubmit={handleSubmit} className="donationForm">
        <h3 className="formTitle">Donate to {campaign.title}</h3>
        <p className="formDescription">{campaign.description}</p>

        <label className="formLabel">
          Amount (USD):
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
            className="formInputDonation"
          />
        </label>

        <label className="formLabel">
          Payment method:
          <select
            value={method}
            onChange={e => setMethod(e.target.value)}
            className="formSelectDonation"
          >
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="submitButton"
        >
          {submitting ? 'Procesing...' : 'Donate'}
        </button>
      </form>
  );
}

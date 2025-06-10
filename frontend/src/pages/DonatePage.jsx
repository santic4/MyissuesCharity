import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CampaignCard from '../components/CampaignCard';
import DonationForm from '../components/DonationForm';
import { fetchCampaign } from '../api/api';
import '../styles/pages/donatePage.css';

export default function Donate() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaign(id)
      .then(data => setCampaign(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="container">Loading campaign…</p>;
  if (!campaign) return <p className="container">Campaign not found.</p>;

  return (
    <div className="donateContainer">
      <DonationForm campaign={campaign} />
    </div>
  );
}
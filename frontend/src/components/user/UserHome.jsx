import React, { useEffect, useState } from 'react';
import { fetchCampaigns } from '../../api/api.js';
import CampaignCard from '../CampaignCard';
import '../../styles/pages/userHome.css';

export default function UserHome() {
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => { 
    fetchCampaigns()
      .then(setCampaigns); 
  }, []);

  if(campaigns.length < 1){
    return(
      <div className="campaignContainer">
        <p>There are no campaigns yet.</p>
      </div>
    )
  }
  return (
    <div className="campaignContainer">
      {campaigns.map(c => <CampaignCard key={c.id} campaign={c} />)}
    </div>
  );
}
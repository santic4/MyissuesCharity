import { Link } from "react-router-dom";
import '../styles/campaign/campaignCard.css';
import { useState } from "react";


const CampaignCard = ({ campaign }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="campaignCard">
      <h3 className="campaignTitle">{campaign.title}</h3>
      <p
        className={`campaignDescription ${
          expanded ? 'expanded' : 'collapsed'
        }`}
      >
        {campaign.description}
      </p>

      {campaign.description.split(' ').length > 20 && (
        <button
          className="readMoreButton"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}

      <p className="campaignProgress">
        {parseFloat(campaign.collected_amount).toFixed(2)} /{' '}
        {parseFloat(campaign.goal_amount).toFixed(2)}
      </p>

      <Link to={`/donate/${campaign.id}`}>
        <button className="donateButton">Donate</button>
      </Link>
    </div>
  );
};

export default CampaignCard
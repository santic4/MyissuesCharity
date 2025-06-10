import { Link } from "react-router-dom";
import '../styles/campaign/campaignCard.css';

const CampaignCard = ({ campaign }) => {
    return(
        <div className="campaignCard">
          <h3 className="campaignTitle">{campaign.title}</h3>
          <p className="campaignDescription">{campaign.description}</p>
          <p className="campaignProgress">
            {campaign.collected_amount} / {campaign.goal_amount}
          </p>
          <Link to={`/donate/${campaign.id}`}>
            <button className="donateButton">Donate</button>
          </Link>
        </div>
    )
}

export default CampaignCard
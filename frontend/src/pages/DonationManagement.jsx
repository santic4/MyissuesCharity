import { useState, useEffect } from "react";
import { VITE_API_URL } from "../config/config";
import '../styles/admin/donationManagement.css';
import { fetchCampaigns } from "../api/api";

const DonationManagement = () => {
    const [dons, setDons] = useState([]);

    useEffect(() => {
        fetchCampaigns()
            .then(data => setDons(data))
            console.log(dons,'dons');
    }, [])
    
    return(
        <section className="donationContainer">
            <h3 className="sectionTitle">Donation Management</h3>

            {dons && dons.length > 0 ? (
                <ul className="donationList">
                    {dons.map((donation) => (
                        <li key={donation.id} className="donationItem">
                            <span className="donor">User id: {donation.user_id}</span> donated
                            <span className="amount"> ${donation.amount}</span> to
                            <span className="campaign"> Campaign id: {donation.campaign_id}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="noDonationsText">No donations yet.</p>
            )}
        </section>
    )
} 

export default DonationManagement;
import { useState, useEffect } from "react";
import '../styles/admin/donationManagement.css';
import { fetchDonations } from "../api/api";

const DonationManagement = () => {
    const [dons, setDons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const loadDonations = async () => {
        try {
          const data = await fetchDonations();
          setDons(data);
        } catch (err) {
          console.error('Error fetching donations:', err);
          setError('Failed to load donations.');
        } finally {
          setLoading(false);
        }
      };
      loadDonations();
    }, []);

      if (loading) {
          return (
            <section className="donationContainer">
              <h3 className="donationSectionTitle">Donation Management</h3>
              <p className="noDonationsText">Loading donations…</p>
            </section>
          );
        }
    
        if (error) {
          return (
            <section className="donationContainer">
              <h3 className="donationSectionTitle">Donation Management</h3>
              <p className="noDonationsText">{error}</p>
            </section>
          );
        }
    
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
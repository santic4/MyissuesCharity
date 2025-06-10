import { useEffect } from "react";
import { useState } from "react"
import { VITE_API_URL } from "../config/config";
import '../styles/admin/interactionManagement.css';

const InteractionManagement = () => {
    const [ints, setInts] = useState([]);
    useEffect(() => {
        fetch(`${VITE_API_URL}/api/interaction`)
            .then(r=>r.json())
            .then(setInts)
    }, [])

    if(!ints) return <p>Loading...</p>

    return(
        <section className="interactionContainer">
            <h3 className="sectionTitle">Interaction Management</h3>

            {ints.length > 0 ? (
                <ul className="interactionList">
                    {ints.map((i) => (
                        <li key={i.id} className="interactionItem">
                            <span className="senior">Senior {i.senior_id}</span> with{" "}
                            <span className="agent">Agent {i.agent_id}</span>:{" "}
                            <span className="summary">{i.summary}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="noInteractionsText">No interactions yet.</p>
            )}
        </section>
    )
}

export default InteractionManagement;
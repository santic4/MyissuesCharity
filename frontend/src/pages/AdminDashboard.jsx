import { Link, NavLink, Outlet } from "react-router-dom";
import '../styles/admin/adminDashboard.css';

const AdminDashboard = () => {
    return(
    <section className="dashboardContainer">
      <div className="dashboardChildren">
        <nav className="dashboardNav">
          <NavLink
            to="users"
            className={({ isActive }) =>
              isActive ? "dashboardLinkActive" : "dashboardLink"
            }
          >
            Users
          </NavLink>
          <NavLink
            to="donations"
            className={({ isActive }) =>
              isActive ? "dashboardLinkActive" : "dashboardLink"
            }
          >
            Donations
          </NavLink>
          <NavLink
            to="interactions"
            className={({ isActive }) =>
              isActive ? "dashboardLinkActive" : "dashboardLink"
            }
          >
            Interactions

          </NavLink>

          <NavLink
            to="create-campaign"
            className={({ isActive }) =>
              isActive ? "dashboardLinkActive" : "dashboardLink"
            }
          >
            Create campaigns
          </NavLink>
          
        </nav>
        <div className="dashboardOutlet">
          <Outlet />
        </div>
      </div>
    </section>
    )
}

export default AdminDashboard;
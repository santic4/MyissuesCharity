import { useEffect } from "react";
import { useState } from "react"
import { VITE_API_URL } from "../config/config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/admin/usersManagement.css';

const UserManagment = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${VITE_API_URL}/api/users`)
            .then(r=>r.json())
            .then(setUsers)
    }, [])

    async function deleteUser(id) {
        try {
            const response = await fetch(`${VITE_API_URL}/api/users/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            
            if (!response.ok) {
                toast.error('Error to delete.')
            }

            setUsers(users.filter(user => user.id !== id));
            toast.success('User deleted.')
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    return(
        <>
            <section className="userManagmentContainer">
                <h3 className="userManagmentTitle">User Management</h3>
                {users.length > 0 ? (
                  <table className="userTable">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id} className="userTableRow">
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>{u.role}</td>
                          <td>{new Date(u.created_at).toLocaleDateString()}</td>
                          <td>
                            <button
                              onClick={() => deleteUser(u.id)}
                              className="deleteButton"
                              aria-label={`Delete user ${u.name}`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="noUsersText">No users registered yet</p>
                )}
            </section>
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

    )
}

export default UserManagment;
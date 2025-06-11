import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../api/api';
import LoginForm from '../components/login/LoginForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/login/loginAdmin.css';

export default function HomePage() {
  const nav = useNavigate();

  const handleError = message => {
    toast.error(message);
  };

  const handleSuccess = message => {
    toast.success(message);
  };

  const onLoginAdmin = async creds => {
    try {
      const data = await loginAdmin(creds);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', 'admin');
      handleSuccess('Logged in successfully');
      nav('/admin');
    } catch (err) {
      handleError('Invalid credentials');
    }
  };

  return (
    <div className="containerLoginAdmin">
      <ToastContainer position="top-center" />
      <div className='contentLoginAdmin'>
        <h2 className='loginAdminH2'>Admin login</h2>
        <LoginForm onSubmit={onLoginAdmin} />
      </div>
    </div>
  );
}
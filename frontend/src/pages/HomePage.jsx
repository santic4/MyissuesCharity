import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, signupUser } from '../api/api';
import LoginForm from '../components/login/LoginForm';
import Signup from './Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/homePage.css';

export default function HomePage() {
  const [mode, setMode] = useState('loginUser');
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    console.log(token,'token', role,'role')
    if(token && role === 'admin'){
      nav('/admin/users');
    } else if(token && role === 'user'){
      nav('/users')
    } else {
      return
    }
  }, []);

  const handleError = message => {
    toast.error(message);
  };

  const handleSuccess = message => {
    toast.success(message);
  };

  const validateEmail = email => {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
  };

  const onLoginUser = async creds => {
    try {
      const data = await loginUser(creds);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', 'user');
      handleSuccess('Logged in successfully');
      nav('/user');
    } catch (err) {
      handleError('Invalid credentials');
    }
  };

  const onSignup = async info => {
    if (!validateEmail(info.email) || !info.name || !info.password) {
      handleError('Please ensure email is valid and all fields are required');
      return;
    }
    try {
      await signupUser({ ...info, role: 'user' });
      handleSuccess('Account created successfully');
      setMode('loginUser');
    } catch (err) {
      handleError('Please ensure email is valid and all fields are required');
    }
  };

  return (
    <div className="mainContainer">
      <ToastContainer position="top-center" />
      <div className="buttonGroup">
        <button className="navButton" onClick={() => setMode('loginUser')}>Login User</button>
        <button className="navButton" onClick={() => setMode('signup')}>Register user</button>
      </div>
      {mode === 'loginUser' && <LoginForm onSubmit={onLoginUser} />}
      {mode === 'signup' && <Signup onSubmit={onSignup} />}
    </div>
  );
}
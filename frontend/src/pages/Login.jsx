import { useState } from 'react';
import '../styles/login/loginForm.css';

const Signup = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form className='loginForm' onSubmit={e => { e.preventDefault(); onSubmit(form); }}>
      <input className='loginInput' name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input className='loginInput' name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input className='loginInput' name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
      <button className='loginButton' type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
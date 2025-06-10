import { useState } from 'react';
import '../../styles/login/loginForm.css';

export default function LoginForm({ onSubmit }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form className='loginForm' onSubmit={e => { e.preventDefault(); onSubmit({ identifier, password }); }}>
      <input
        type="text"
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
        placeholder="Email"
        className='loginInput'
        required
      />
      <input
        type="password"
        className='loginInput'
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button className='loginButton' type="submit">Login</button>
    </form>
  );
}
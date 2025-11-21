import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) navigate('/');
    else alert('Invalid credentials');
  };

  return (
    <div className="min-h-screen pt-32 flex justify-center px-4 bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100 h-fit">
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-800">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" required className="w-full p-3 border rounded-xl" onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password" required className="w-full p-3 border rounded-xl" onChange={e => setFormData({...formData, password: e.target.value})} />
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition">Log In</button>
        </form>
        <p className="mt-4 text-center text-slate-500">Don't have an account? <Link to="/signup" className="text-green-600 font-bold">Sign Up</Link></p>
      </div>
    </div>
  );
};
export default Login;

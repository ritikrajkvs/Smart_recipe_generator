import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const { signup } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(formData.username, formData.email, formData.password);
    if (success) navigate('/');
    else alert('Signup failed. Email might be taken.');
  };

  return (
    <div className="min-h-screen pt-32 flex justify-center px-4 bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100 h-fit">
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-800">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Username" required className="w-full p-3 border rounded-xl" onChange={e => setFormData({...formData, username: e.target.value})} />
          <input type="email" placeholder="Email" required className="w-full p-3 border rounded-xl" onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Password" required className="w-full p-3 border rounded-xl" onChange={e => setFormData({...formData, password: e.target.value})} />
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition">Sign Up</button>
        </form>
        <p className="mt-4 text-center text-slate-500">Already have an account? <Link to="/login" className="text-green-600 font-bold">Log In</Link></p>
      </div>
    </div>
  );
};
export default Signup;

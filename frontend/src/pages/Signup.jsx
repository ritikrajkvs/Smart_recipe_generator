import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, formData);
      localStorage.setItem('token', res.data.token);
      dispatch(addUser(res.data.user));
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 relative overflow-hidden bg-slate-50 font-sans selection:bg-green-100 selection:text-green-700">
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
         <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl animate-blob animation-delay-2000 will-change-transform"></div>
         <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-200/40 rounded-full blur-3xl animate-blob will-change-transform"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-white/50 ring-1 ring-slate-100/50 transform-gpu transition-all hover:shadow-orange-100/50">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-50 text-3xl mb-4 shadow-sm border border-orange-100">🚀</div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Create Account</h2>
            <p className="text-slate-500 mt-2 text-sm font-medium">Join us to save your favorite recipes forever.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Username</label>
              <input type="text" placeholder="Chef John" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none text-slate-800 font-medium placeholder:text-slate-400" onChange={e => setFormData({...formData, username: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
              <input type="email" placeholder="you@example.com" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none text-slate-800 font-medium placeholder:text-slate-400" onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
              <input type="password" placeholder="••••••••" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all outline-none text-slate-800 font-medium placeholder:text-slate-400" onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>
            <button type="submit" disabled={isLoading} className={`w-full py-4 rounded-2xl font-bold text-lg text-white shadow-xl shadow-orange-200/50 transition-all transform ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-red-500 hover:scale-[1.02] hover:shadow-2xl active:scale-95'}`}>{isLoading ? 'Creating Account...' : 'Sign Up Free'}</button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm font-medium">Already have an account? <Link to="/login" className="text-orange-600 font-bold hover:text-orange-700 hover:underline transition-colors">Log In here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

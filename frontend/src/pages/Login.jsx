import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(formData.email, formData.password);
    if (success) {
      navigate('/');
    } else {
      alert('Invalid credentials');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-slate-50 font-sans selection:bg-green-100 selection:text-green-700">
      
      {/* --- Background Decorations (Animated & Fixed) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         {/* Grid Pattern */}
         <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
         {/* Green Blob (Top Left) */}
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200/40 rounded-full blur-3xl animate-blob will-change-transform"></div>
         {/* Blue Blob (Bottom Right) */}
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-blob animation-delay-2000 will-change-transform"></div>
      </div>

      {/* --- Main Login Card (Centered) --- */}
      <div className="w-full max-w-md relative z-10 p-4">
        <div className="bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-white/60 ring-1 ring-slate-100/50 transform-gpu transition-all hover:shadow-green-100/50">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-50 to-teal-50 text-4xl mb-6 shadow-sm border border-green-100 animate-float">
              👋
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Please enter your credentials to access your account.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                required 
                value={formData.email}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all outline-none text-slate-800 font-medium placeholder:text-slate-400"
                onChange={e => setFormData({...formData, email: e.target.value})} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
                value={formData.password}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all outline-none text-slate-800 font-medium placeholder:text-slate-400"
                onChange={e => setFormData({...formData, password: e.target.value})} 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-bold text-lg text-white shadow-xl shadow-green-200/50 transition-all transform 
                ${isLoading 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:scale-[1.02] hover:shadow-2xl active:scale-95'}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Don't have an account?{' '}
              <Link to="/signup" className="text-green-600 font-bold hover:text-green-700 hover:underline transition-colors">
                Create one now
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;

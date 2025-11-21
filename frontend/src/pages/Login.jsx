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
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 relative overflow-hidden bg-slate-50 font-sans">
      
      {/* --- Background Decorations --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200/40 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* --- Login Card --- */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/50 ring-1 ring-slate-100">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block p-3 rounded-full bg-green-100 text-3xl mb-4 shadow-sm">
              👋
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Enter your details to access your saved recipes.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                required 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none text-slate-800 font-medium placeholder:text-slate-400"
                onChange={e => setFormData({...formData, email: e.target.value})} 
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none text-slate-800 font-medium placeholder:text-slate-400"
                onChange={e => setFormData({...formData, password: e.target.value})} 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 rounded-2xl font-bold text-lg text-white shadow-lg shadow-green-200 transition-all transform 
                ${isLoading 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:scale-[1.02] hover:shadow-xl active:scale-95'}`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
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

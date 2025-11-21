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
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* --- LEFT SIDE: Minimal Form --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 relative z-10">
        
        <div className="mb-12 lg:hidden">
          <span className="text-2xl font-extrabold text-green-600 tracking-tight">RecipeGen</span>
        </div>

        <div className="max-w-sm w-full mx-auto">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Welcome back</h1>
          <p className="text-slate-500 mb-10">Please enter your details to sign in.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-slate-800 font-medium placeholder:text-slate-300"
                onChange={e => setFormData({...formData, email: e.target.value})} 
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all outline-none text-slate-800 font-medium placeholder:text-slate-300"
                onChange={e => setFormData({...formData, password: e.target.value})} 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-green-600/20 transition-all transform hover:-translate-y-0.5 active:scale-95
                ${isLoading 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-slate-900 hover:bg-slate-800'}`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-green-600 font-bold hover:text-green-700 hover:underline transition-colors">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: Aesthetic Visual (Minimal) --- */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-900">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2670&auto=format&fit=crop')" }}
        ></div>

        {/* Aesthetic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 m-16 mt-auto text-white max-w-md">
          <div className="w-12 h-1 bg-green-500 rounded-full mb-6"></div>
          <h2 className="text-4xl font-bold leading-tight mb-4 font-serif tracking-wide">
            "Cooking is like love. It should be entered into with abandon or not at all."
          </h2>
          <p className="text-slate-300 text-lg font-light">
            Discover thousands of recipes based on what you have.
          </p>
        </div>

        {/* Floating Glass Element */}
        <div className="absolute top-12 right-12 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl">
            <span className="text-3xl">🥗</span>
        </div>

      </div>

    </div>
  );
};

export default Login;

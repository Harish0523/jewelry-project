import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { API_BASE_URL } from '../../api';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Connect to XAMPP Backend PHP API
      const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminUsername', data.username || username.trim());

        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          window.location.reload();
        }
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Cannot connect to XAMPP Backend server. Please check Apache & MySQL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0c] flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-md bg-[#141416] border border-amber-500/20 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Top Decorative Glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Brand Monogram Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-14 h-14 bg-neutral-900 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400 shadow-inner">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold tracking-wider text-white">
              ATELIER HARX
            </h1>
            <p className="text-xs text-amber-400 uppercase tracking-widest pt-1 font-semibold">
              Admin Portal
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 bg-red-950/50 border border-red-500/40 rounded-xl text-red-300 text-xs text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
              <Mail size={14} className="text-amber-400" /> Username
            </label>
            <input
              type="text"
              required
              autoComplete="username"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
              <Lock size={14} className="text-amber-400" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-amber-400 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-amber-500/20 mt-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>

        <p className="text-[11px] text-neutral-500 text-center mt-8">
          Protected Area &bull; Atelier Harx Management System
        </p>
      </div>
    </div>
  );
}
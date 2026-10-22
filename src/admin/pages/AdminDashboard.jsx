import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import { Package, Inbox, Sparkles, MessageSquareQuote, ArrowUpRight, RefreshCw, MessageCircle } from 'lucide-react';
import { API_BASE_URL } from '../../api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState(null);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState('');

  useEffect(() => {
    fetchLiveDashboardData();
  }, []);

  const fetchLiveDashboardData = async () => {
    try {
      setLoading(true);
      setDashboardError('');
      const response = await fetch(`${API_BASE_URL}/dashboard/get_stats.php`, { credentials: 'include' });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to load dashboard data.');
      }
      setStatsData(data.stats);
      setRecentInquiries(data.recent_inquiries || []);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
      setDashboardError('Live dashboard data is unavailable. Check the PHP/MySQL connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Products"
          value={loading ? '...' : statsData ? `${statsData.total_products} Items` : '—'}
          icon={<Package size={24} />}
          change={statsData ? 'In product catalog' : dashboardError ? 'Live data unavailable' : ''}
          isPositive={true}
        />
        <StatsCard
          title="Total Inquiries"
          value={loading ? '...' : statsData ? `${statsData.total_inquiries} Requests` : '—'}
          icon={<Inbox size={24} />}
          change={statsData ? `${statsData.pending_inquiries} pending · ${statsData.completed_inquiries} completed` : dashboardError ? 'Live data unavailable' : ''}
          isPositive={false}
        />
        <StatsCard
          title="Active Offers"
          value={loading ? '...' : statsData ? `${statsData.active_offers} Offers` : '—'}
          icon={<Sparkles size={24} />}
          change={statsData ? 'Currently marked active' : dashboardError ? 'Live data unavailable' : ''}
          isPositive={true}
        />
        <StatsCard
          title="Testimonials"
          value={loading ? '...' : statsData ? `${statsData.active_testimonials} Reviews` : '—'}
          icon={<MessageSquareQuote size={24} />}
          change={statsData ? `${Number(statsData.average_rating).toFixed(1)} / 5 average rating` : dashboardError ? 'Live data unavailable' : ''}
          isPositive={true}
        />
      </div>

      {/* 2. Middle Action Banner & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Welcome Banner */}
        <div className="lg:col-span-2 bg-linear-to-r from-amber-950/60 via-[#141416] to-neutral-900 border border-amber-500/30 p-8 rounded-3xl space-y-4 relative overflow-hidden shadow-2xl">
          <span className="text-amber-400 font-bold uppercase text-[10px] tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            QUICK SUMMARY
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Welcome to Atelier Harx Admin System
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm font-light max-w-xl leading-relaxed">
            Manage your jewelry catalog, review customer custom orders, update special offers, and keep website contact details up to date from one secure panel.
          </p>
          
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/admin/products')}
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer"
            >
              <span>Manage Products</span>
              <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => navigate('/admin/inquiries')}
              className="bg-neutral-900 hover:bg-neutral-800 text-amber-300 border border-amber-500/40 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer"
            >
              <span>View Customer Inquiries</span>
            </button>
          </div>
        </div>

        {/* Live Data Status */}
        <div className="bg-[#141416] border border-neutral-800 p-6 rounded-3xl space-y-4 flex flex-col justify-between shadow-xl">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-white">Dashboard Data</h3>
            <p className="text-xs text-neutral-400 font-light">Live counts from the store database</p>
          </div>

          <div className="space-y-3 bg-neutral-950/60 p-4 rounded-2xl border border-neutral-800 text-xs">
            <div className="flex items-center justify-between gap-3">
              <span className="text-neutral-400">Database connection</span>
              <span className={`font-bold ${loading ? 'text-amber-400' : statsData ? 'text-emerald-400' : 'text-red-400'}`}>
                {loading ? 'Checking...' : statsData ? 'Connected' : 'Unavailable'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-neutral-800 pt-3">
              <span className="text-neutral-400">Admin WhatsApp</span>
              <a
                href="https://wa.me/94762084145"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-emerald-300 transition hover:text-emerald-200"
                title="Open Admin WhatsApp Business"
              >
                <MessageCircle size={14} />
                <span>+94 76 208 4145</span>
              </a>
            </div>
            {dashboardError && <p className="text-red-300">{dashboardError}</p>}
          </div>

          <button
            type="button"
            onClick={fetchLiveDashboardData}
            disabled={loading}
            className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            <span>Refresh Live Data</span>
          </button>
        </div>

      </div>

      {/* 3. Recent Customer Inquiries Table */}
      <div className="bg-[#141416] border border-neutral-800 rounded-3xl p-6 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-white">Recent Customer Inquiries</h3>
            <p className="text-xs text-neutral-400 font-light">Latest inquiries submitted from the website database</p>
          </div>
          <button
            onClick={() => navigate('/admin/inquiries')}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold transition flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-neutral-400 uppercase tracking-wider border-b border-neutral-800 bg-neutral-950/40">
              <tr>
                <th className="py-3 px-4">Inquiry ID</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Phone / WhatsApp</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-neutral-500">Loading live database inquiries...</td>
                </tr>
              ) : dashboardError ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-red-300">Dashboard data is unavailable.</td>
                </tr>
              ) : recentInquiries.length > 0 ? (
                recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-neutral-900/50 transition">
                    <td className="py-3.5 px-4 font-mono text-amber-400 font-bold">{inq.inquiry_code || `INQ-${inq.id}`}</td>
                    <td className="py-3.5 px-4 font-medium text-white">{inq.name}</td>
                    <td className="py-3.5 px-4 text-neutral-300">{inq.phone}</td>
                    <td className="py-3.5 px-4">{inq.type || 'General Inquiry'}</td>
                    <td className="py-3.5 px-4 text-neutral-400">{inq.created_at ? inq.created_at.split(' ')[0] : 'Recent'}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        inq.status === 'Completed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                        inq.status === 'In Progress' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                        'bg-red-950 text-red-400 border border-red-500/30'
                      }`}>
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-neutral-500">No inquiries found in database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
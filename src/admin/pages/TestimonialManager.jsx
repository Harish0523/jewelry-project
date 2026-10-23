import React, { useState, useEffect } from 'react';
import { Trash2, Star, CheckCircle, Clock, EyeOff } from 'lucide-react';
import { API_BASE_URL } from '../../api';

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/testimonials/get_testimonials.php?all=true`, { credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.testimonials);
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect -- intentional initial load of testimonials from the backend API
    fetchTestimonials();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/testimonials/manage_testimonial.php`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      const data = await res.json();
      if (data.success) {
        fetchTestimonials();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const res = await fetch(`${API_BASE_URL}/testimonials/manage_testimonial.php`, {
          method: 'DELETE',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        const data = await res.json();
        if (data.success) fetchTestimonials();
      } catch (err) {
        console.error('Error deleting testimonial:', err);
      }
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#141416] p-6 rounded-3xl border border-neutral-800 shadow-xl">
        <div>
          <h2 className="text-xl font-serif font-bold text-white">Testimonials Approval Management</h2>
          <p className="text-xs text-neutral-400 font-light">Review, approve, hide, or delete user-submitted feedback before it goes live.</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-xs text-neutral-500">Loading testimonials...</div>
        ) : testimonials.length > 0 ? (
          testimonials.map((t) => (
            <div key={t.id} className="bg-[#141416] border border-neutral-800 p-6 rounded-3xl space-y-4 hover:border-amber-500/30 transition shadow-xl relative flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-serif font-bold flex items-center justify-center text-sm">
                      {t.clientName ? t.clientName.charAt(0).toUpperCase() : 'C'}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">{t.clientName || 'Anonymous Client'}</h3>
                      <span className="text-[11px] text-neutral-400">{t.location || 'Jaffna'}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                    t.status === 'Active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                    t.status === 'Pending' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                    'bg-neutral-900 text-neutral-400 border border-neutral-800'
                  }`}>
                    {t.status === 'Active' && <CheckCircle size={11} />}
                    {t.status === 'Pending' && <Clock size={11} />}
                    {t.status}
                  </span>
                </div>

                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(Number(t.rating) || 5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                <p className="text-xs text-neutral-300 italic font-light leading-relaxed">
                  "{t.review || 'No review message provided.'}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                <div className="flex gap-2">
                  {t.status !== 'Active' && (
                    <button
                      onClick={() => handleUpdateStatus(t.id, 'Active')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 text-xs flex items-center gap-1.5 transition cursor-pointer font-bold"
                    >
                      <CheckCircle size={13} />
                      <span>Approve</span>
                    </button>
                  )}
                  {t.status !== 'Hidden' && (
                    <button
                      onClick={() => handleUpdateStatus(t.id, 'Hidden')}
                      className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white text-xs flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <EyeOff size={13} />
                      <span>Hide</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(t.id)}
                  className="px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-900/40 text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-xs text-neutral-500 bg-[#141416] rounded-3xl border border-neutral-800">
            No testimonials submitted yet.
          </div>
        )}
      </div>

    </div>
  );
}
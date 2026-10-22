import React, { useState } from 'react';
import { Search, MessageSquare, MessageCircle, Trash2 } from 'lucide-react';
import { API_BASE_URL } from '../../api';

const getWhatsAppNumber = (phone) => {
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.startsWith('00')) return digits.slice(2);
  if (digits.startsWith('0')) return `94${digits.slice(1)}`;
  return digits;
};

const getReplyUrl = (inquiry) => {
  const phone = getWhatsAppNumber(inquiry.phone);
  const message = `Hi ${inquiry.name || 'there'}, thank you for contacting Atelier Harx about ${inquiry.type || 'your inquiry'}. We received your message: "${inquiry.message || ''}". How can we help you?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export default function InquiryManager({ inquiries = [], setInquiries, refreshInquiries }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const safeInquiries = Array.isArray(inquiries) ? inquiries : [];

  const filteredInquiries = safeInquiries.filter((item) => {
    const matchesSearch = 
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.phone && item.phone.includes(searchTerm));
    
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      // 1. Optimistic UI update
      if (setInquiries) {
        setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
      }

      // 2. Database update using POST
      const res = await fetch(`${API_BASE_URL}/inquiries/manage_inquiry.php`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_status', id, status: newStatus })
      });
      
      const rawText = await res.text();
      let data;
      try {
        data = JSON.parse(rawText);
      } catch {
        console.error("JSON Parse Error:", rawText);
        alert("Server returned invalid response. Check Console.");
        return;
      }

      if (!data.success) {
        alert(data.message || 'Failed to update status');
        if (refreshInquiries) refreshInquiries();
      }
    } catch (err) {
      console.error('Network Error updating status:', err);
      alert('Network error connecting to PHP backend.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry record?')) {
      try {
        // 1. Immediate UI Removal
        if (setInquiries) {
          setInquiries(prev => prev.filter(inq => inq.id !== id));
        }

        // 2. Database Delete using POST
        const res = await fetch(`${API_BASE_URL}/inquiries/manage_inquiry.php`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'delete', id })
        });

        const rawText = await res.text();
        let data;
        try {
          data = JSON.parse(rawText);
        } catch {
          console.error("JSON Parse Error on Delete:", rawText);
          alert("Server returned invalid response. Check Console.");
          return;
        }

        if (!data.success) {
          alert(data.message || 'Failed to delete inquiry');
          if (refreshInquiries) refreshInquiries();
        }
      } catch (err) {
        console.error('Network Error deleting inquiry:', err);
        alert('Network error connecting to PHP backend.');
      }
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#141416] p-6 rounded-3xl border border-neutral-800 shadow-xl">
        <div>
          <h2 className="text-xl font-serif font-bold text-white">Customer Inquiries & Custom Orders</h2>
          <p className="text-xs text-neutral-400 font-light">View and manage custom jewelry requests sent by website patrons.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
            <input
              type="text"
              placeholder="Search by name, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl pl-10 pr-4 py-2 text-xs text-white outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0b0b0c] border border-neutral-800 text-white rounded-xl px-3 py-2 text-xs outline-none focus:border-amber-500"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredInquiries.length > 0 ? (
          filteredInquiries.map((inq) => (
            <div key={inq.id} className="bg-[#141416] border border-neutral-800 p-6 rounded-3xl space-y-4 hover:border-amber-500/30 transition shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-sm">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{inq.name}</h3>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-400">
                      <span>{inq.phone}</span>
                      {inq.email && inq.email !== 'N/A' && <span>• {inq.email}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2">
                  <select
                    value={inq.status || 'Pending'}
                    onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer transition ${
                      inq.status === 'Completed' ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30' :
                      inq.status === 'In Progress' ? 'bg-blue-950 text-blue-400 border-blue-500/30' :
                      'bg-amber-950 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    <option value="Pending">Pending ⏳</option>
                    <option value="In Progress">In Progress ⚙️</option>
                    <option value="Completed">Completed ✅</option>
                  </select>

                  {getWhatsAppNumber(inq.phone) && (
                    <a
                      href={getReplyUrl(inq)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-3 py-2 text-[11px] font-semibold text-emerald-300 transition hover:bg-emerald-900/50"
                      title="Reply to this inquiry on WhatsApp"
                    >
                      <MessageCircle size={14} />
                      <span>Reply</span>
                    </a>
                  )}

                  <button
                    onClick={() => handleDelete(inq.id)}
                    className="p-2 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-900/40 transition cursor-pointer"
                    title="Delete inquiry"
                    aria-label={`Delete inquiry from ${inq.name}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400/80 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                  {inq.type || 'General Inquiry'}
                </span>
                <p className="text-xs text-neutral-300 font-light leading-relaxed pt-2">
                  "{inq.message}"
                </p>
                <span className="block text-[10px] text-neutral-500 pt-1">{inq.date}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-xs text-neutral-500 bg-[#141416] rounded-3xl border border-neutral-800">
            No inquiries match your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
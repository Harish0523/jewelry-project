import React, { useState } from 'react';
import { Save, Check, MapPin, Phone, Clock, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '../../api';
import useSiteContent from '../../context/useSiteContent';

export default function ContentManager() {
  const { content, loading, refreshContent } = useSiteContent();

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-neutral-400 bg-[#141416] rounded-3xl border border-neutral-800">
        Loading site content details...
      </div>
    );
  }

  return <ContentForm initialContent={content} refreshContent={refreshContent} />;
}

function ContentForm({ initialContent, refreshContent }) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 2. Save content updates to database
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage('');

    try {
      const res = await fetch(`${API_BASE_URL}/inquiries/update_content.php`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: content.showroomAddress,
          hotline: content.mainPhone,
          whatsapp: content.whatsappNumber,
          email: content.email,
          opening_hours: content.openingHours,
          instagram_url: content.instagramUrl
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || `Failed to update content (HTTP ${res.status}).`);
      } else {
        await refreshContent();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error('Error saving content:', err);
      setErrorMessage(
        err instanceof TypeError
          ? 'Could not reach the server. Check that the API server is running and try again.'
          : 'The server returned an invalid response while saving updates.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-[#141416] p-6 rounded-3xl border border-neutral-800 shadow-xl">
        <div>
          <h2 className="text-xl font-serif font-bold text-white">Basic Website Content Management</h2>
          <p className="text-xs text-neutral-400 font-light">Update store address, contact details, opening hours, and social channels in real-time.</p>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs rounded-2xl flex items-center gap-2">
          <Check size={16} />
          <span>Website contact details updated successfully in database!</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-950/40 border border-red-500/40 text-red-300 text-xs rounded-2xl flex items-center gap-2">
          <AlertCircle size={16} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSave} className="bg-[#141416] border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-white text-base border-b border-neutral-800 pb-3 flex items-center gap-2">
            <MapPin size={18} className="text-amber-400" /> Showroom & Location Info
          </h3>

          <div className="space-y-1 text-xs">
            <label className="text-neutral-300 font-medium">Showroom Address</label>
            <input
              type="text"
              required
              value={content.showroomAddress}
              onChange={(e) => setContent({ ...content, showroomAddress: e.target.value })}
              className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif font-bold text-white text-base border-b border-neutral-800 pb-3 flex items-center gap-2">
            <Phone size={18} className="text-amber-400" /> Contact Numbers & Email
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">Main Hotline Phone</label>
              <input
                type="text"
                required
                value={content.mainPhone}
                onChange={(e) => setContent({ ...content, mainPhone: e.target.value })}
                className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">WhatsApp Business Number</label>
              <input
                type="text"
                required
                value={content.whatsappNumber}
                onChange={(e) => setContent({ ...content, whatsappNumber: e.target.value })}
                className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">Support Email Address</label>
              <input
                type="email"
                required
                value={content.email}
                onChange={(e) => setContent({ ...content, email: e.target.value })}
                className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-serif font-bold text-white text-base border-b border-neutral-800 pb-3 flex items-center gap-2">
            <Clock size={18} className="text-amber-400" /> Showroom Hours & Social Links
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">Opening Hours</label>
              <input
                type="text"
                required
                value={content.openingHours}
                onChange={(e) => setContent({ ...content, openingHours: e.target.value })}
                className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-300 font-medium">Instagram URL</label>
              <input
                type="text"
                value={content.instagramUrl}
                onChange={(e) => setContent({ ...content, instagramUrl: e.target.value })}
                className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-3 text-white outline-none"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-8 py-3.5 rounded-xl text-xs flex items-center gap-2 transition shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
          >
            <Save size={16} />
            <span>{saving ? 'Saving Updates...' : 'Save All Content Updates'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
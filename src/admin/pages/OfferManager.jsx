import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check, Sparkles, Tag } from 'lucide-react';
import { API_BASE_URL } from '../../api';

export default function OfferManager() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [formData, setFormData] = useState({ title: '', discount: '', validTill: '', code: '', status: 'Active' });

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://atelierharx.gt.tc/jewelry_api/offers/get_offers.php');
      const data = await res.json();
      if (data.success) {
        setOffers(data.offers);
      }
    } catch (err) {
      console.error('Error fetching offers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect -- intentional initial load of offers from the backend API
    fetchOffers();
  }, []);

  const handleOpenModal = (offer = null) => {
    if (offer) {
      setEditingOffer(offer);
      setFormData(offer);
    } else {
      setEditingOffer(null);
      setFormData({ title: '', discount: '', validTill: '', code: '', status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const handleSaveOffer = async (e) => {
    e.preventDefault();
    try {
      const method = editingOffer ? 'PUT' : 'POST';
      const res = await fetch(`${API_BASE_URL}/offers/manage_offer.php`, {
        method: method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingOffer ? { ...formData, id: editingOffer.id } : formData)
      });
      
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchOffers();
      } else {
        alert(data.message || 'Action failed');
      }
    } catch (err) {
      console.error('Error saving offer:', err);
    }
  };

  const handleDeleteOffer = async (id) => {
    if (window.confirm('Are you sure you want to remove this offer?')) {
      try {
        const res = await fetch(`${API_BASE_URL}/offers/manage_offer.php`, {
          method: 'DELETE',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        const data = await res.json();
        if (data.success) {
          fetchOffers();
        }
      } catch (err) {
        console.error('Error deleting offer:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#141416] p-6 rounded-3xl border border-neutral-800 shadow-xl">
        <div>
          <h2 className="text-xl font-serif font-bold text-white">Special Offers Management</h2>
          <p className="text-xs text-neutral-400 font-light">Create and update promotional banners and discount codes.</p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 transition shadow-lg shadow-amber-500/20 shrink-0 cursor-pointer"
        >
          <Plus size={18} />
          <span>Add New Offer</span>
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-xs text-neutral-500">Loading offers from database...</div>
        ) : offers.length > 0 ? (
          offers.map((offer) => (
            <div key={offer.id} className="bg-[#141416] border border-neutral-800 p-6 rounded-3xl space-y-4 hover:border-amber-500/30 transition shadow-xl relative overflow-hidden">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-white text-base">{offer.title}</h3>
                    <p className="text-xs font-bold text-amber-400">{offer.discount}</p>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  offer.status === 'Active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  {offer.status}
                </span>
              </div>

              <div className="bg-neutral-950/60 p-3.5 rounded-2xl border border-neutral-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-mono text-amber-300">
                  <Tag size={14} />
                  <span>CODE: {offer.code}</span>
                </div>
                <span className="text-neutral-400 text-[11px]">Valid till: {offer.validTill}</span>
              </div>

              <div className="pt-2 border-t border-neutral-800/80 flex justify-end gap-2">
                <button
                  onClick={() => handleOpenModal(offer)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-amber-400 text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteOffer(offer.id)}
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
            No active promotional offers found in database.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141416] border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="text-lg font-serif font-bold text-white">
                {editingOffer ? 'Edit Offer' : 'Add New Offer'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white transition cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveOffer} className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">Offer Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diwali Gold Festival Offer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">Discount / Privilege Detail</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 20% OFF or Free Gift"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-300 font-medium">Promo Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GOLD2026"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-300 font-medium">Valid Until Date</label>
                  <input
                    type="date"
                    required
                    value={formData.validTill}
                    onChange={(e) => setFormData({ ...formData, validTill: e.target.value })}
                    className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-3 py-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">Offer Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-3 py-2.5 text-white outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Expired">Expired / Hidden</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition cursor-pointer"
                >
                  <Check size={16} />
                  <span>{editingOffer ? 'Update Offer' : 'Save Offer'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
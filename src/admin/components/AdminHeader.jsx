import React, { useState } from 'react';
import { ArrowRight, Bell, Check, ExternalLink, Image as ImageIcon, MessageSquare, Save, User, X } from 'lucide-react';
import Cropper from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';
import { Link } from 'react-router-dom';

const readImageFile = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = () => reject(new Error('Unable to read the selected photo.'));
  reader.onload = () => resolve(reader.result);
  reader.readAsDataURL(file);
});

const createCroppedProfilePhoto = (imageSrc, crop) => new Promise((resolve, reject) => {
  const image = new Image();
  image.onerror = () => reject(new Error('Unable to process this photo.'));
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    if (!context) {
      reject(new Error('Unable to prepare the cropped photo.'));
      return;
    }
    context.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, 512, 512);
    resolve(canvas.toDataURL('image/jpeg', 0.82));
  };
  image.src = imageSrc;
});

const getInitialProfile = () => {
  const loginUsername = localStorage.getItem('adminUsername') || 'admin';
  try {
    const savedProfile = JSON.parse(localStorage.getItem('adminProfile') || 'null');
    const savedAccount = savedProfile?.accountUsername || savedProfile?.accountEmail;
    if (savedProfile && (!savedAccount || savedAccount === loginUsername)) {
      return {
        name: savedProfile.name || 'Super Admin',
        email: savedProfile.email || '',
        photo: savedProfile.photo || '',
        accountUsername: loginUsername,
      };
    }
  } catch {
    return { name: 'Super Admin', email: '', photo: '', accountUsername: loginUsername };
  }
  return { name: 'Super Admin', email: '', photo: '', accountUsername: loginUsername };
};

export default function AdminHeader({ activeTab, inquiries = [], onOpenInquiries, onUpdateStatus }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState(getInitialProfile);
  const [profileDraft, setProfileDraft] = useState(profile);
  const [profileError, setProfileError] = useState('');
  const [cropImage, setCropImage] = useState('');
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const [cropZoom, setCropZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const pendingInquiries = inquiries.filter((inquiry) => inquiry.status === 'Pending');
  const profileInitials = profile.name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();

  const openProfile = () => {
    setProfileDraft(profile);
    setProfileError('');
    setProfileOpen(true);
  };

  const handleProfilePhotoSelect = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setProfileError('Choose an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setProfileError('Photo must be 5 MB or smaller.');
      return;
    }

    try {
      const image = await readImageFile(file);
      setCropImage(image);
      setCropPosition({ x: 0, y: 0 });
      setCropZoom(1);
      setCroppedArea(null);
      setProfileError('');
    } catch {
      setProfileError('Unable to process this photo. Please choose another image.');
    }
  };

  const handleApplyCrop = async () => {
    if (!cropImage || !croppedArea) return;
    try {
      const photo = await createCroppedProfilePhoto(cropImage, croppedArea);
      setProfileDraft((currentProfile) => ({ ...currentProfile, photo }));
      setCropImage('');
      setProfileError('');
    } catch {
      setProfileError('Unable to crop this photo. Please try again.');
    }
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();
    const updatedProfile = {
      name: profileDraft.name.trim(),
      email: profileDraft.email.trim(),
      photo: profileDraft.photo || '',
      accountUsername: localStorage.getItem('adminUsername') || 'admin',
    };
    localStorage.setItem('adminProfile', JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
    setProfileOpen(false);
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'products': return 'Product Management';
      case 'gallery': return 'Gallery Management';
      case 'offers': return 'Special Offers Management';
      case 'testimonials': return 'Testimonials Management';
      case 'inquiries': return 'Customer Inquiries & Custom Orders';
      case 'content': return 'Basic Website Content Management';
      default: return 'Admin Panel';
    }
  };

  return (
    <header className="h-20 bg-[#141416] border-b border-neutral-800 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      
      {/* Active Section Title */}
      <div>
        <h1 className="text-xl font-serif font-bold text-white capitalize">
          {getTitle()}
        </h1>
        <p className="text-[11px] text-neutral-400 font-light">
          Manage and update your Atelier Harx store data in real-time.
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-4">
        
        {/* View Main Website Button */}
        <Link
          to="/"
          target="_blank"
          className="hidden sm:flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-2 rounded-xl hover:bg-amber-500/20 transition"
        >
          <span>Live Site</span>
          <ExternalLink size={14} />
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen((isOpen) => !isOpen)}
            aria-label={`Notifications, ${pendingInquiries.length} pending inquiries`}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center relative transition ${
              notificationsOpen
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
            }`}
          >
            <Bell size={18} />
            {pendingInquiries.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-amber-400 text-neutral-950 text-[9px] font-bold flex items-center justify-center animate-pulse">
                {pendingInquiries.length}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-3 w-80 max-w-[calc(100vw-2rem)] bg-[#141416] border border-neutral-800 rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white">Notifications</h2>
                <span className="text-[10px] text-neutral-500">{pendingInquiries.length} pending</span>
              </div>

              {pendingInquiries.length > 0 ? (
                <div className="max-h-72 overflow-y-auto divide-y divide-neutral-800/80">
                  {pendingInquiries.map((inquiry) => (
                    <button
                      key={inquiry.id}
                      type="button"
                      onClick={async () => {
                        setNotificationsOpen(false);
                        // கிளிக் செய்தவுடன் Pending-ல் இருந்து In Progress-க்கு மாறிவிடும் (நோட்டிஃபிகேஷன் பெல்லில் இருந்து மறைந்துவிடும்)
                        if (inquiry.status === 'Pending') {
                          await onUpdateStatus?.(inquiry.id, 'In Progress');
                        }
                        onOpenInquiries?.();
                      }}
                      className="w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-neutral-900 transition cursor-pointer"
                    >
                      <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                        <MessageSquare size={15} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold text-white truncate">{inquiry.name}</span>
                        <span className="block text-[11px] text-neutral-400 truncate mt-1">{inquiry.type}</span>
                        <span className="block text-[10px] text-neutral-500 mt-1">{inquiry.date}</span>
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="px-4 py-6 text-center text-xs text-neutral-500">You are all caught up.</p>
              )}

              <button
                type="button"
                onClick={() => {
                  setNotificationsOpen(false);
                  onOpenInquiries?.();
                }}
                className="w-full px-4 py-3 border-t border-neutral-800 text-xs font-semibold text-amber-400 hover:bg-neutral-900 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                View inquiries <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Admin User Profile */}
        <button
          type="button"
          onClick={openProfile}
          className="flex items-center gap-3 pl-3 border-l border-neutral-800 text-left"
          aria-label="Edit admin profile"
          title="Edit admin profile"
        >
          <span className="w-10 h-10 rounded-xl bg-amber-500 text-neutral-950 font-bold flex items-center justify-center text-xs shadow-md">
            {profile.photo ? (
              <img src={profile.photo} alt={`${profile.name} profile`} className="h-full w-full rounded-xl object-cover" />
            ) : profileInitials || <User size={20} />}
          </span>
          <span className="hidden md:flex flex-col">
            <span className="text-xs font-bold text-white">{profile.name}</span>
            <span className="text-[10px] text-neutral-400">{profile.email || `@${profile.accountUsername}`}</span>
          </span>
        </button>

      </div>

      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-amber-500/30 bg-[#141416] p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <h2 className="text-lg font-serif font-bold text-white">Admin Profile</h2>
                <p className="mt-1 text-xs text-neutral-400">Super Admin</p>
              </div>
              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                className="p-2 text-neutral-400 transition hover:text-white"
                aria-label="Close admin profile"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-amber-500 text-sm font-bold text-neutral-950">
                  {profileDraft.photo ? (
                    <img src={profileDraft.photo} alt="Admin profile preview" className="h-full w-full object-cover" />
                  ) : profileInitials || <User size={24} />}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <label
                    htmlFor="admin-profile-photo"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs font-medium text-neutral-200 transition hover:border-amber-500/50 hover:text-white"
                  >
                    <ImageIcon size={14} />
                    Add Photo
                  </label>
                  <input
                    id="admin-profile-photo"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoSelect}
                    className="sr-only"
                  />
                  {profileDraft.photo && (
                    <button
                      type="button"
                      onClick={() => setProfileDraft({ ...profileDraft, photo: '' })}
                      className="rounded-xl border border-neutral-800 px-3 py-2 text-xs text-neutral-400 transition hover:text-red-300"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              </div>
              <p className="text-[11px] text-neutral-500">Image files up to 5 MB; photo is optimized before saving.</p>
              {profileError && <p className="text-xs text-red-400">{profileError}</p>}
              <div className="space-y-1.5">
                <label htmlFor="admin-profile-name" className="text-xs font-medium text-neutral-300">Display Name</label>
                <input
                  id="admin-profile-name"
                  type="text"
                  required
                  value={profileDraft.name}
                  onChange={(event) => setProfileDraft({ ...profileDraft, name: event.target.value })}
                  className="w-full rounded-xl border border-neutral-800 bg-[#0b0b0c] px-4 py-3 text-sm text-white outline-none focus:border-amber-500"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="admin-profile-email" className="text-xs font-medium text-neutral-300">Contact Email (Optional)</label>
                <input
                  id="admin-profile-email"
                  type="email"
                  value={profileDraft.email}
                  onChange={(event) => setProfileDraft({ ...profileDraft, email: event.target.value })}
                  className="w-full rounded-xl border border-neutral-800 bg-[#0b0b0c] px-4 py-3 text-sm text-white outline-none focus:border-amber-500"
                />
              </div>
              <p className="text-[11px] leading-relaxed text-neutral-500">Profile details are saved in this browser and do not change login credentials.</p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setProfileOpen(false)}
                  className="rounded-xl border border-neutral-800 px-4 py-2.5 text-xs text-neutral-300 transition hover:bg-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-neutral-950 transition hover:bg-amber-400"
                >
                  <Save size={14} />
                  <Check size={14} />
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {cropImage && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg space-y-4 rounded-2xl border border-amber-500/30 bg-[#141416] p-5 shadow-2xl sm:p-6">
            <div>
              <h2 className="text-lg font-serif font-bold text-white">Crop Profile Photo</h2>
              <p className="mt-1 text-xs text-neutral-400">Drag the image and adjust zoom to frame your photo.</p>
            </div>

            <div className="relative h-72 overflow-hidden rounded-xl bg-black sm:h-96">
              <Cropper
                image={cropImage}
                crop={cropPosition}
                zoom={cropZoom}
                aspect={1}
                onCropChange={setCropPosition}
                onZoomChange={setCropZoom}
                onCropComplete={(_, croppedAreaPixels) => setCroppedArea(croppedAreaPixels)}
                cropShape="rect"
                showGrid
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-300">
                <label htmlFor="admin-profile-zoom">Zoom</label>
                <span>{cropZoom.toFixed(1)}×</span>
              </div>
              <input
                id="admin-profile-zoom"
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={cropZoom}
                onChange={(event) => setCropZoom(Number(event.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            {profileError && <p className="text-xs text-red-400">{profileError}</p>}

            <div className="flex justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => setCropImage('')}
                className="rounded-xl border border-neutral-800 px-4 py-2.5 text-xs text-neutral-300 transition hover:bg-neutral-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyCrop}
                disabled={!croppedArea}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-neutral-950 transition hover:bg-amber-400 disabled:opacity-50"
              >
                <Check size={14} />
                Use Crop
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
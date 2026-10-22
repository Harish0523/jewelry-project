import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Check, Image as ImageIcon, Eye, Pencil } from 'lucide-react';
import { API_BASE_URL } from '../../api';

const getItemImages = (item) => item.images || [{
  id: `${item.id}-0`,
  fileName: 'Gallery image',
  image: item.image,
}];

const readImageFile = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(new Error('Unable to read image file.'));
  reader.readAsDataURL(file);
});

export default function GalleryManager() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('rings');
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageError, setImageError] = useState('');
  const viewingImages = viewingItem ? getItemImages(viewingItem) : [];

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost/jewelry-api/gallery/get_gallery.php');
      const data = await res.json();
      if (data.success) {
        setGallery(data.gallery);
      }
    } catch (err) {
      console.error('Error fetching gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    setTitle(item?.title || '');
    setCategory(item?.category || 'rings');
    setSelectedImages(item ? getItemImages(item) : []);
    setImageError('');
    setIsModalOpen(true);
  };

  const handleImageSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';

    if (selectedImages.length + files.length > 5) {
      setImageError('You can add up to 5 images at a time.');
      return;
    }
    if (files.some((file) => !file.type.startsWith('image/'))) {
      setImageError('Please select image files only.');
      return;
    }
    if (files.some((file) => file.size > 5 * 1024 * 1024)) {
      setImageError('Each image must be 5 MB or smaller.');
      return;
    }

    try {
      const images = await Promise.all(files.map(async (file, index) => ({
        id: `${Date.now()}-${index}`,
        fileName: file.name,
        image: await readImageFile(file),
      })));
      setSelectedImages((currentImages) => [...currentImages, ...images]);
      setImageError('');
    } catch {
      setImageError('Unable to read the selected image. Please try again.');
    }
  };

  const handleRemoveSelectedImage = (id) => {
    setSelectedImages((images) => images.filter((image) => image.id !== id));
    setImageError('');
  };

  const handleSaveImage = async (e) => {
    e.preventDefault();
    if (!selectedImages.length) {
      setImageError('Select at least one image to continue.');
      return;
    }

    try {
      const method = editingItem ? 'PUT' : 'POST';
      const payload = {
        id: editingItem?.id,
        title: title.trim(),
        category,
        images: selectedImages
      };

      const res = await fetch(`${API_BASE_URL}/gallery/manage_gallery.php`, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchGallery();
      } else {
        alert(data.message || 'Operation failed');
      }
    } catch (err) {
      console.error('Error saving gallery item:', err);
    }
  };

  const handleDeleteImage = async (id) => {
    if (window.confirm('Are you sure you want to remove this photo set from gallery?')) {
      try {
        const res = await fetch(`${API_BASE_URL}/gallery/manage_gallery.php`, {
          method: 'DELETE',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        const data = await res.json();
        if (data.success) fetchGallery();
      } catch (err) {
        console.error('Error deleting image:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#141416] p-6 rounded-3xl border border-neutral-800 shadow-xl">
        <div>
          <h2 className="text-xl font-serif font-bold text-white">Gallery Showcase Management</h2>
          <p className="text-xs text-neutral-400 font-light">Manage photos displayed on the public Gallery page.</p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 transition shadow-lg shadow-amber-500/20 shrink-0 cursor-pointer"
        >
          <Plus size={18} />
          <span>Upload New Image</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-xs text-neutral-500">Loading gallery items from database...</div>
        ) : gallery.length > 0 ? (
          gallery.map((item) => (
            <div key={item.id} className="bg-[#141416] border border-neutral-800 rounded-3xl overflow-hidden group shadow-xl hover:border-amber-500/30 transition">
              <div className="relative grid h-48 grid-cols-3 grid-rows-2 gap-1 overflow-hidden bg-neutral-900">
                {getItemImages(item).map((image, index, images) => (
                  <img
                    key={image.id || `${item.id}-${index}`}
                    src={image.image}
                    alt={`${item.title} ${index + 1}`}
                    className={`${images.length === 1 ? 'col-span-3 row-span-2' : index === 0 ? 'col-span-2 row-span-2' : ''} h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]`}
                  />
                ))}
                <div className="absolute top-3 left-3">
                  <span className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-amber-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    {item.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex gap-2 opacity-90 sm:opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => setViewingItem(item)}
                    className="rounded-xl border border-neutral-700 bg-neutral-950/80 p-2 text-white transition hover:bg-neutral-800 cursor-pointer"
                    title="View Images"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="rounded-xl border border-amber-500/40 bg-neutral-950/80 p-2 text-amber-300 transition hover:bg-amber-500 hover:text-neutral-950 cursor-pointer"
                    title="Edit Gallery Item"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteImage(item.id)}
                    className="rounded-xl border border-red-500/40 bg-red-950/80 p-2 text-red-300 transition hover:bg-red-600 hover:text-white cursor-pointer"
                    title="Delete Image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-white text-xs truncate">{item.title}</h3>
                <p className="text-[10px] font-mono text-neutral-500 mt-1 truncate">{item.images?.length || 1} image{(item.images?.length || 1) === 1 ? '' : 's'}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-xs text-neutral-500 bg-[#141416] rounded-3xl border border-neutral-800">
            No gallery sets found in database.
          </div>
        )}
      </div>

      {viewingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-4xl space-y-5 overflow-y-auto rounded-3xl border border-amber-500/30 bg-[#141416] p-5 shadow-2xl sm:p-7">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">{viewingItem.title}</h3>
                <p className="mt-1 text-xs text-amber-400">{viewingItem.category} · {viewingImages.length} image{viewingImages.length === 1 ? '' : 's'}</p>
              </div>
              <button onClick={() => setViewingItem(null)} className="p-2 text-neutral-400 transition hover:text-white cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {viewingImages.map((image, index) => (
                <figure key={image.id || `${viewingItem.id}-${index}`} className="overflow-hidden rounded-xl border border-neutral-800 bg-[#0b0b0c]">
                  <img src={image.image} alt={`${viewingItem.title} ${index + 1}`} className="max-h-[60vh] w-full object-contain" />
                  {image.fileName && <figcaption className="truncate px-3 py-2 text-[10px] text-neutral-400">{image.fileName}</figcaption>}
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141416] border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="text-lg font-serif font-bold text-white">{editingItem ? 'Edit Photo Set' : 'Add Photo Set to Gallery'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white transition cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveImage} className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">Photo Set Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Traditional Wedding Thali Set"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-3 py-2.5 text-white outline-none"
                >
                  <option value="rings">Rings (மோதிரம்)</option>
                  <option value="chains">Chains (சங்கிலி)</option>
                  <option value="necklaces">Necklaces (அட்டிகை)</option>
                  <option value="bangles">Bangles (வளையல்)</option>
                  <option value="earrings">Earrings (தோடு)</option>
                  {editingItem && !['rings', 'chains', 'necklaces', 'bangles', 'earrings'].includes(editingItem.category) && (
                    <option value={editingItem.category}>
                      {{
                        Gold: 'Gold Collection',
                        Diamond: 'Diamond Collection',
                        Silver: 'Silver Collection',
                        Bridal: 'Bridal Showcase',
                        Craftsmanship: 'Workshop Crafting',
                      }[editingItem.category] || editingItem.category}
                    </option>
                  )}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-neutral-300 font-medium flex items-center gap-1.5">
                  <ImageIcon size={14} className="text-amber-400" /> Images (up to 5)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-amber-500 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-neutral-950 cursor-pointer"
                />
                <p className="text-[10px] text-neutral-500">Choose up to 5 images for this gallery item, 5 MB each.</p>
                {imageError && <p className="text-[10px] text-red-400">{imageError}</p>}
                {selectedImages.map((image) => (
                  <div key={image.id} className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-[#0b0b0c] p-2">
                    <img src={image.image} alt={image.fileName} className="h-12 w-12 rounded-lg object-cover" />
                    <span className="min-w-0 flex-1 truncate text-neutral-300">{image.fileName}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSelectedImage(image.id)}
                      className="p-2 text-neutral-400 transition hover:text-red-400 cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
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
                  <span>{editingItem ? 'Save Changes' : 'Save Photo Set'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
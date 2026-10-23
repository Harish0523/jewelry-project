import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, X, Image as ImageIcon, Check, Eye } from 'lucide-react';
import { API_BASE_URL } from '../../api';

const createProductCode = () => `AH-JW-${Date.now()}`;

const readImageFile = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(new Error('Unable to read image file.'));
  reader.readAsDataURL(file);
});

const getProductImages = (product) => {
  let images = product.images;
  if (typeof product.images === 'string') {
    try {
      images = JSON.parse(product.images);
    } catch {
      images = [];
    }
  }

  const imageUrls = (Array.isArray(images) ? images : [])
    .map((image) => typeof image === 'string' ? image : image?.image)
    .filter(Boolean);
  return imageUrls.length ? imageUrls : product.image ? [product.image] : [];
};

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    category_short: 'Gold',
    purity: '22K (916)',
    weight: '10g',
    price: '',
    discount_price: '',
    description: 'Handcrafted premium jewelry item.',
    image: '/ring.jpg',
    images: []
  });
  const [imageError, setImageError] = useState('');

  // Fetch Products from PHP Backend API on load
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://atelierharx.gt.tc/jewelry_api/products/get_products.php');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      } else {
        setError('Failed to load products from database.');
      }
    } catch {
      setError('Cannot connect to XAMPP backend server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect -- intentional initial load of products from the backend API
    fetchProducts();
  }, []);

  // Open Modal for Create or Edit
  const handleOpenModal = (product = null) => {
    setImageError('');
    if (product) {
      setEditingProduct(product);
      const images = getProductImages(product);
      setFormData({
        ...product,
        code: product.code || createProductCode(),
        discount_price: product.discount_price || '',
        image: images[0] || '',
        images,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        code: createProductCode(),
        category_short: 'Gold',
        purity: '22K (916)',
        weight: '10g',
        price: '',
        discount_price: '',
        description: 'Handcrafted premium jewelry item.',
        image: '/ring.jpg',
        images: []
      });
    }
    setIsModalOpen(true);
  };

  const handleImageSelect = async (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    e.target.value = '';

    if (selectedFiles.length + formData.images.length > 5) {
      setImageError('You can add up to 5 images per product.');
      return;
    }
    if (selectedFiles.some((file) => !file.type.startsWith('image/'))) {
      setImageError('Please select image files only.');
      return;
    }
    if (selectedFiles.some((file) => file.size > 5 * 1024 * 1024)) {
      setImageError('Each image must be 5 MB or smaller.');
      return;
    }

    try {
      const images = [...formData.images, ...(await Promise.all(selectedFiles.map(readImageFile)))];
      setFormData({ ...formData, images, image: images[0] || '' });
      setImageError('');
    } catch {
      setImageError('Unable to read the selected image. Please try again.');
    }
  };

  const handleRemoveImage = (index) => {
    const images = formData.images.filter((_, imageIndex) => imageIndex !== index);
    setFormData({ ...formData, images, image: images[0] || '' });
    setImageError('');
  };

  // Save Product (Add new item via PHP API)
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const url = editingProduct 
        ? `${API_BASE_URL}/products/update_product.php`
        : `${API_BASE_URL}/products/add_product.php`;

      const payload = editingProduct ? { ...formData, id: editingProduct.id } : formData;

      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setIsModalOpen(false);
        fetchProducts(); // Refresh list from DB
      } else {
        alert(data.message || 'Operation failed');
      }
    } catch {
      alert('Server connection error while saving product.');
    }
  };

  // Delete Product via PHP API
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this jewelry item?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/products/delete_product.php`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        const data = await response.json();
        if (data.success) {
          fetchProducts();
        } else {
          alert(data.message || 'Delete failed');
        }
      } catch {
        alert('Server connection error while deleting.');
      }
    }
  };

  // Filter Products
  const filteredProducts = products.filter(p => {
    const title = p.title || '';
    const category = p.category_short || '';

    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header & Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#141416] p-6 rounded-3xl border border-neutral-800 shadow-xl">
        <div>
          <h2 className="text-xl font-serif font-bold text-white">Jewelry Catalog Management</h2>
          <p className="text-xs text-neutral-400 font-light">Add, update, or remove jewelry items stored in MySQL database.</p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 transition shadow-lg shadow-amber-500/20 shrink-0"
        >
          <Plus size={18} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#141416] p-4 rounded-2xl border border-neutral-800">
        
        {/* Search Field */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by product title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition"
          />
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['All', 'Gold', 'Diamond', 'Silver', 'Bridal'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-neutral-950 shadow-md'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {error && (
        <div className="p-4 bg-red-950/40 border border-red-500/40 text-red-300 rounded-xl text-xs text-center">
          {error}
        </div>
      )}

      {/* Products Data Table */}
      <div className="bg-[#141416] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-neutral-400 uppercase tracking-wider border-b border-neutral-800 bg-neutral-950/60">
              <tr>
                <th className="py-4 px-5">Jewelry Item</th>
                <th className="py-4 px-5">Category</th>
                <th className="py-4 px-5">Purity</th>
                <th className="py-4 px-5">Price</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-neutral-400">Loading products from database...</td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-900/50 transition">
                    <td className="py-3.5 px-5 flex items-center gap-3">
                      <img src={p.image || '/ring.jpg'} alt={p.title} className="w-11 h-11 rounded-xl object-cover border border-amber-500/20 bg-neutral-900" />
                      <span className="font-bold text-white text-sm">{p.title}</span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-neutral-300">
                        {p.category_short}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-neutral-300">{p.purity}</td>
                    <td className="py-3.5 px-5">
                      {p.discount_price ? (
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-emerald-400">{p.discount_price}</span>
                          <span className="text-[10px] text-neutral-500 line-through">{p.price}</span>
                        </div>
                      ) : (
                        <span className="font-bold text-amber-400">{p.price}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-right space-x-2">
                      <button
                        onClick={() => setViewingProduct(p)}
                        className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-amber-400 hover:border-amber-500/40 transition"
                        title="View Product Images"
                        aria-label={`View images for ${p.title}`}
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => handleOpenModal(p)}
                        className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-amber-400 hover:border-amber-500/40 transition"
                        title="Edit Item"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-2 rounded-lg bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-900/40 transition"
                        title="Delete Item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-neutral-500">
                    No jewelry items found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {viewingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-4xl space-y-5 overflow-y-auto rounded-3xl border border-amber-500/30 bg-[#141416] p-5 shadow-2xl sm:p-7">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">{viewingProduct.title}</h3>
                <p className="mt-1 text-xs text-amber-400">
                  {getProductImages(viewingProduct).length} image{getProductImages(viewingProduct).length === 1 ? '' : 's'}
                </p>
              </div>
              <button
                onClick={() => setViewingProduct(null)}
                className="p-2 text-neutral-400 transition hover:text-white"
                aria-label="Close product image preview"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {getProductImages(viewingProduct).map((image, index) => (
                <img
                  key={`${viewingProduct.id}-${index}`}
                  src={image}
                  alt={`${viewingProduct.title} ${index + 1}`}
                  className="aspect-square w-full rounded-xl border border-neutral-800 bg-[#0b0b0c] object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141416] border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="text-lg font-serif font-bold text-white">
                {editingProduct ? 'Edit Jewelry Item' : 'Add New Jewelry Item'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white transition">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">Item Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 22K Gold Handcrafted Bangles"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">Category</label>
                <select
                  value={formData.category_short}
                  onChange={(e) => setFormData({ ...formData, category_short: e.target.value })}
                  className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-3 py-2.5 text-white outline-none"
                >
                  <option value="Gold">Gold</option>
                  <option value="Diamond">Diamond</option>
                  <option value="Silver">Silver</option>
                  <option value="Bridal">Bridal</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-neutral-300 font-medium">Gold Purity / Metal</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 22K (916) or 925 Silver"
                    value={formData.purity}
                    onChange={(e) => setFormData({ ...formData, purity: e.target.value })}
                    className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-300 font-medium">Regular Price (LKR)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rs. 350,000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-neutral-300 font-medium">Discount Price (LKR)</label>
                <input
                  type="text"
                  placeholder="Optional sale price"
                  value={formData.discount_price}
                  onChange={(e) => setFormData({ ...formData, discount_price: e.target.value })}
                  className="w-full bg-[#0b0b0c] border border-neutral-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-white outline-none"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="product-images" className="text-neutral-300 font-medium flex items-center gap-1.5">
                    <ImageIcon size={14} className="text-amber-400" /> Product Images
                  </label>
                  <span className="text-neutral-500">{formData.images.length}/5</span>
                </div>
                <label
                  htmlFor="product-images"
                  className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-neutral-700 bg-[#0b0b0c] px-4 py-4 text-neutral-300 transition hover:border-amber-500/60 hover:text-white"
                >
                  <span className="text-center">Choose images (up to 5, 5 MB each)</span>
                </label>
                <input
                  id="product-images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  disabled={formData.images.length >= 5}
                  className="sr-only"
                />
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-5 gap-2">
                    {formData.images.map((image, index) => (
                      <div key={`${index}-${image.slice(0, 24)}`} className="relative aspect-square">
                        <img src={image} alt={`Product image ${index + 1}`} className="h-full w-full rounded-lg border border-neutral-800 object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          aria-label={`Remove image ${index + 1}`}
                          className="absolute -right-1.5 -top-1.5 rounded-full bg-neutral-950 p-1 text-neutral-300 hover:text-white"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {imageError && <p className="text-red-400">{imageError}</p>}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition"
                >
                  <Check size={16} />
                  <span>{editingProduct ? 'Update Item' : 'Save Item'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/api';
import { Plus, Pencil, Trash2, X, Images } from 'lucide-react';

const emptyForm = {
  name: '',
  description: '',
  material: 'Coir',
  size: '',
  availableColors: '',
  price: '',
  inStock: true,
};

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin');
      return;
    }
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await fetchProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    setImages(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId && images.length === 0) {
      alert('Please select at least 1 doormat photo');
      return;
    }

    setSubmitting(true);
    setMessage('');

    const formData = new FormData();
    const productPayload = { ...form, price: parseFloat(form.price) };
    formData.append('product', new Blob([JSON.stringify(productPayload)], { type: 'application/json' }));
    images.forEach((file) => {
      formData.append('images', file);
    });

    try {
      if (editingId) {
        await updateProduct(editingId, formData);
        setMessage('Doormat updated successfully!');
      } else {
        await createProduct(formData);
        setMessage('New doormat added successfully!');
      }
      resetForm();
      loadProducts();
    } catch (err) {
      alert(err.response?.data?.error || 'Action failed. Check inputs or re-login.');
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description || '',
      material: item.material,
      size: item.size,
      availableColors: item.availableColors,
      price: item.price,
      inStock: item.inStock,
    });
    setImages([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImages([]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doormat?')) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  const getPhotoCount = (item) => {
    if (!item.extraImageUrls) return 1;
    return 1 + item.extraImageUrls.split(',').filter(Boolean).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Admin Product Management</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-amber-900">
            {editingId ? 'Edit Doormat' : 'Add New Doormat'}
          </h2>
          {editingId && (
            <button onClick={resetForm} className="text-sm text-stone-500 hover:text-stone-800 flex items-center gap-1">
              <X className="w-4 h-4" /> Cancel Edit
            </button>
          )}
        </div>

        {message && (
          <div className="bg-emerald-50 text-emerald-700 text-sm p-3 rounded-lg mb-4 border border-emerald-200">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Doormat Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Royal Coir Welcome Mat"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Material *</label>
            <select
              value={form.material}
              onChange={(e) => setForm({ ...form, material: e.target.value })}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm bg-white"
            >
              <option value="Coir">Coir</option>
              <option value="Rubber">Rubber</option>
              <option value="Cotton">Cotton</option>
              <option value="Microfiber">Microfiber</option>
              <option value="PVC">PVC</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Size *</label>
            <input
              type="text"
              required
              placeholder="e.g. 16x24 inches"
              value={form.size}
              onChange={(e) => setForm({ ...form, size: e.target.value })}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Available Colors *</label>
            <input
              type="text"
              required
              placeholder="e.g. Brown, Red, Black"
              value={form.availableColors}
              onChange={(e) => setForm({ ...form, availableColors: e.target.value })}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Price (INR) *</label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="e.g. 250"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Product Photos (Front, Back, etc.) {editingId ? '(Optional on edit)' : '*'}
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full text-sm text-stone-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-amber-50 file:text-amber-800 hover:file:bg-amber-100"
            />
            {images.length > 0 && (
              <p className="text-xs text-emerald-700 mt-1 font-medium">
                {images.length} photo(s) selected (1st photo = Cover)
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-stone-700 mb-1">Description</label>
            <input
              type="text"
              placeholder="Short details about durability, washability, etc."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm"
            />
          </div>

          <div className="flex items-center gap-2 pt-5">
            <input
              type="checkbox"
              id="inStock"
              checked={form.inStock}
              onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
              className="w-4 h-4 accent-amber-800"
            />
            <label htmlFor="inStock" className="text-sm font-medium text-stone-700">
              Currently In Stock
            </label>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 bg-amber-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-amber-900 transition disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              {submitting ? 'Uploading Photos & Saving...' : editingId ? 'Update Doormat' : 'Add Doormat to Catalog'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-100 text-xs uppercase text-stone-600 border-b border-stone-200">
              <th className="p-3">Photos</th>
              <th className="p-3">Name</th>
              <th className="p-3">Specs</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 text-sm">
            {products.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50">
                <td className="p-3">
                  <div className="relative inline-block">
                    <img src={item.imageUrl} alt={item.name} className="w-14 h-14 object-cover rounded-lg border" />
                    <span className="absolute -bottom-1.5 -right-1.5 bg-amber-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Images className="w-2.5 h-2.5" /> {getPhotoCount(item)}
                    </span>
                  </div>
                </td>
                <td className="p-3 font-medium text-stone-900">{item.name}</td>
                <td className="p-3 text-xs text-stone-600">
                  <div>{item.material} | {item.size}</div>
                  <div className="text-stone-500">{item.availableColors}</div>
                </td>
                <td className="p-3 font-semibold text-amber-800">{item.price}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${item.inStock ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {item.inStock ? 'In Stock' : 'Out'}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 text-amber-800 rounded-lg hover:bg-amber-100 text-xs font-medium"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-xs font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
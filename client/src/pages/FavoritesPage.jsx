// client/src/pages/FavoritesPage.jsx
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchProducts } from '../api/product.routes';
import LoadingSpinner from '../components/LoadingSpinner';

export default function FavoritesPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const favoriteIds = useSelector((state) => state.favorites.items || []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data } = await fetchProducts();

        if (data && Array.isArray(data)) {
          const favSet = new Set(favoriteIds.map((id) => Number(id)));
          const onlyFavorites = data.filter((p) => favSet.has(Number(p.id)));
          setProducts(onlyFavorites);
        } else {
          setError('Nu s-au putut încărca produsele.');
        }
      } catch (err) {
        setError(err.message || 'A apărut o eroare la încărcarea produselor.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [favoriteIds]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-4">
        <div className="text-center bg-white rounded-2xl shadow-md px-6 py-6 border border-emerald-100">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Nu ai produse la favorite</h2>
          <p className="text-sm text-slate-600">
            Apasă pe inimioara unui produs din listă pentru a-l adăuga aici.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-700">Produse favorite</h1>
            <p className="mt-1 text-sm text-slate-600">
              Lista produselor pe care le-ai marcat cu inimioara.
            </p>
          </div>
        </div>

        {/* Grid produse favorite */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col rounded-2xl bg-white shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Imagine */}
              <div className="relative h-52 bg-slate-50 overflow-hidden">
                <img
                  alt={product.name}
                  src={product.image || 'https://via.placeholder.com/300'}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-medium text-emerald-700">
                  {product.category || 'Categorie necunoscută'}
                </span>
              </div>

              {/* Info produs */}
              <div className="mt-4 flex justify-between px-4 pb-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {product.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-700">
                    {product.price} lei
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Stoc: {product.stock ?? 0} buc
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

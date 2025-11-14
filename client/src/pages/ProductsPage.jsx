// client/src/pages/ProductsPage.jsx
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchProducts, deleteProduct } from '../api/product.routes';
import LoadingSpinner from '../components/LoadingSpinner';
import { toggleFavorite, setFavorites } from '../store/slices/favoritesSlice';
import { getFavorites, addFavorite, removeFavorite } from '../api/favorite.routes';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const user = useSelector((state) => state.user.user);
  const isAdmin = user?.role === 'admin';
  const favorites = useSelector((state) => state.favorites.items || []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isFavorite = (productId) => favorites.includes(productId);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // 1. produsele
        const { data } = await fetchProducts();
        if (data && Array.isArray(data)) {
          setProducts(data);
        } else {
          setError('Failed to load products');
        }

        // 2. favoritele user-ului logat
        if (user) {
          const favResponse = await getFavorites();
          if (favResponse?.success && Array.isArray(favResponse.data)) {
            dispatch(setFavorites(favResponse.data));
          }
        } else {
          dispatch(setFavorites([]));
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, dispatch]);

  const handleFavoriteClick = async (productId) => {
    if (!user) {
      toast.error('Trebuie să fii autentificat pentru a salva la favorite');
      navigate('/login');
      return;
    }

    try {
      if (isFavorite(productId)) {
        const response = await removeFavorite(productId);
        if (response?.success) {
          dispatch(toggleFavorite(productId));
          toast.success('Produs eliminat din favorite');
        } else {
          toast.error(response?.message || 'Nu am putut elimina produsul din favorite');
        }
      } else {
        const response = await addFavorite(productId);
        if (response?.success) {
          dispatch(toggleFavorite(productId));
          toast.success('Produs adăugat la favorite');
        } else {
          toast.error(response?.message || 'Nu am putut adăuga produsul la favorite');
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error(error.message || 'Eroare la actualizarea favorite-lor');
    }
  };

  const handleEditClick = (productId) => {
    navigate(`/products/edit/${productId}`);
  };

  const handleDeleteClick = async (productId) => {
    if (!confirm('Sigur vrei să ștergi acest produs?')) {
      return;
    }

    try {
      setDeletingId(productId);
      const response = await deleteProduct(productId);

      if (response?.success) {
        setProducts(products.filter((p) => p.id !== productId));
        toast.success('Produs șters cu succes');
      } else {
        toast.error(response?.message || 'Nu am putut șterge produsul');
      }
    } catch (err) {
      toast.error(err.message || 'A apărut o eroare la ștergerea produsului');
    } finally {
      setDeletingId(null);
    }
  };

  const handleCreateClick = () => {
    navigate('/products/create');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-white h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="bg-white h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 font-semibold">Nu există produse disponibile</p>
          {isAdmin && (
            <button
              onClick={handleCreateClick}
              className="mt-4 inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              Adaugă primul produs
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 h-screen overflow-y-auto">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Produse farmaceutice
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Catalog de medicamente, suplimente și produse de îngrijire.
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={handleCreateClick}
              className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              Adaugă produs
            </button>
          )}
        </div>

        {/* Grid produse */}
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

                {/* Badge categorie */}
                <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-medium text-emerald-700">
                  {product.category || 'Categorie necunoscută'}
                </span>

                {/* Butoane admin (edit / delete) */}
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button
                      type="button"
                      className="bg-sky-500 hover:bg-sky-600 text-white p-2 rounded-md shadow-lg transition-colors duration-200"
                      onClick={() => handleEditClick(product.id)}
                      title="Editează"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleDeleteClick(product.id)}
                      disabled={deletingId === product.id}
                      title="Șterge"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                )}

                {/* INIMIOARA favorite */}
                <button
                  onClick={() => handleFavoriteClick(product.id)}
                  className="
                    absolute bottom-2 right-2 
                    w-9 h-9
                    flex items-center justify-center
                    rounded-full shadow-lg 
                    bg-white/90 hover:bg-white 
                    transition-all duration-200
                    z-20
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isFavorite(product.id) ? '#ff4d6d' : 'none'}
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="#ff4d6d"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.936 0-3.622 1.248-4.312 3.001C11.31 4.998 9.624 3.75 7.688 3.75 5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>
              </div>

              {/* Conținut card */}
              <div className="mt-4 flex justify-between px-4 pb-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">{product.category}</p>
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

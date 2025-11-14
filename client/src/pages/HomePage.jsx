// client/src/pages/HomePage.jsx
import { Link } from 'react-router'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Col stânga - text principal */}
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            🩺 Trusted Pharma Store
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
            Produse farmaceutice
            <span className="block text-emerald-600">
              sigure și de încredere
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600">
            Descoperă suplimente, medicamente OTC și produse de îngrijire,
            selectate cu grijă pentru sănătatea ta. Informează-te corect,
            cumpără responsabil.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition"
            >
              Vezi produsele
            </Link>

            <div className="flex flex-col text-xs sm:text-sm text-slate-500">
              <span className="font-medium text-slate-700">
                🔒 Siguranța pe primul loc
              </span>
              <span>Informații clare despre indicații și contraindicații.</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="rounded-xl border border-slate-100 bg-white/80 p-4 shadow-sm">
              <p className="text-2xl mb-1">500+</p>
              <p className="text-xs text-slate-500">
                Produse farmaceutice și suplimente
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white/80 p-4 shadow-sm">
              <p className="text-2xl mb-1">24/7</p>
              <p className="text-xs text-slate-500">
                Acces rapid la informații despre produse
              </p>
            </div>
          </div>
        </div>

        {/* Col dreapta - „carduri” info */}
        <div className="relative">
          <div className="absolute -top-10 -right-6 h-40 w-40 rounded-full bg-emerald-200/60 blur-3xl" />
          <div className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-sky-200/60 blur-3xl" />

          <div className="relative grid gap-4">
            <div className="rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💊</span>
                <h2 className="text-sm font-semibold text-slate-800">
                  Medicamente OTC & suplimente
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Găsești rapid produse pentru durere, digestie, imunitate,
                dermatologie și multe altele.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📋</span>
                <h2 className="text-sm font-semibold text-slate-800">
                  Detalii clare pentru fiecare produs
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Compoziție, indicații, contraindicații și mod de administrare
                afișate transparent.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-md">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⭐</span>
                <h2 className="text-sm font-semibold text-slate-800">
                  Recenzii și favorite
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Utilizatorii își pot salva produsele preferate și pot lăsa
                feedback (în funcție de ce implementezi în backend).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

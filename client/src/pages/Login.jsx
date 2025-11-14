import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { loginUser } from "../api/auth.routes"
import { setToken } from "../store/slices/userSlice"

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const response = await loginUser(formData)
    
    if (response?.success) {
      dispatch(setToken(response.data))
      toast.success("Autentificare reușită! Redirecționare...")
      setTimeout(() => {
        navigate("/")
      }, 1500)
    } else {
      toast.error(response?.message || "Autentificare eșuată")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header + logo */}
        <div className="text-center mb-8">
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
            Autentificare în cont
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Accesează panoul tău pentru gestionarea produselor farmaceutice.
          </p>
        </div>

        {/* Card formular */}
        <div className="rounded-2xl bg-white shadow-lg border border-slate-100 p-6 sm:p-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Adresă de email
              </label>
              <div className="mt-1.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  placeholder="ex: nume@exemplu.ro"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Parolă
                </label>
              </div>
              <div className="mt-1.5">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                  placeholder="Introdu parola"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 flex w-full justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              Autentificare
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Nu ai încă un cont?{" "}
            <Link
              to="/register"
              className="font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Înregistrează-te
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

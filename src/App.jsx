import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CatalogPage from './pages/CatalogPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          </Routes>
        </main>
        <footer className="bg-stone-900 text-stone-300 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <img
                  src="/logo.png"
                  alt="Sadik Handloom Logo"
                  className="h-9 w-9 object-contain rounded bg-white p-0.5"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <h3 className="text-lg font-bold text-white">SADIK HANDLOOM</h3>
              </div>
              <p className="text-xs text-stone-400 flex items-start gap-2 mt-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Behind Government Hospital, Village Gangeru, Uttar Pradesh – 247775, India.</span>
              </p>
            </div>

            <div className="md:text-right space-y-1.5 text-xs">
              <p className="flex md:justify-end items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500" />
                <a href="tel:+919917485101" className="hover:text-white">+91 9917485101</a>
              </p>
              <p className="flex md:justify-end items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500" />
                <a href="mailto:sadikhandloom1@gmail.com" className="hover:text-white">sadikhandloom1@gmail.com</a>
              </p>
            </div>
          </div>
          <div className="border-t border-stone-800 py-3 text-center text-xs text-stone-500">
            © 2026 SADIK HANDLOOM. All rights reserved.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
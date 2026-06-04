import React from "react";
import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 p-6">
      <div style={{ maxWidth: 720 }} className="text-center">
        <h1 style={{ fontSize: 72, margin: 0, lineHeight: 1 }} className="text-amber-700">403</h1>
        <h2 className="text-2xl font-semibold mt-4">Akses Ditolak</h2>
        <p className="mt-2 text-slate-600">Anda tidak memiliki izin untuk mengakses halaman ini. Jika ini sebuah kesalahan, hubungi administrator.</p>
        <div className="mt-6 space-x-3">
          <Link to="/" className="inline-block bg-gray-200 text-slate-800 px-4 py-2 rounded-md">Kembali ke Beranda</Link>
          <Link to="/login" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md">Login sebagai Admin</Link>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="min-h-screen grid place-items-center bg-gray-50 p-6">
			<div style={{ maxWidth: 680 }} className="text-center">
				<h1 style={{ fontSize: 96, margin: 0, lineHeight: 1 }} className="text-slate-700">404</h1>
				<h2 className="text-2xl font-semibold mt-4">Halaman tidak ditemukan</h2>
				<p className="mt-2 text-slate-600">URL yang dimasukkan tidak dikenali. Periksa kembali atau kembali ke halaman utama.</p>
				<div className="mt-6">
					<Link to="/" className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md">Kembali ke Beranda</Link>
				</div>
			</div>
		</div>
	);
}

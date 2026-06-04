import { useState, useEffect } from 'react'; // 1. Impor React Hooks untuk kelola data
import Navbar from '../../components/navbar.jsx';

function Berita() {
	// 2. Buat wadah penampung data berita dari database (bawaan kosong/array)
	const [newsItems, setNewsItems] = useState([]);
	const [loading, setLoading] = useState(true);

	// 3. Fungsi untuk mengambil data dari API Backend
	useEffect(() => {
		const ambilDataBerita = async () => {
			try {
				// Sesuaikan alamat url port backend Anda (misal port 5000)
				const respon = await fetch('http://localhost:5000/api/berita'); 
				const data = await respon.json();
				
				setNewsItems(data); // Simpan data dari database ke dalam state
				setLoading(false);
			} catch (error) {
				console.error("Gagal mengambil data berita:", error);
				setLoading(false);
			}
		};

		ambilDataBerita();
	}, []); // Array kosong memastikan fungsi hanya berjalan 1 kali saat halaman dibuka

	if (loading) {
		return <div className="text-center p-10 font-semibold">Memuat data berita...</div>;
	}

	return (
		<main className="min-h-screen bg-slate-100 text-slate-900 font-sans">
			<Navbar />

			<section className="mx-auto max-w-5xl px-4 py-8 md:px-6">
				<div className="mb-6 border-b border-slate-200 pb-4">
					<h1 className="text-xl font-bold text-slate-900">Berita Resmi Sekolah</h1>
				</div>

				<div className="space-y-4">
					{/* Jika data berita di database masih kosong */}
					{newsItems.length === 0 && <p className="text-slate-500">Beluk ada berita tersedia.</p>}

					{/* 4. Looping data dinamis langsung dari database MongoDB */}
					{newsItems.map((item) => (
						<article 
							key={item._id} // Menggunakan ID bawaan unik dari MongoDB (_id)
							className="flex gap-4 rounded-xl bg-white p-4 shadow-sm border border-slate-100"
						>
							{/* Menampilkan Gambar Asli dari Backend, jika kosong pakai kotak abu-abu */}
							{item.imageUrl ? (
								<img src={item.imageUrl} alt={item.title} className="h-24 w-24 object-cover flex-shrink-0 rounded-lg md:h-32 md:w-40" />
							) : (
								<div className="h-24 w-24 flex-shrink-0 rounded-lg bg-slate-300 md:h-32 md:w-40" />
							)}

							<div className="flex flex-1 flex-col justify-between min-w-0">
								<div>
									<h2 className="line-clamp-2 text-sm font-bold text-slate-900 md:text-base">
										{item.title}
									</h2>
									<p className="mt-1 line-clamp-2 text-xs text-slate-500 leading-relaxed">
										{item.summary} {/* Menampilkan ringkasan berita */}
									</p>
								</div>
								
								<span className="text-[10px] text-slate-400 font-medium md:text-xs">
									{/* Mengubah format tanggal database agar rapi dibaca */}
									{new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
								</span>
							</div>
						</article>
					))}
				</div>
			</section>
		</main>
	);
}

export default Berita;

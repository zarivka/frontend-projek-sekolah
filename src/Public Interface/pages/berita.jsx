import Navbar from '../../components/navbar.jsx' // Sesuaikan path navbar Anda

// 1. Data Berita sesuai dengan gambar contoh Anda
const newsItems = [
	{
		title: 'Siswa SMKN 10 Semarang Raih Juara 3 Lomba Mechanical Engineering Cad Lks SMK KOTA SEMARANG 2026',
		description: 'Trejo Bagus Kusuma, siswa Teknik Pengelasan SMK Negeri 10 Semarang, meraih Juara 3 Mechanical Engineering CAD pada LKS SMK Kota Semarang 2026 di tengah persaingan ketat.',
		date: '10 Apr 2026',
	},
	{
		title: 'Siswa SMKN 10 Semarang Raih Juara 1 Di Mojokerto Ju-Jitsu Open Tournament 2026',
		description: 'Kejuaraan Ju-Jitsu Open Tournament Piala KONI Kabupaten Mojokerto 2026 atau yang dikenal dengan Mojokerto Ju-Jitsu Open Tournament (MJOT) 2026 resmi berakhir pada Sabtu (18/1/2026). Ajang bergengsi ini menjadi wadah pembinaan...',
		date: '09 Apr 2026',
	},
	{
		title: 'Gerakan Guru Menulis Dongkrak Kenaikan Pangkat, 74 Persen Guru PNS di SMK Negeri 10 Semarang Naik Golongan',
		description: 'Kenaikan pangkat guru adalah peningkatan karier berdasarkan kinerja, masa kerja, dan angka kredit sesuai aturan, yang di SMK Negeri 10 Semarang berdampak pada kesejahteraan guru.',
		date: '08 Apr 2026',
	},
	{
		title: 'Gerakan GTK Menulis SMK Negeri 10 Semarang Tembus 1.000 Artikel, Bukti Budaya Literasi Tumbuh Nyata',
		description: 'SMK Negeri 10 Semarang mencapai 1.000 artikel dari program GTK Menulis sejak 2022, dengan partisipasi aktif seluruh guru dan tenaga kependidikan.',
		date: '07 Apr 2026',
	},
]

function Berita() {
	return (
		<main className="min-h-screen bg-slate-100 text-slate-900 font-sans">
			{/* Menampilkan Navbar Utama */}
			<Navbar />

			{/* Kontainer Isi Halaman */}
			<section className="mx-auto max-w-5xl px-4 py-8 md:px-6">
				
				{/* Bagian Judul Halaman (Sesuai Gambar) */}
				<div className="mb-6 border-b border-slate-200 pb-4">
					<h1 className="text-xl font-bold text-slate-900">Berita</h1>
					<p className="mt-1 text-xs text-slate-500">
						Informasi terbaru seputar kegiatan dan prestasi sekolah.
					</p>
				</div>

				{/* Tempat Daftar Berita Berjejer ke Bawah */}
				<div className="space-y-4">
					{newsItems.map((item, index) => (
						<article 
							key={index} 
							className="flex gap-4 rounded-xl bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)] border border-slate-100 transition hover:shadow-md"
						>
							{/* 1. Kotak Abu-abu / Placeholder Gambar (Sisi Kiri) */}
							<div className="h-24 w-24 flex-shrink-0 rounded-lg bg-slate-300 md:h-32 md:w-40" />

							{/* 2. Informasi Konten Berita (Sisi Kanan) */}
							<div className="flex flex-1 flex-col justify-between min-w-0">
								<div>
									{/* Judul Berita */}
									<h2 className="line-clamp-2 text-sm font-bold text-slate-900 hover:text-blue-600 cursor-pointer md:text-base">
										{item.title}
									</h2>
									{/* Deskripsi Singkat */}
									<p className="mt-1 line-clamp-2 text-xs text-slate-500 leading-relaxed md:block hidden">
										{item.description}
									</p>
								</div>
								
								{/* Tanggal Berita */}
								<span className="text-[10px] text-slate-400 font-medium md:text-xs">
									{item.date}
								</span>
							</div>
						</article>
					))}
				</div>

			</section>
		</main>
	)
}

export default Berita

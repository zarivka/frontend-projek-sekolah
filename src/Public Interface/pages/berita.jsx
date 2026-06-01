import Navbar from '../../components/navbar.jsx'
import { useEffect, useState } from 'react'
import api from '../../api/index.js'

function Berita() {
	const [newsItems, setNewsItems] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let mounted = true
		const fetchNews = async () => {
			try {
				const res = await api.get('/berita')
				if (mounted) setNewsItems(res.data)
			} catch (err) {
				console.error('Failed to fetch berita:', err)
			} finally { if (mounted) setLoading(false) }
		}
		fetchNews()
		return () => { mounted = false }
	}, [])

	return (
		// To Manazhir: Kode mu tak ubah sitik men luwer rapi
		<main className="min-h-screen bg-slate-100 text-slate-900 font-sans">
			<Navbar />
			<section className="mx-auto max-w-5xl px-4 py-8 md:px-6">
				<div className="mb-6 border-b border-slate-200 pb-4">
					<h1 className="text-xl font-bold text-slate-900">Berita</h1>
					<p className="mt-1 text-xs text-slate-500">Informasi terbaru seputar kegiatan dan prestasi sekolah.</p>
				</div>

				<div className="space-y-4">
					{loading && <p className="text-sm text-slate-500">Memuat berita...</p>}
					{!loading && newsItems.length === 0 && <p className="text-sm text-slate-500">Belum ada berita.</p>}
					{newsItems.map((item) => (
						<article key={item._id} className="flex gap-4 rounded-xl bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)] border border-slate-100 transition hover:shadow-md">
							<div className="h-24 w-24 shrink-0 rounded-lg bg-slate-300 md:h-32 md:w-40">
								{item.imageUrl && (
									<img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover rounded-lg" />
								)}
							</div>
							<div className="flex flex-1 flex-col justify-between min-w-0">
								<div>
									<h2 className="line-clamp-2 text-sm font-bold text-slate-900 hover:text-blue-600 cursor-pointer md:text-base">{item.title}</h2>
									<p className="mt-1 line-clamp-2 text-xs text-slate-500 leading-relaxed md:block hidden">{item.summary}</p>
								</div>
								<span className="text-[10px] text-slate-400 font-medium md:text-xs">{new Date(item.createdAt).toLocaleDateString()}</span>
							</div>
						</article>
					))}
				</div>
			</section>
		</main>
	)
}

export default Berita

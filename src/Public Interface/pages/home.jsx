import { HiOutlineChevronRight, HiOutlineMagnifyingGlass, HiOutlineUserGroup } from 'react-icons/hi2'
import { FaBullhorn } from 'react-icons/fa6'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/index.js'
import Navbar from '../../components/navbar.jsx'

const teacherItems = [
	{ name: 'Albasori S.Pd', role: 'Kepala Sekolah' },
	{ name: 'Guru 1', role: 'Guru' },
	{ name: 'Guru 2', role: 'Guru' },
	{ name: 'Karyawan 1', role: 'Karyawan' },
	{ name: 'Karyawan 2', role: 'Karyawan' },
]

const studentItems = [
	{ name: 'Siswa 1', role: 'Siswa Aktif' },
	{ name: 'Siswa 2', role: 'Siswa Aktif' },
	{ name: 'Siswa 3', role: 'Siswa Aktif' },
	{ name: 'Alumni 1', role: 'Alumni' },
	{ name: 'Alumni 2', role: 'Alumni' },
]

function SectionHeading({ title, action }) {
	return (
		<div className="mb-5 flex items-center justify-between gap-4">
			<div>
				<h2 className="text-lg font-semibold text-slate-900">{title}</h2>
				<p className="text-sm text-blue-600">Preview</p>
			</div>
			<button className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50">
				<HiOutlineUserGroup className="text-lg" />
				<span>{action}</span>
				<HiOutlineChevronRight className="text-base" />
			</button>
		</div>
	)
}

function AvatarCard({ name, role }) {
	return (
		<div className="flex min-w-0 flex-col items-center text-center">
			<div className="mb-3 h-16 w-16 rounded-full bg-slate-300 shadow-inner ring-4 ring-white" />
			<h3 className="truncate text-sm font-semibold text-slate-900">{name}</h3>
			<p className="text-xs text-slate-500">{role}</p>
		</div>
	)
}

function Home() {
	const [newsItems, setNewsItems] = useState([])
	const [announcements, setAnnouncements] = useState([])
	const [loading, setLoading] = useState(true)
	const [fetchedTeachers, setFetchedTeachers] = useState(null)
	const [fetchedStudents, setFetchedStudents] = useState(null)
	const visibleNews = newsItems.slice(0, 4)
	const remainingNewsCount = Math.max(newsItems.length - visibleNews.length, 0)

	// Fetch news and announcements for the home page
	useEffect(() => {
		let mounted = true
		const load = async () => {
			try {
				const [newsRes, announcementRes] = await Promise.all([api.get('/berita'), api.get('/pengumuman')])
				if (!mounted) return
				setNewsItems(newsRes.data)
				setAnnouncements(announcementRes.data)

				// Try to fetch users (requires Admin token). If allowed, derive teachers and students from users
				try {
					const usersRes = await api.get('/user')
					if (!mounted) return
					const users = usersRes.data
					setFetchedTeachers(users.filter(u => u.role === 'Guru'))
					setFetchedStudents(users.filter(u => u.role === 'Murid'))
				} catch (err) {
					// ignore - keep mock data
				}
			} catch (err) {
				console.error('Failed to load home data:', err)
			} finally { if (mounted) setLoading(false) }
		}
		load()
		return () => { mounted = false }
	}, [])

	return (
		<main className="min-h-screen bg-slate-100 text-slate-900">
			<Navbar />

      {/* Hero */}
			<section className="bg-[#0f7cf0] text-white">
				<div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:px-6 lg:px-8 lg:pb-24 lg:pt-10">
          {/* telusuri section */}
					<div className="mb-12 flex justify-end">
						<label className="flex w-full max-w-xs items-center gap-3 rounded-full bg-white/25 px-4 py-2 text-sm text-white/90 backdrop-blur-sm md:w-72">
							<span className="flex-1">Telusuri</span>
							<HiOutlineMagnifyingGlass className="text-lg text-white/80" />
						</label>
					</div>

          {/* hero content */}
					<div className="max-w-xl pb-10 pt-4">
						<h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
							SMKN 10
							<br />
							SEMARANG
						</h1>
						<p className="mt-5 max-w-md text-lg font-medium leading-relaxed text-white/90">
							Unggul, Kompeten, Berkarakter,
							<br />
							siap kerja, santun, dan mandiri
						</p>
						<button className="mt-6 rounded-lg bg-[#0e5da6] px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-950/20 transition hover:bg-[#0b4d8d]">
							Selengkapnya
						</button>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-6 lg:px-8">
				<div className="rounded-3xl bg-white px-5 py-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:px-7">
					<SectionHeading title="Tenaga Pengajar & Karyawan" action="Lihat Semua Guru & Karyawan" />
					<div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
						{(fetchedTeachers || teacherItems).map((item) => (
							<AvatarCard key={item.nim_nls || item.name} name={item.name} role={item.role || item.role} />
						))}
					</div>
				</div>

				<div className="rounded-3xl bg-white px-5 py-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:px-7">
					<SectionHeading title="Siswa & Alumni" action="Lihat Semua Siswa & Alumni" />
					<div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
						{(fetchedStudents || studentItems).map((item) => (
							<AvatarCard key={item.nim_nls || item.name} name={item.name} role={item.role || (item.role === undefined ? 'Siswa' : item.role)} />
						))}
					</div>
				</div>

				<div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
					<div>
						<div className="mb-4 flex items-center justify-between">
							<h2 className="text-lg font-semibold text-slate-900">Berita Terbaru</h2>
							<Link to="/berita" className="text-sm font-medium text-blue-600 hover:text-blue-700">
								Lihat Semua
							</Link>
						</div>
						<div className="grid gap-4 sm:grid-cols-2">
							{visibleNews.map((item) => (
								<article key={item._id || item.title} className="overflow-hidden rounded-2xl bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
									<div className="h-28 bg-slate-300 overflow-hidden">
										{item.imageUrl ? (
											<img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
										) : null}
									</div>
									<div className="p-4">
										<h3 className="text-sm font-semibold leading-snug text-slate-900">{item.title}</h3>
										<p className="mt-4 text-xs text-slate-500">{item.date || new Date(item.createdAt).toLocaleDateString()}</p>
									</div>
								</article>
							))}
						</div>
						{remainingNewsCount > 0 ? (
							<div className="mt-4 rounded-2xl border border-dashed border-blue-200 bg-blue-50/80 px-4 py-3 text-sm text-blue-700">
								<span className="font-semibold">...</span>
								<span className="ml-2">Masih ada {remainingNewsCount} berita lain yang bisa dibaca.</span>
							</div>
						) : null}
					</div>

					<div className="rounded-2xl bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
						<h2 className="mb-4 text-lg font-semibold text-slate-900">Pengumuman Terbaru</h2>
						<div className="space-y-4">
							{announcements.map((item) => (
								<article key={item.title} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
									<div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
										<FaBullhorn />
									</div>
									<div className="min-w-0 flex-1">
										<div className="flex items-start justify-between gap-3">
											<h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
											<span className="whitespace-nowrap text-[11px] text-slate-400">{item.date}</span>
										</div>
										<p className="mt-1 text-xs leading-relaxed text-slate-500">{item.description}</p>
									</div>
								</article>
							))}
						</div>
					</div>
				</div>
			</section>

			<div className="h-10" />
		</main>
	)
}

export default Home

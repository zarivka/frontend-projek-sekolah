import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Navbar = () => {
	const { user, logout } = useAuth()
	const isAdmin = String(user?.role || '').toLowerCase() === 'admin'

	const publicLinks = [
		{ to: '/', label: 'Beranda' },
		{ to: '/profil', label: 'Profil' },
		{ to: '/akademik', label: 'Akademik' },
		{ to: '/berita', label: 'Berita' },
		{ to: '/pengumuman', label: 'Pengumuman' },
		{ to: '/galeri', label: 'Galeri' },
		{ to: '/kontak', label: 'Kontak' },
	]

	const links = isAdmin ? [...publicLinks, { to: '/dashboard', label: 'Dashboard' }] : publicLinks

	return (
		<header className="border-b border-blue-950/10 bg-[#0f58a8] text-white shadow-[0_8px_30px_rgba(15,88,168,0.2)]">
			<div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
				<div className="text-3xl font-extrabold tracking-wider">KASEP</div>
				<nav className="hidden flex-1 justify-center text-lg text-white/90 md:flex">
					<div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
						{links.map((link) => (
							<Link key={link.to} to={link.to} className="transition-colors hover:text-white">
								{link.label}
							</Link>
						))}
					</div>
				</nav>
				<div className="flex items-center gap-3 md:gap-4 md:shrink-0">
					{!user && (
						<>
							<Link to="/login" className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white/90 transition-colors hover:border-white/50 hover:text-white md:text-base">Masuk</Link>
						</>
					)}

					{user && (
						<>
							<div className="hidden flex-col items-end leading-tight md:flex">
								<span className="text-sm font-semibold">{user.name}</span>
								<span className="text-xs text-white/70">{user.role}</span>
							</div>
							<button onClick={logout} className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#0f58a8] transition-colors hover:bg-white md:text-base">Logout</button>
						</>
					)}
				</div>
			</div>
		</header>
	)
}

export default Navbar
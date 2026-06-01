import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Navbar = () => {
	const { user, logout } = useAuth()

	return (
		<header className="border-b border-blue-950/10 bg-[#0f58a8] text-white shadow-[0_8px_30px_rgba(15,88,168,0.2)]">
			<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 md:px-6 lg:px-8">
				<div className="text-3xl font-extrabold tracking-wider">KASEP</div>
				<nav className="hidden text-2xl md:flex space-x-14 text-white/90">
					<Link to="/" className="hover:text-white">Beranda</Link>
					<Link to="/profil" className="hover:text-white">Profil</Link>
					<Link to="/akademik" className="hover:text-white">Akademik</Link>
					<Link to="/berita" className="hover:text-white">Berita</Link>
					<Link to="/pengumuman" className="hover:text-white">Pengumuman</Link>
					<Link to="/galeri" className="hover:text-white">Galeri</Link>
					<Link to="/kontak" className="hover:text-white">Kontak</Link>
				</nav>
				<div className="flex items-center gap-4">
					{!user && (
						<>
							<Link to="/login" className="text-white/90 hover:text-white">Masuk</Link>
						</>
					)}

					{user && (
						<>
							<span className="hidden md:inline">{user.name}</span>
							<button onClick={logout} className="bg-white/90 text-[#0f58a8] px-3 py-1 rounded-md">Logout</button>
						</>
					)}
				</div>
			</div>
		</header>
	)
}

export default Navbar
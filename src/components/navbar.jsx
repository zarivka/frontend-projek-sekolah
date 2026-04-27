import React from 'react';

// placeholder navbar component
const menuItems = ['Beranda', 'Profil', 'Akademik', 'Berita', 'Pengumuman', 'Galeri', 'Kontak']

// Navbar masih belum ada komponen link yang aktif, jadi hanya menampilkan menu statis saja
const Navbar = () => {
  return (
    <header className="border-b border-blue-950/10 bg-[#0f58a8] text-white shadow-[0_8px_30px_rgba(15,88,168,0.2)]">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 md:px-6 lg:px-8">
					<div className="text-3xl font-extrabold tracking-wider">KASEP</div>
					<nav className="hidden text-2xl md:flex space-x-14 text-white/90">
						{menuItems.map((item, index) => (
							<a key={item} href="#" className="group relative text-white/80 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-white">
								{item}
							</a>
						))}
					</nav>
					<div className="h-9 w-9 rounded-full bg-white/90" />
				</div>
			</header>
  )
}

export default Navbar;
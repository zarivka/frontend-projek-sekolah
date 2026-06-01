import { FiKey } from 'react-icons/fi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/index.js'
import { useAuth } from '../../context/AuthContext.jsx'

function Login() {
	const [nim, setNim] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const { login } = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		try {
			await login(nim, password)
			navigate('/')
		} catch (err) {
			alert(err.response?.data?.message || err.message)
		} finally { setLoading(false) }
	}

	return (
		<div className="min-h-screen bg-white mx-auto flex w-full max-w-7xl items-center justify-center px-6 py-12 md:px-10">
			<div className="w-full max-w-95">
				<form className="space-y-8" onSubmit={handleSubmit}>
					<label className="block border-b border-slate-500 pb-2">
						<span className="flex items-center gap-4 text-slate-600">
							<input
								value={nim}
								onChange={(e) => setNim(e.target.value)}
								type="text"
								placeholder="Masukkan NIM / NLS"
								className="w-full bg-transparent text-lg text-slate-700 outline-none placeholder:text-slate-600"
							/>
						</span>
					</label>

					<div>
						<label className="block border-b border-slate-500 pb-2">
							<span className="flex items-center gap-4 text-slate-600">
								<FiKey className="text-xl" />
								<input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									type="password"
									placeholder="Masukkan Password"
									className="w-full bg-transparent text-lg text-slate-700 outline-none placeholder:text-slate-600"
								/>
							</span>
						</label>
						<div className="mt-3 text-right">
							<a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
								Lupa Password?
							</a>
						</div>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full rounded-2xl bg-[#1380f1] px-5 py-3 text-3xl font-semibold text-white shadow-[0_10px_22px_rgba(19,128,241,0.28)] transition hover:bg-[#0f71d8]"
					>
						{loading ? 'Memproses...' : 'Masuk'}
					</button>

					<p className="pt-1 text-center text-base text-slate-700">
						Belum punya akun?{' '}
						<a href="/register" className="font-semibold text-blue-600 hover:text-blue-700">
							Daftar
						</a>
					</p>
				</form>
			</div>
		</div>
	)
}

export default Login

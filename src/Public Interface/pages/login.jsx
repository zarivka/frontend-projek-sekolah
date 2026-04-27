import { FiKey, FiMail } from 'react-icons/fi'

function Login() {
	return (
		<div className="min-h-screen bg-white mx-auto flex w-full max-w-7xl items-center justify-center px-6 py-12 md:px-10">

      {/* form */}
				<div className="w-full max-w-95">
					<form className="space-y-8">
						<label className="block border-b border-slate-500 pb-2">
							<span className="flex items-center gap-4 text-slate-600">
								<FiMail className="text-xl" />
								<input
									type="email"
									placeholder="Masukkan Email"
									className="w-full bg-transparent text-lg text-slate-700 outline-none placeholder:text-slate-600"
								/>
							</span>
						</label>

						<div>
							<label className="block border-b border-slate-500 pb-2">
								<span className="flex items-center gap-4 text-slate-600">
									<FiKey className="text-xl" />
									<input
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
							type="button"
							className="w-full rounded-2xl bg-[#1380f1] px-5 py-3 text-3xl font-semibold text-white shadow-[0_10px_22px_rgba(19,128,241,0.28)] transition hover:bg-[#0f71d8]"
						>
							Masuk
						</button>

						<p className="pt-1 text-center text-base text-slate-700">
							Belum punya akun?{' '}
							<a href="#" className="font-semibold text-blue-600 hover:text-blue-700">
								Daftar
							</a>
						</p>
					</form>
				</div>
		</div>
	)
}

export default Login

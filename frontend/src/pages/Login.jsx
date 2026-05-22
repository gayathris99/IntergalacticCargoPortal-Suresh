import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/api'
import logo from '../assets/logo.svg'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const data = await login(email, password)
            localStorage.setItem('role', data.role)
            navigate('/dashboard')
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,180,255,0.015) 2px, rgba(0,180,255,0.015) 4px)' }}>
            </div>

            <div className="relative z-10 w-full max-w-sm mx-4">
                <div className="bg-surface border border-border p-10 relative">

                    <div className="flex flex-col items-center mb-8">
                        <img src={logo} alt="IGC Logo" className="w-12 h-12 mb-3" />
                        <h1 className="text-accent text-base font-black tracking-widest">IGC PORTAL</h1>
                        <p className="text-muted text-[10px] tracking-widest mt-1">AUTHENTICATION REQUIRED</p>
                        <div className="w-10 h-px bg-accent opacity-50 mt-3"></div>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="text-muted text-[9px] tracking-widest block mb-1">IDENTITY</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="officer@nebula-corp.com"
                                className="w-full bg-primary border-0 border-b border-accent text-foreground text-sm px-3 py-2 outline-none placeholder-muted"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="text-muted text-[9px] tracking-widest block mb-1">ACCESS CODE</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••••••"
                                className="w-full bg-primary border-0 border-b border-accent text-foreground text-sm px-3 py-2 outline-none placeholder-muted"
                                required
                            />
                        </div>

                        {error && <p className="text-danger text-[9px] tracking-wider mb-4">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent text-primary text-[9px] font-black tracking-widest py-3 cursor-pointer hover:bg-[#0090cc] transition-colors disabled:opacity-50"
                        >
                            {loading ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
                        </button>
                    </form>

                    <p className="text-muted text-[10px] text-center mt-4 tracking-wider">
                        NO ACCOUNT?&nbsp;
                        <Link to="/signup" className="text-accent hover:underline">&nbsp;CREATE ONE</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
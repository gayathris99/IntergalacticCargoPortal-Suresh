import { useNavigate } from 'react-router-dom'
import { logout } from '../api/api'
import logo from '../assets/logo.svg'

export default function Navbar() {
    const navigate = useNavigate()
    const role = localStorage.getItem('role')

    const handleLogout = async () => {
        await logout()
        localStorage.removeItem('role')
        navigate('/login')
    }

    return (
        <nav className="bg-surface border-b border-border px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <img src={logo} alt="IGC Logo" className="w-7 h-7 flex-shrink-0" />
                <div>
                    <h1 className="text-accent text-[10px] md:text-xs font-black tracking-widest leading-tight">INTERGALACTIC CARGO</h1>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-accent text-[8px] border border-accent px-2 py-1 tracking-widest">
                    {role === 'admin' ? 'ADMIN' : 'STANDARD'}
                </span>
                <button
                    onClick={handleLogout}
                    className="text-danger text-[8px] border border-danger px-2 py-1 tracking-widest hover:bg-danger hover:text-primary transition-colors"
                >
                    LOGOUT
                </button>
            </div>
        </nav>
    )
}
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import CargoTable from '../components/CargoTable'
import { getCargo, uploadManifest } from '../api/api'
import UploadManifest from '../components/UploadManifest'
import StatusCards from '../components/StatusCards'

export default function Dashboard() {
    const [cargo, setCargo] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [uploadMessage, setUploadMessage] = useState('')
    const [uploading, setUploading] = useState(false)
    const [duplicates, setDuplicates] = useState([])

    const role = localStorage.getItem('role')


    const fetchCargo = async () => {
        try {
            const data = await getCargo()
            setCargo(data.cargo)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleUpload = async (file) => {
        setUploading(true)
        setUploadMessage('')
        setError('')
        try {
            const data = await uploadManifest(file)
            setUploadMessage(`Saved: ${data?.savedCargos?.length} · Skipped: ${data?.removedCargos?.length}`)
            if (data?.duplicateCargos?.length > 0) {
                setDuplicates(data.duplicateCargos)
            }
            fetchCargo()    
        } catch (err) {
            setError(err.message)
        } finally {
            setUploading(false)
        }
    }

    useEffect(() => {
        fetchCargo()
    }, [])

    return (
        <div className="min-h-screen bg-primary">
            <Navbar />

            <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-accent text-sm font-black tracking-widest">CARGO MANIFEST</h2>
                        <p className="text-muted text-[9px] tracking-widest mt-1">{cargo.length} ACTIVE SHIPMENTS</p>
                    </div>
                    {role === 'admin' && (
                        <UploadManifest onUpload={handleUpload} uploading={uploading} />
                    )}
                </div>

                <StatusCards cargo={cargo} role={role}/>

                {uploadMessage && <p className="text-accent text-[9px] tracking-wider mb-4">{uploadMessage}</p>}

                {duplicates.length > 0 && (
                    <div className="bg-surface border border-danger p-3 mb-4">
                        <p className="text-danger text-[8px] tracking-widest mb-2">
                            {duplicates.length} DUPLICATE CARGO IDs SKIPPED:
                        </p>
                        <p className="text-foreground text-[9px] tracking-wider">
                            {duplicates.join(', ')}
                        </p>
                    </div>
                )}

                {error && <p className="text-danger text-[9px] tracking-wider mb-4">{error}</p>}

                {loading ? (
                    <p className="text-muted text-[9px] tracking-widest text-center mt-10">LOADING...</p>
                ) : (
                    <CargoTable cargo={cargo} role={role} />
                )}
            </div>
        </div>
    )

}
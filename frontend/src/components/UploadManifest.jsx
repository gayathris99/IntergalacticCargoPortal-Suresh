export default function UploadManifest({ onUpload, uploading }) {
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        onUpload(file)
    }

    return (
        <label className={`border border-accent text-accent text-[9px] font-black tracking-widest px-4 py-2 cursor-pointer hover:bg-accent hover:text-primary transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
            {uploading ? 'UPLOADING...' : '↑ UPLOAD MANIFEST'}
            <input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="hidden"
                disabled={uploading}
            />
        </label>
    )
}
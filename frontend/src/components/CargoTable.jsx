export default function CargoTable({ cargo, role }) {

    const sortCargo = (cargoList) => {
        const earth = cargoList.filter(c => c.destination.toLowerCase().includes('earth'))
        const rest = cargoList.filter(c => !c.destination.toLowerCase().includes('earth'))
        rest.sort((a, b) => b.weight - a.weight)
        earth.sort((a, b) => b.weight - a.weight)
        return [...rest, ...earth]
    }

    const displayWeight = (weight) => {
        if (role === 'admin') return `${weight} KG`
        return `${(weight * 2.20462).toFixed(2)} LBS`
    }

    const sortedCargo = sortCargo(cargo)

    return (
        <div className="border border-border relative overflow-x-auto">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
            <table className="w-full border-collapse text-[11px]">
                <thead>
                    <tr>
                        <th className="text-muted text-[8px] tracking-widest text-left px-4 py-3 border-b border-border">CARGO ID</th>
                        <th className="text-muted text-[8px] tracking-widest text-left px-4 py-3 border-b border-border">DESTINATION</th>
                        <th className="text-muted text-[8px] tracking-widest text-left px-4 py-3 border-b border-border">WEIGHT</th>
                        <th className="text-muted text-[8px] tracking-widest text-left px-4 py-3 border-b border-border">DATE</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCargo.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center py-12">
                                <p className="text-muted text-[9px] tracking-widest">NO CARGO RECORDS FOUND</p>
                                {role === 'admin' && <p className="text-muted text-[8px] tracking-widest mt-2 opacity-50">UPLOAD A MANIFEST TO BEGIN</p>}
                            </td>
                        </tr>
                    ) : (
                        sortedCargo.map((item) => (
                            <tr key={item.id} className="hover:bg-surface transition-colors">
                                <td className="text-accent text-[10px] font-black px-4 py-3 border-b border-border">{item.cargo_id}</td>
                                <td className="text-foreground px-4 py-3 border-b border-border">
                                    {item.destination}
                                    {item.destination.toLowerCase().includes('earth') && (
                                        <span className="text-danger text-[7px] border border-danger px-1 ml-2">⬇ PINNED</span>
                                    )}
                                </td>
                                <td className="text-accent font-black px-4 py-3 border-b border-border">{displayWeight(item.weight)}</td>
                                <td className="text-muted px-4 py-3 border-b border-border">{item.date}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
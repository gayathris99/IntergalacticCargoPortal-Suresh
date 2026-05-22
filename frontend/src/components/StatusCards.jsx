export default function StatsCards({ cargo, role }) {
    const displayWeight = (weight) => {
        if (role === 'admin') return `${weight} KG`
        return `${(weight * 2.20462).toFixed(2)} LBS`
    }

    const heaviest = cargo.length > 0 ? Math.max(...cargo.map(c => c.weight)) : 0
    const totalWeight = cargo.reduce((sum, c) => sum + c.weight, 0)

    return (
        <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="bg-surface border border-border border-t-2 border-t-accent p-2 md:p-4">
                <p className="text-muted text-[7px] tracking-widest mb-1">TOTAL</p>
                <p className="text-accent text-lg md:text-2xl font-black">{cargo.length}</p>
            </div>
            <div className="bg-surface border border-border border-t-2 border-t-accent p-2 md:p-4 overflow-hidden">
                <p className="text-muted text-[7px] tracking-widest mb-1">HEAVIEST</p>
                <p className="text-accent text-sm md:text-2xl font-black truncate">{displayWeight(heaviest)}</p>
            </div>
            <div className="bg-surface border border-border border-t-2 border-t-accent p-2 md:p-4 overflow-hidden">
                <p className="text-muted text-[7px] tracking-widest mb-1">TOTAL WT</p>
                <p className="text-accent text-sm md:text-2xl font-black truncate">{displayWeight(totalWeight)}</p>
            </div>
        </div>
    )
}
import { useUnits } from "../hooks/useUnits";


export function UnitSelect ({label, value, onChange, faction}: {label: string; value: string; onChange: (value: string) => void; faction: string}){
    const {units, loading} = useUnits(faction);

    if(loading) return <p>loading {label} </p>
    return (
        <select value={value} onChange={e => onChange(e.target.value)}>
            <option value="">Select an option</option>
            {units.map(u => (
                <option key={u.id} value={u.name}>{u.name}</option>
            ))}
        </select>
    );

}   
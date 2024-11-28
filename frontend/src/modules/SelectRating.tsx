
interface SelectRatingProps {
    value: number
    required?:boolean
    onSelectRating?(_:number): void
}
const SelectRating = ({ value, required = true, onSelectRating = ()=>{}}: SelectRatingProps) => (
    <select value={value}className="border border-gray-300 rounded-md p-2" required={required} onChange={(e) => onSelectRating(Number(e.target.value))}>
        <option value={1}>1 - Poor</option>
        <option value={2}>2 - Fair</option>
        <option value={3}>3 - Good</option>
        <option value={4}>4 - Very Good</option>
        <option value={5}>5 - Excellent</option>
    </select>
);

export default SelectRating;

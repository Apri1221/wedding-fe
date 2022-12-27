
export default function Input({ index, obj, setValue, isDark = false }) {
    return (
        <input
            key={index}
            name={obj.name}
            value={obj.value}
            placeholder={obj.placeholder}
            onChange={(e) => { setValue(e.target.value, index) }}
            className={`${isDark
                ? "bg-gray-100 border-gray-200"
                : "bg-white"
                } w-full border border-gray-200 rounded text-md py-2 px-2`}
        />
    )
}


export default function TextArea({ index, obj, setValue, isDark = false }) {
    return (
        <textarea
            key={index}
            name={obj.name}
            value={obj.value}
            placeholder={obj.placeholder}
            onChange={(e) => { setValue(e.target.value, index) }}
            className={`${isDark
                ? "bg-gray-100 border-gray-200"
                : "bg-white"
                } w-full rounded border-gray-200 py-2 h-auto resize-none px-2`}
        ></textarea>
    )
}
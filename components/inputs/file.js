import { useEffect } from "react"

export default function FileInput({ index, obj, setValue }) {
    useEffect(() => {
        const fileInput = document.getElementById('file_input');

        // listen to file input changes and add the selected files to the form data
        fileInput.addEventListener('change', function () {
            for (let file of fileInput.files) {
                // console.log(file)
                setValue(null, index, file)
            }
        });
    }, [])

    return (
        <div key={index}>
            <label className="block mb-2 text-sm dark:text-gray-300" htmlFor="file_input">{obj.placeholder}</label>
            <input className="block w-full text-sm text-gray-700 rounded border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200" aria-describedby="file_input_help" id="file_input" type="file" />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
        </div>
    )
}
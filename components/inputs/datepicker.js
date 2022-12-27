import { CalendarDaysIcon, } from "@heroicons/react/24/outline"

export default function DatePicker({ index, obj, setValue }) {
    return (
        <div key={index} className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <CalendarDaysIcon className="h-5 w-5 text-gray-500"
                    aria-hidden="true" />
            </div>
            <input
                name={obj.name}
                value={obj.value}
                placeholder={obj.placeholder}
                type="date"
                onChange={(e) => { setValue(e.target.value, index) }}
                className="pl-10 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
    )
}
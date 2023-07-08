import { Fragment } from 'react'
import {
    CheckIcon,
    ChevronDownIcon,
    TrashIcon,
    CalendarIcon
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CardDefault({ id, name, imageSrc, imageAlt, href, updatedAt, isPublish, onDeleteItem, onPublishItem }) {
    const router = useRouter()

    return (
        <div key={id} className="group relative">
            <div className="min-h-60 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 transition ease-out duration-200 lg:aspect-none lg:h-80">          
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    onClick={() => {router.push(href)}}
                    className="h-48 w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm font-medium text-gray-700"> 
                        {name}
                    </h3>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    {updatedAt.split(' ')[0]}
                </div>
            </div>

            {/* menu */}
            <div className="mt-5 flex justify-end">
                <Menu as="div" className="relative">
                    {
                        !isPublish ? (<button
                            type="button"
                            onClick={() => {onPublishItem(id)}}
                            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            {/* <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" /> */}
                            Publish
                        </button>) : (<button
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            Published
                        </button>
                        )
                    }
                    
                </Menu>

                {/* Dropdown */}
                <Menu as="div" className="relative ml-3">
                    <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        More
                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                    </Menu.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-20 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        onClick={() => {onDeleteItem(id)}}
                                        className={classNames(active ? 'bg-red-100' : '', 'block px-4 py-2 text-sm text-red-700')}
                                    >
                                        Delete
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                    >
                                        View
                                    </a>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    )
}
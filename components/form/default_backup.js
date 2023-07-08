import PropTypes from 'prop-types';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { Fragment, useEffect, useState } from "react"
import CarouselCard from './carousel';
import PocketBase from 'pocketbase';
import TextArea from '../inputs/textarea';
import Input from '../inputs/input';
import DatePicker from '../inputs/datepicker';
import FileInput from '../inputs/file';


export default function FormDefault({ isEdit = true, isDark = false, categorySection, indexSection, itemSection, onAddSection, onRemoveSection, onChangeDataSection }) {

    const [selected, setSelected] = useState()

    const pb = new PocketBase('http://127.0.0.1:8090');

    useEffect(() => {
        if (itemSection.section === null) {
            setSelected(categorySection[0])
        } else {
            setSelected(itemSection.section)
        }
    }, [itemSection])

    const setValue = (value, index, file = null) => {
        let tempDataSection = {...itemSection.section}
        tempDataSection.data[index].value = value;
        tempDataSection.data[index].file = file;
        onChangeDataSection(tempDataSection)
    }

    const setSelectedTemplate = (template) => {
        pb.collection('inputs').getFullList(200, {
            filter: `id_template = "${template.id}"`,
        }).then(resultList => {
            // console.log(resultList)
            let tempDataSection = {...selected};
            tempDataSection.data = resultList.map(e => ({ ...e, value: '', image: null }))
            onChangeDataSection(tempDataSection)
        });
    }


    const typeInput = (obj, index) => {
        let defaultRender = null;

        switch (obj.type) {
            case "textarea":
                defaultRender = <TextArea key={index} index={index} obj={obj} setValue={setValue} />
                break;
            case "datepicker":
                defaultRender = <DatePicker key={index} index={index} obj={obj} setValue={setValue} />
                break;
            case "image":
                defaultRender = <FileInput key={index} index={index} obj={obj} setValue={setValue} />
                break;
            default:
                defaultRender = <Input key={index} index={index} obj={obj} setValue={setValue} />
                break;
        }

        return defaultRender;
    }

    return (
        <div className='md:mx-16 shadow-inner rounded p-4 m-4' key={indexSection}>
            {categorySection.length > 0 && selected && <Listbox value={itemSection.section} onChange={(data) => { setSelected(data) }}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {categorySection.map((item, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-700'
                                        }`
                                    }
                                    value={item}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {item.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>}

            {/* list template by section */}
            {
                (selected !== undefined && selected !== null) && <CarouselCard
                    selectedSection={selected}
                    setSelectedTemplateProps={setSelectedTemplate}
                />
            }

            {/* where we typing */}
            {
                itemSection.section && (
                    <div
                        style={{ borderTopWidth: "10px" }}
                        className={`${isDark
                            ? "light-shadow bg-gray-100 text-gray-700"
                            : "shadow-md bg-white"
                            } bg-white px-5 border-t rounded-lg border-black-600 hover:border-gray-300 mt-5`} >

                        <div className="pt-4 pb-8 space-y-4">
                            {
                                itemSection.section.data.map(function (obj, index) {
                                    return typeInput(obj, index)
                                })
                            }

                        </div>
                        {isEdit && (
                            <div className="border-t py-3 flex justify-end items-center space-x-3">
                                <button onClick={() => { onAddSection(indexSection) }}>
                                    <PlusCircleIcon className="h-8 w-8 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                </button>

                                {indexSection !== 0 && <button onClick={() => { onRemoveSection(indexSection) }}>
                                    <MinusCircleIcon className="h-8 w-8 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                </button>}
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}


FormDefault.propTypes = {
    onAddSection: PropTypes.func,
    onRemoveSection: PropTypes.func,
    onChangeDataSection: PropTypes.func,
    indexSection: PropTypes.any,
    itemSection: PropTypes.any,
    categorySection: PropTypes.any,
}
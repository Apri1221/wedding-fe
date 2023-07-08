// draft/1/edit

import { useEffect, useState } from "react";
import FormDefault from "../../../components/form/default";
import PocketBase from 'pocketbase';
import { DocumentCheckIcon } from "@heroicons/react/20/solid";
import saveDraft from "../../../functions/draft";


export default function EditDraft() {
    const pb = new PocketBase('http://127.0.0.1:8090');

    const [categorySection, setListCategorySection] = useState([])
    const [dataSection, setDataSection] = useState([{
        section: null
    }])
    const [slug, setSlug] = useState("")


    useEffect(() => {
        if (categorySection.length < 1) {
            pb.collection('sections').getFullList(200, {
                sort: '-created',
            }).then(resultList => {
                // console.log(resultList)
                setListCategorySection(resultList)
            });
        }
    }, [categorySection])

    const addSection = (index) => {
        let tempDataSection = [...dataSection]
        tempDataSection.splice(index + 1, 0, { section: null })
        setDataSection(tempDataSection)
    }

    const removeSection = (index) => {
        let tempDataSection = [...dataSection]
        tempDataSection.splice(index, 1)
        setDataSection(tempDataSection);
    }

    const changeDataSection = (index, data) => {
        let tempDataSection = [...dataSection];
        tempDataSection[index].section = data;
        setDataSection(tempDataSection)
    }

    // const saveDraft = () => {
    // }

    return (
        <div className="md:px-32 relative mb-24">
            <div className="md:px-16 md:py-8 p-4 flex justify-between sticky top-16 left-0 right-0 backdrop-blur-sm z-10 bg-white bg-opacity-70">
                <h1 className="font-poppins md:text-3xl font-2xl text-2xl">
                    {slug ? slug : 'Draft cerita cintamu'}
                </h1>
                <span className="ml-3">
                    <button
                        onClick={() => {saveDraft()}}
                        type="button"
                        className="inline-flex items-center rounded-md bg-green-500 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <DocumentCheckIcon className="-ml-1 mr-2 h-5 w-5 text-white" aria-hidden="true" />
                        Simpan
                    </button>
                </span>
            </div>
            <div className='m-4 md:mx-16'>
                <input
                    name="slug"
                    value={slug}
                    placeholder="Slug Invitation"
                    onChange={(e) => { setSlug(e.target.value) }}
                    className="bg-white w-full border border-gray-200 text-base sm:text-sm rounded py-2 px-3"
                />
            </div>
            {
                categorySection.length > 1 && dataSection.map((data, index) => {
                    return (
                        <FormDefault 
                            key={index} 
                            indexSection={index}
                            onAddSection={(indexSection) => {addSection(indexSection)}}
                            onRemoveSection={(indexSection) => {removeSection(indexSection)}}
                            onChangeDataSection={(data) => {changeDataSection(index, data)}}
                            itemSection={data}
                            categorySection={categorySection}
                        />
                    )
                })
            }
        </div>
    )
}
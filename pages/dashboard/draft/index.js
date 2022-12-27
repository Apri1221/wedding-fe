// draft/1/edit

import { useEffect, useState } from "react";
import FormDefault from "../../../components/form/default";
import PocketBase from 'pocketbase';
import { DocumentCheckIcon } from "@heroicons/react/20/solid";

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

    const saveDraft = () => {
        console.log(dataSection)
        return
        
        const timer = ms => new Promise(res => setTimeout(res, ms))

        const draft = {
            "id_user": pb.authStore.model.id,
            "slug": slug,
            "is_publish": false,
            "music_background": null,
            "title": slug
        }

        pb.collection('drafts').create(draft).then(dResult => {
            dataSection.forEach(async (e, index) => {
                const draft_section = {
                    id_draft: dResult.id,
                    id_template: e.section.data[0].id_template,
                    order: index
                }

                pb.collection('draft_sections').create(draft_section).then(async (dsResult) => {
                    for (var i = 0; i < e.section.data.length; i++) {
                        // console.log(e.section.data[i])
                        const input_section = {
                            id_draft_section: dsResult.id,
                            id_input: e.section.data[i].id,
                            value: e.section.data[i].value,
                            image: e.section.data[i].image
                        }

                        pb.collection('input_sections').create(input_section);
                        await timer(200); // then the created Promise can be awaited
                    }
                });
                await timer(300); // then the created Promise can be awaited
            })
        });
    }

    return (
        <div className="md:px-32 relative mb-12">
            <div className="md:px-16 md:py-8 p-4 flex justify-between sticky top-16 left-0 right-0 backdrop-blur-sm z-10 bg-white bg-opacity-70">
                <h1 className="font-poppins md:text-3xl font-2xl text-2xl">
                    {slug ? slug : 'Draft cerita cintamu'}
                </h1>
                <span className="ml-3">
                    <button
                        onClick={() => {saveDraft()}}
                        type="button"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <DocumentCheckIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
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
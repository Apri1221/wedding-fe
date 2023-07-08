import { PlusIcon } from "@heroicons/react/24/outline";
import { useRef, useEffect, useState } from "react";
import CardDefault from "../../components/card/default";
import PocketBase from 'pocketbase';
import { useRouter } from "next/router";



export default function Dashboard() {
    const [listDraft, setListDraft] = useState([])
    const api_backend = 'http://127.0.0.1:8090';
    const pb = new PocketBase(api_backend);
    const router = useRouter()

    useEffect(() => {
        // initiate data
        if (listDraft.length > 0) return
        initData();
    });

    const initData = () => {
        pb.collection('drafts').getFullList(200, {
            sort: '-created',
        }).then(async (resultList) => {
            const listTemp = []
            for (let index = 0; index < resultList.length; index++) {
                const data = await pb.collection('draft_sections').getFullList(1, {
                    filter: `id_draft='${resultList[index].id}'`,
                    expand: 'id_template'
                });

                const eTemp = {...resultList[index]}
                console.log(data)
                eTemp['id_template'] = data[0]['expand']['id_template']['id']
                eTemp['preview'] = data[0]['expand']['id_template']['preview']
                listTemp.push(eTemp)
            }
            setListDraft(listTemp)
        });
    }

    const onPublishItem = (id) => {
        let data = listDraft.filter(e => e.id === id)[0]
        data['is_publish'] = true
        pb.collection('drafts').update(id, data).then(() => initData())
    }

    const onDeleteItem = (id) => {
        pb.collection('drafts').delete(id).then(() => initData());
    }

    return (
        <div className="p-8 md:px-32 md:mx-16">
            <div className="grid grid-cols-3 gap-4 mb-12">
                <div className="col-span-2">
                    <h1 className="font-poppins text-3xl font-2xl">
                        Daftar Acara
                    </h1>
                </div>
            </div>

            {
                listDraft.length === 0 ?
                    (<div className="text-center bg-white shadow-md py-8 rounded-md space-y-2 mt-6 mb-6">
                        <h6 className="text-gray-600 font-semibold text-lg">
                            Belum ada draft
                        </h6>
                        <p className="text-gray-500">Klik + untuk membuat undangan baru</p>
                    </div>) :
                    (<div className="mt-6 gap-y-8 gap-x-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        {listDraft.map((draft, index) => (
                            <CardDefault
                                key={index}
                                id={draft.id}
                                name={draft.title}
                                href={`/dashboard/draft/${draft.id}`}
                                imageSrc={`${api_backend}/api/files/templates/${draft.id_template}/${draft.preview}`}
                                imageAlt={draft.slug}
                                updatedAt={draft.updated}
                                isPublish={draft.is_publish}
                                onDeleteItem={onDeleteItem}
                                onPublishItem={onPublishItem}
                            />
                        ))}
                    </div>)
            }


            {/* Action Button */}
            <a
                onClick={() => {router.push("dashboard/draft")}}
                title="Tambah Baru" className="fixed z-10 bottom-10 right-8 bg-blue-600 w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-white hover:bg-blue-700 hover:drop-shadow-xl hover:w-20 duration-300">
                <PlusIcon className="h-6 w-6" aria-hidden="true" />
            </a>
        </div>
    )
}
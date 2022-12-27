import { useEffect, useState } from "react"
import PocketBase from 'pocketbase';


export default function CarouselCard({ selectedSection, setSelectedTemplateProps }) {
    const [listCarousel, setListCarousel] = useState([])

    const api_backend = 'http://127.0.0.1:8090';
    const pb = new PocketBase(api_backend);

    useEffect(() => {
        pb.collection('templates').getFullList(200, {
            filter: `id_section = "${selectedSection.id}"`,
        }).then(resultList => {
            setListCarousel(resultList)
            // console.log(resultList)
        });
    }, [selectedSection])

    const setSelectedTemplate = (index) => {
        let listCarouselTemp = [...listCarousel.map(e => ({...e, selected : false}))]
        listCarouselTemp[index].selected = true
        setListCarousel(listCarouselTemp)
        setSelectedTemplateProps(listCarouselTemp[index])
    }

    return (
        <div className="flex flex-col m-auto p-auto mt-10">
            <div className="flex overflow-x-scroll pb-8 hide-scroll-bar">
                <div className="flex flex-nowrap lg:ml-20 md:ml-10 ml-5 ">
                    {
                        listCarousel.map((e, i) => (
                            <div key={i} className="inline-block px-3 snap-x" onClick={() => {setSelectedTemplate(i)}}>
                                <div className={`snap-end w-48 h-32 max-w-xs overflow-hidden rounded-lg ${e.selected ? 'shadow-xl border-4 border-white' : 'shadow-md'} bg-white hover:shadow-xl transition duration-300 ease-in-out`}>
                                    <img src={`${api_backend}/api/files/${e['collectionName']}/${e.id}/${e.preview}`} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
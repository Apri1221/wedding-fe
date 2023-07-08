export default function saveDraft(pb, dataSection, slug) {

    const timer = ms => new Promise(res => setTimeout(res, ms))
    const draft = {
        "id_user": pb.authStore.model.id,
        "slug": slug,
        "is_publish": false,
        "music_background": null,
        "title": slug
    }
    var id_draft = null;
    // console.log(dataSection, "draftSection")
    // return

    pb.collection('drafts').create(draft).then(dResult => {
        id_draft = dResult.id;
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
        // https://stackoverflow.com/questions/57101831/react-router-how-do-i-update-the-url-without-causing-a-navigation-reload
        window.history.replaceState(null, "Updating...", `/dashboard/draft/${dResult.id}`) // ganti URL tanpa ada history dan content
    })
}